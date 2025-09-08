"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Hook for managing focus in modal dialogs and other components
 */
export function useFocusTrap(isActive: boolean = true) {
	const containerRef = useRef<HTMLElement>(null);

	useEffect(() => {
		if (!isActive || !containerRef.current) return;

		const container = containerRef.current;
		const focusableElements = container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

		const firstElement = focusableElements[0] as HTMLElement;
		const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

		// Focus the first element when the trap is activated
		if (firstElement) {
			firstElement.focus();
		}

		function handleTabKey(e: KeyboardEvent) {
			if (e.key !== "Tab") return;

			if (e.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement?.focus();
					e.preventDefault();
				}
			} else {
				if (document.activeElement === lastElement) {
					firstElement?.focus();
					e.preventDefault();
				}
			}
		}

		function handleEscapeKey(e: KeyboardEvent) {
			if (e.key === "Escape") {
				// Let parent components handle escape
				e.stopPropagation();
			}
		}

		container.addEventListener("keydown", handleTabKey);
		container.addEventListener("keydown", handleEscapeKey);

		return () => {
			container.removeEventListener("keydown", handleTabKey);
			container.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isActive]);

	return containerRef;
}

/**
 * Hook for managing focus restoration
 */
export function useFocusRestore() {
	const previousFocusRef = useRef<HTMLElement | null>(null);

	const saveFocus = useCallback(() => {
		previousFocusRef.current = document.activeElement as HTMLElement;
	}, []);

	const restoreFocus = useCallback(() => {
		if (previousFocusRef.current) {
			previousFocusRef.current.focus();
			previousFocusRef.current = null;
		}
	}, []);

	return { saveFocus, restoreFocus };
}

/**
 * Hook for keyboard navigation in lists/menus
 */
export function useKeyboardNavigation(
	items: HTMLElement[],
	options: {
		loop?: boolean;
		orientation?: "horizontal" | "vertical";
		onSelect?: (index: number) => void;
		onEscape?: () => void;
	} = {}
) {
	const { loop = true, orientation = "vertical", onSelect, onEscape } = options;
	const currentIndexRef = useRef(0);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			const { key } = e;
			let newIndex = currentIndexRef.current;

			switch (key) {
				case "ArrowDown":
					if (orientation === "vertical") {
						newIndex = loop
							? (currentIndexRef.current + 1) % items.length
							: Math.min(currentIndexRef.current + 1, items.length - 1);
						e.preventDefault();
					}
					break;

				case "ArrowUp":
					if (orientation === "vertical") {
						newIndex = loop
							? currentIndexRef.current === 0
								? items.length - 1
								: currentIndexRef.current - 1
							: Math.max(currentIndexRef.current - 1, 0);
						e.preventDefault();
					}
					break;

				case "ArrowRight":
					if (orientation === "horizontal") {
						newIndex = loop
							? (currentIndexRef.current + 1) % items.length
							: Math.min(currentIndexRef.current + 1, items.length - 1);
						e.preventDefault();
					}
					break;

				case "ArrowLeft":
					if (orientation === "horizontal") {
						newIndex = loop
							? currentIndexRef.current === 0
								? items.length - 1
								: currentIndexRef.current - 1
							: Math.max(currentIndexRef.current - 1, 0);
						e.preventDefault();
					}
					break;

				case "Home":
					newIndex = 0;
					e.preventDefault();
					break;

				case "End":
					newIndex = items.length - 1;
					e.preventDefault();
					break;

				case "Enter":
				case " ":
					onSelect?.(currentIndexRef.current);
					e.preventDefault();
					break;

				case "Escape":
					onEscape?.();
					e.preventDefault();
					break;
			}

			if (newIndex !== currentIndexRef.current && items[newIndex]) {
				currentIndexRef.current = newIndex;
				items[newIndex].focus();
			}
		},
		[items, loop, orientation, onSelect, onEscape]
	);

	const setCurrentIndex = useCallback(
		(index: number) => {
			if (index >= 0 && index < items.length) {
				currentIndexRef.current = index;
				items[index]?.focus();
			}
		},
		[items]
	);

	return {
		handleKeyDown,
		setCurrentIndex,
		currentIndex: currentIndexRef.current,
	};
}

/**
 * Hook for managing roving tabindex
 */
export function useRovingTabIndex(items: HTMLElement[], activeIndex: number = 0) {
	useEffect(() => {
		items.forEach((item, index) => {
			if (item) {
				item.tabIndex = index === activeIndex ? 0 : -1;
			}
		});
	}, [items, activeIndex]);
}

/**
 * Hook for announcing content to screen readers
 */
export function useScreenReaderAnnouncement() {
	const announce = useCallback((message: string, priority: "polite" | "assertive" = "polite") => {
		if (typeof window === "undefined") return;

		const announcement = document.createElement("div");
		announcement.setAttribute("aria-live", priority);
		announcement.setAttribute("aria-atomic", "true");
		announcement.className = "sr-only";
		announcement.textContent = message;

		document.body.appendChild(announcement);

		// Remove after announcement
		setTimeout(() => {
			if (document.body.contains(announcement)) {
				document.body.removeChild(announcement);
			}
		}, 1000);
	}, []);

	return { announce };
}

/**
 * Hook for detecting if user prefers reduced motion
 */
export function useReducedMotion() {
	const prefersReducedMotion = useCallback(() => {
		if (typeof window === "undefined") return false;
		return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	}, []);

	return prefersReducedMotion();
}

/**
 * Hook for managing focus visible state
 */
export function useFocusVisible() {
	const isKeyboardUser = useRef(false);

	useEffect(() => {
		function handleKeyDown() {
			isKeyboardUser.current = true;
		}

		function handleMouseDown() {
			isKeyboardUser.current = false;
		}

		function handlePointerDown() {
			isKeyboardUser.current = false;
		}

		document.addEventListener("keydown", handleKeyDown, true);
		document.addEventListener("mousedown", handleMouseDown, true);
		document.addEventListener("pointerdown", handlePointerDown, true);

		return () => {
			document.removeEventListener("keydown", handleKeyDown, true);
			document.removeEventListener("mousedown", handleMouseDown, true);
			document.removeEventListener("pointerdown", handlePointerDown, true);
		};
	}, []);

	return isKeyboardUser.current;
}
