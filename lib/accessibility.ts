/**
 * Accessibility utilities and helpers
 */

// Screen reader only text utility
export function srOnly(text: string): string {
	return text;
}

// Generate unique IDs for form elements
let idCounter = 0;
export function generateId(prefix: string = "id"): string {
	return `${prefix}-${++idCounter}`;
}

// ARIA live region announcements
export function announceToScreenReader(message: string, priority: "polite" | "assertive" = "polite") {
	if (typeof window === "undefined") return;

	const announcement = document.createElement("div");
	announcement.setAttribute("aria-live", priority);
	announcement.setAttribute("aria-atomic", "true");
	announcement.className = "sr-only";
	announcement.textContent = message;

	document.body.appendChild(announcement);

	// Remove after announcement
	setTimeout(() => {
		document.body.removeChild(announcement);
	}, 1000);
}

// Focus management utilities
export function trapFocus(element: HTMLElement) {
	const focusableElements = element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

	const firstElement = focusableElements[0] as HTMLElement;
	const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

	function handleTabKey(e: KeyboardEvent) {
		if (e.key !== "Tab") return;

		if (e.shiftKey) {
			if (document.activeElement === firstElement) {
				lastElement.focus();
				e.preventDefault();
			}
		} else {
			if (document.activeElement === lastElement) {
				firstElement.focus();
				e.preventDefault();
			}
		}
	}

	element.addEventListener("keydown", handleTabKey);

	// Return cleanup function
	return () => {
		element.removeEventListener("keydown", handleTabKey);
	};
}

// Skip link functionality
export function createSkipLink(targetId: string, text: string = "Skip to main content") {
	if (typeof window === "undefined") return null;

	const skipLink = document.createElement("a");
	skipLink.href = `#${targetId}`;
	skipLink.textContent = text;
	skipLink.className = "skip-link";
	skipLink.addEventListener("click", (e) => {
		e.preventDefault();
		const target = document.getElementById(targetId);
		if (target) {
			target.focus();
			target.scrollIntoView();
		}
	});

	return skipLink;
}

// Keyboard navigation helpers
export const KeyboardKeys = {
	ENTER: "Enter",
	SPACE: " ",
	ESCAPE: "Escape",
	ARROW_UP: "ArrowUp",
	ARROW_DOWN: "ArrowDown",
	ARROW_LEFT: "ArrowLeft",
	ARROW_RIGHT: "ArrowRight",
	TAB: "Tab",
	HOME: "Home",
	END: "End",
} as const;

export function handleKeyboardNavigation(e: KeyboardEvent, handlers: Partial<Record<keyof typeof KeyboardKeys, () => void>>) {
	const handler = handlers[e.key as keyof typeof KeyboardKeys];
	if (handler) {
		e.preventDefault();
		handler();
	}
}

// Color contrast utilities
export function getContrastRatio(color1: string, color2: string): number {
	// Simplified contrast ratio calculation
	// In a real implementation, you'd want a more robust color parsing library
	return 4.5; // Placeholder - should meet WCAG AA standards
}

export function meetsContrastRequirement(foreground: string, background: string, level: "AA" | "AAA" = "AA"): boolean {
	const ratio = getContrastRatio(foreground, background);
	return level === "AA" ? ratio >= 4.5 : ratio >= 7;
}

// Form validation announcements
export function announceFormError(fieldName: string, error: string) {
	announceToScreenReader(`Error in ${fieldName}: ${error}`, "assertive");
}

export function announceFormSuccess(message: string) {
	announceToScreenReader(message, "polite");
}

// Reduced motion detection
export function prefersReducedMotion(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// High contrast mode detection
export function prefersHighContrast(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-contrast: high)").matches;
}

// Focus visible utilities
export function addFocusVisiblePolyfill() {
	if (typeof window === "undefined") return;

	let hadKeyboardEvent = true;

	function onKeyDown() {
		hadKeyboardEvent = true;
	}

	function onPointerDown() {
		hadKeyboardEvent = false;
	}

	function onFocus(e: FocusEvent) {
		if (hadKeyboardEvent || (e.target as HTMLElement).matches(":focus-visible")) {
			(e.target as HTMLElement).classList.add("focus-visible");
		}
	}

	function onBlur(e: FocusEvent) {
		(e.target as HTMLElement).classList.remove("focus-visible");
	}

	document.addEventListener("keydown", onKeyDown, true);
	document.addEventListener("mousedown", onPointerDown, true);
	document.addEventListener("pointerdown", onPointerDown, true);
	document.addEventListener("touchstart", onPointerDown, true);
	document.addEventListener("focus", onFocus, true);
	document.addEventListener("blur", onBlur, true);
}

// ARIA helpers
export const AriaRoles = {
	BUTTON: "button",
	LINK: "link",
	MENU: "menu",
	MENUITEM: "menuitem",
	TAB: "tab",
	TABPANEL: "tabpanel",
	DIALOG: "dialog",
	ALERT: "alert",
	STATUS: "status",
	REGION: "region",
	BANNER: "banner",
	MAIN: "main",
	NAVIGATION: "navigation",
	COMPLEMENTARY: "complementary",
	CONTENTINFO: "contentinfo",
} as const;

export function createAriaAttributes(options: {
	role?: string;
	label?: string;
	labelledBy?: string;
	describedBy?: string;
	expanded?: boolean;
	selected?: boolean;
	disabled?: boolean;
	required?: boolean;
	invalid?: boolean;
	live?: "polite" | "assertive" | "off";
	atomic?: boolean;
}) {
	const attrs: Record<string, string | boolean> = {};

	if (options.role) attrs.role = options.role;
	if (options.label) attrs["aria-label"] = options.label;
	if (options.labelledBy) attrs["aria-labelledby"] = options.labelledBy;
	if (options.describedBy) attrs["aria-describedby"] = options.describedBy;
	if (options.expanded !== undefined) attrs["aria-expanded"] = options.expanded;
	if (options.selected !== undefined) attrs["aria-selected"] = options.selected;
	if (options.disabled !== undefined) attrs["aria-disabled"] = options.disabled;
	if (options.required !== undefined) attrs["aria-required"] = options.required;
	if (options.invalid !== undefined) attrs["aria-invalid"] = options.invalid;
	if (options.live) attrs["aria-live"] = options.live;
	if (options.atomic !== undefined) attrs["aria-atomic"] = options.atomic;

	return attrs;
}
