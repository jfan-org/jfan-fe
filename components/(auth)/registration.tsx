"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Custom validation functions
import {
	Search,
	ChevronRight,
	ChevronDown,
	Briefcase,
	Users,
	Building,
	Globe,
	Layers,
	Grid,
	User,
	Mail,
	Phone,
	MapPin,
	Calendar,
	Shield,
	Target,
	Heart,
	Zap,
	Award,
	Eye,
	ArrowLeft,
	ArrowRight,
	Check,
	X,
	Star,
	Sparkles,
	AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Custom validation functions
const validateEmail = (email: string): string | null => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!email) return "Email is required";
	if (!emailRegex.test(email)) return "Please enter a valid email address";
	return null;
};

const validateUrl = (url: string): string | null => {
	if (!url) return null; // Optional field
	try {
		new URL(url);
		return null;
	} catch {
		return "Please enter a valid URL";
	}
};

const validateRequired = (value: string, fieldName: string): string | null => {
	if (!value || value.trim() === "") {
		return `${fieldName} is required`;
	}
	return null;
};

const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
	if (!value) return `${fieldName} is required`;
	if (value.length < minLength) {
		return `${fieldName} must be at least ${minLength} characters`;
	}
	return null;
};

const validateGender = (value: string): string | null => {
	if (!value) return "Please select a gender";
	if (!["male", "female"].includes(value)) return "Please select a valid gender";
	return null;
};

// Validation rules for each user type
const getValidationRules = (userTypeId: string) => {
	const baseRules = {
		fullName: (value: string) => validateMinLength(value, 2, "Full name"),
		email: validateEmail,
		phone: (value: string) => validateMinLength(value, 10, "Phone number"),
		country: (value: string) => validateRequired(value, "Country"),
		state: (value: string) => validateRequired(value, "State"),
		city: (value: string) => validateRequired(value, "City"),
		gender: validateGender,
	};

	switch (userTypeId) {
		case "company":
			return {
				...baseRules,
				companyName: (value: string) => validateMinLength(value, 2, "Company name"),
				industry: (value: string) => validateRequired(value, "Industry"),
				companySize: (value: string) => validateRequired(value, "Company size"),
				website: validateUrl,
			};
		case "talent":
			return {
				...baseRules,
				experience: (value: string) => validateRequired(value, "Experience level"),
				skills: (value: string) => validateRequired(value, "Skills"),
			};
		case "cyber-agent":
			return {
				...baseRules,
				specialization: (value: string) => validateRequired(value, "Specialization"),
				services: (value: string) => validateRequired(value, "Services offered"),
			};
		default:
			return {
				...baseRules,
				background: (value: string) => validateRequired(value, "Professional background"),
			};
	}
};

// TypeScript Interfaces
interface Economy {
	id: number;
	name: string;
}

interface Industry {
	id: number;
	economyId: number;
	name: string;
}

interface Sector {
	id: number;
	industryId: number;
	name: string;
}

interface Job {
	id: number;
	sectorId: number;
	name: string;
}

interface JobCatalog {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

interface UserType {
	id: string;
	name: string;
	description: string;
	icon: React.ReactNode;
	color: string;
	bgColor: string;
	features: string[];
}

interface JobSelection {
	economy: Economy | null;
	industry: Industry | null;
	sector: Sector | null;
	job: Job | null;
}

interface FormData {
	[key: string]: string;
}

interface ValidationError {
	field: string;
	message: string;
}

interface FormInputProps {
	label: string;
	type?: "text" | "email" | "tel" | "url" | "select" | "textarea";
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	required?: boolean;
	options?: { value: string; label: string }[];
	error?: string;
	disabled?: boolean;
}

interface JobSelectorProps {
	selectedJob: Job | null;
	onJobSelect: (job: Job) => void;
	error?: string;
}

// Import job catalog from external file
import { jobCatalog } from "@/lib/jobsCatalog"; // TODO: Import from your job catalog file
import LayoutWrapper from "../layouts/LayoutWrapper";

// User Types Configuration
const userTypes: UserType[] = [
	{
		id: "company",
		name: "Company",
		description: "Register your organization to find and hire talented professionals",
		icon: <Building className="w-8 h-8" />,
		color: "text-blue-400",
		bgColor: "bg-blue-400/10 border-blue-400/20",
		features: ["Post job opportunities", "Access talent pool", "Company branding", "Analytics dashboard"],
	},
	{
		id: "talent",
		name: "Talent",
		description: "Showcase your skills and connect with opportunities in your field",
		icon: <Star className="w-8 h-8" />,
		color: "text-yellow-400",
		bgColor: "bg-yellow-400/10 border-yellow-400/20",
		features: ["Professional profile", "Job matching", "Skills verification", "Career guidance"],
	},
	{
		id: "cyber-agent",
		name: "Cyber Agent",
		description: "Digital specialists providing technology solutions and cybersecurity services",
		icon: <Shield className="w-8 h-8" />,
		color: "text-purple-400",
		bgColor: "bg-purple-400/10 border-purple-400/20",
		features: ["Security consulting", "Digital solutions", "Tech support", "Risk assessment"],
	},
	{
		id: "scout",
		name: "Scout",
		description: "Talent scouts and recruiters connecting companies with the right professionals",
		icon: <Target className="w-8 h-8" />,
		color: "text-green-400",
		bgColor: "bg-green-400/10 border-green-400/20",
		features: ["Talent sourcing", "Recruitment services", "Network building", "Market insights"],
	},
	{
		id: "professional",
		name: "Professional",
		description: "Experienced experts offering specialized services and consultancy",
		icon: <Award className="w-8 h-8" />,
		color: "text-orange-400",
		bgColor: "bg-orange-400/10 border-orange-400/20",
		features: ["Expert consultancy", "Professional services", "Industry insights", "Project collaboration"],
	},
	{
		id: "mentor",
		name: "Mentor",
		description: "Guide and support emerging talents in their career development",
		icon: <Users className="w-8 h-8" />,
		color: "text-cyan-400",
		bgColor: "bg-cyan-400/10 border-cyan-400/20",
		features: ["Career coaching", "Skill development", "Mentorship programs", "Knowledge sharing"],
	},
	{
		id: "philanthropist",
		name: "Philanthropist",
		description: "Support talent development and economic growth through strategic giving",
		icon: <Heart className="w-8 h-8" />,
		color: "text-pink-400",
		bgColor: "bg-pink-400/10 border-pink-400/20",
		features: ["Talent sponsorship", "Economic development", "Social impact", "Strategic giving"],
	},
];

// Dynamic Location Data Structure
interface LocationData {
	countries: Array<{
		value: string;
		label: string;
		states: Array<{
			value: string;
			label: string;
			cities: Array<{
				value: string;
				label: string;
			}>;
		}>;
	}>;
}

// Comprehensive African Countries Location Data
const locationData: LocationData = {
	countries: [
		{
			value: "nigeria",
			label: "Nigeria",
			states: [
				{
					value: "lagos",
					label: "Lagos State",
					cities: [
						{ value: "ikeja", label: "Ikeja" },
						{ value: "victoria-island", label: "Victoria Island" },
						{ value: "lekki", label: "Lekki" },
						{ value: "surulere", label: "Surulere" },
						{ value: "mainland", label: "Mainland" },
						{ value: "island", label: "Island" },
					],
				},
				{
					value: "abuja",
					label: "Federal Capital Territory",
					cities: [
						{ value: "central-area", label: "Central Area" },
						{ value: "garki", label: "Garki" },
						{ value: "wuse", label: "Wuse" },
						{ value: "maitama", label: "Maitama" },
						{ value: "asokoro", label: "Asokoro" },
					],
				},
				{
					value: "kano",
					label: "Kano State",
					cities: [
						{ value: "kano-city", label: "Kano City" },
						{ value: "fagge", label: "Fagge" },
						{ value: "nasarawa", label: "Nasarawa" },
					],
				},
				{
					value: "rivers",
					label: "Rivers State",
					cities: [
						{ value: "port-harcourt", label: "Port Harcourt" },
						{ value: "obio-akpor", label: "Obio-Akpor" },
					],
				},
			],
		},
		{
			value: "south-africa",
			label: "South Africa",
			states: [
				{
					value: "western-cape",
					label: "Western Cape",
					cities: [
						{ value: "cape-town", label: "Cape Town" },
						{ value: "stellenbosch", label: "Stellenbosch" },
						{ value: "paarl", label: "Paarl" },
						{ value: "george", label: "George" },
					],
				},
				{
					value: "gauteng",
					label: "Gauteng",
					cities: [
						{ value: "johannesburg", label: "Johannesburg" },
						{ value: "pretoria", label: "Pretoria" },
						{ value: "soweto", label: "Soweto" },
						{ value: "sandton", label: "Sandton" },
					],
				},
				{
					value: "kwazulu-natal",
					label: "KwaZulu-Natal",
					cities: [
						{ value: "durban", label: "Durban" },
						{ value: "pietermaritzburg", label: "Pietermaritzburg" },
						{ value: "richards-bay", label: "Richards Bay" },
					],
				},
			],
		},
		{
			value: "kenya",
			label: "Kenya",
			states: [
				{
					value: "nairobi",
					label: "Nairobi County",
					cities: [
						{ value: "nairobi-city", label: "Nairobi City" },
						{ value: "westlands", label: "Westlands" },
						{ value: "karen", label: "Karen" },
						{ value: "kilimani", label: "Kilimani" },
					],
				},
				{
					value: "mombasa",
					label: "Mombasa County",
					cities: [
						{ value: "mombasa-city", label: "Mombasa City" },
						{ value: "nyali", label: "Nyali" },
						{ value: "likoni", label: "Likoni" },
					],
				},
				{
					value: "kiambu",
					label: "Kiambu County",
					cities: [
						{ value: "thika", label: "Thika" },
						{ value: "ruiru", label: "Ruiru" },
						{ value: "kikuyu", label: "Kikuyu" },
					],
				},
			],
		},
		{
			value: "ghana",
			label: "Ghana",
			states: [
				{
					value: "greater-accra",
					label: "Greater Accra Region",
					cities: [
						{ value: "accra", label: "Accra" },
						{ value: "tema", label: "Tema" },
						{ value: "madina", label: "Madina" },
						{ value: "kasoa", label: "Kasoa" },
					],
				},
				{
					value: "ashanti",
					label: "Ashanti Region",
					cities: [
						{ value: "kumasi", label: "Kumasi" },
						{ value: "obuasi", label: "Obuasi" },
						{ value: "ejisu", label: "Ejisu" },
					],
				},
			],
		},
		{
			value: "egypt",
			label: "Egypt",
			states: [
				{
					value: "cairo",
					label: "Cairo Governorate",
					cities: [
						{ value: "cairo-city", label: "Cairo City" },
						{ value: "heliopolis", label: "Heliopolis" },
						{ value: "maadi", label: "Maadi" },
					],
				},
				{
					value: "alexandria",
					label: "Alexandria Governorate",
					cities: [
						{ value: "alexandria-city", label: "Alexandria City" },
						{ value: "montaza", label: "Montaza" },
					],
				},
			],
		},
		{
			value: "morocco",
			label: "Morocco",
			states: [
				{
					value: "casablanca-settat",
					label: "Casablanca-Settat",
					cities: [
						{ value: "casablanca", label: "Casablanca" },
						{ value: "mohammedia", label: "Mohammedia" },
						{ value: "settat", label: "Settat" },
					],
				},
				{
					value: "rabat-sale-kenitra",
					label: "Rabat-Salé-Kénitra",
					cities: [
						{ value: "rabat", label: "Rabat" },
						{ value: "sale", label: "Salé" },
						{ value: "kenitra", label: "Kénitra" },
					],
				},
			],
		},
		{
			value: "ethiopia",
			label: "Ethiopia",
			states: [
				{
					value: "addis-ababa",
					label: "Addis Ababa",
					cities: [
						{ value: "addis-ababa-city", label: "Addis Ababa City" },
						{ value: "bole", label: "Bole" },
						{ value: "kirkos", label: "Kirkos" },
					],
				},
				{
					value: "oromia",
					label: "Oromia Region",
					cities: [
						{ value: "adama", label: "Adama" },
						{ value: "jimma", label: "Jimma" },
						{ value: "nekemte", label: "Nekemte" },
					],
				},
			],
		},
		{
			value: "uganda",
			label: "Uganda",
			states: [
				{
					value: "central",
					label: "Central Region",
					cities: [
						{ value: "kampala", label: "Kampala" },
						{ value: "entebbe", label: "Entebbe" },
						{ value: "mukono", label: "Mukono" },
					],
				},
				{
					value: "western",
					label: "Western Region",
					cities: [
						{ value: "mbarara", label: "Mbarara" },
						{ value: "fort-portal", label: "Fort Portal" },
						{ value: "kasese", label: "Kasese" },
					],
				},
			],
		},
		{
			value: "tanzania",
			label: "Tanzania",
			states: [
				{
					value: "dar-es-salaam",
					label: "Dar es Salaam Region",
					cities: [
						{ value: "dar-es-salaam-city", label: "Dar es Salaam City" },
						{ value: "kinondoni", label: "Kinondoni" },
						{ value: "temeke", label: "Temeke" },
					],
				},
				{
					value: "arusha",
					label: "Arusha Region",
					cities: [
						{ value: "arusha-city", label: "Arusha City" },
						{ value: "moshi", label: "Moshi" },
					],
				},
			],
		},
		{
			value: "rwanda",
			label: "Rwanda",
			states: [
				{
					value: "kigali",
					label: "Kigali City",
					cities: [
						{ value: "kigali-city", label: "Kigali City" },
						{ value: "gasabo", label: "Gasabo" },
						{ value: "kicukiro", label: "Kicukiro" },
					],
				},
				{
					value: "northern",
					label: "Northern Province",
					cities: [
						{ value: "musanze", label: "Musanze" },
						{ value: "gicumbi", label: "Gicumbi" },
					],
				},
			],
		},
		{
			value: "senegal",
			label: "Senegal",
			states: [
				{
					value: "dakar",
					label: "Dakar Region",
					cities: [
						{ value: "dakar-city", label: "Dakar City" },
						{ value: "pikine", label: "Pikine" },
						{ value: "guediawaye", label: "Guédiawaye" },
					],
				},
				{
					value: "thies",
					label: "Thiès Region",
					cities: [
						{ value: "thies-city", label: "Thiès City" },
						{ value: "mbour", label: "Mbour" },
					],
				},
			],
		},
		{
			value: "ivory-coast",
			label: "Côte d'Ivoire",
			states: [
				{
					value: "abidjan",
					label: "Abidjan Autonomous District",
					cities: [
						{ value: "abidjan-city", label: "Abidjan City" },
						{ value: "cocody", label: "Cocody" },
						{ value: "yopougon", label: "Yopougon" },
					],
				},
				{
					value: "yamoussoukro",
					label: "Yamoussoukro Autonomous District",
					cities: [{ value: "yamoussoukro-city", label: "Yamoussoukro City" }],
				},
			],
		},
		{
			value: "zambia",
			label: "Zambia",
			states: [
				{
					value: "lusaka",
					label: "Lusaka Province",
					cities: [
						{ value: "lusaka-city", label: "Lusaka City" },
						{ value: "chilanga", label: "Chilanga" },
						{ value: "kafue", label: "Kafue" },
					],
				},
				{
					value: "copperbelt",
					label: "Copperbelt Province",
					cities: [
						{ value: "kitwe", label: "Kitwe" },
						{ value: "ndola", label: "Ndola" },
						{ value: "mufulira", label: "Mufulira" },
					],
				},
			],
		},
		{
			value: "zimbabwe",
			label: "Zimbabwe",
			states: [
				{
					value: "harare",
					label: "Harare Province",
					cities: [
						{ value: "harare-city", label: "Harare City" },
						{ value: "chitungwiza", label: "Chitungwiza" },
						{ value: "epworth", label: "Epworth" },
					],
				},
				{
					value: "bulawayo",
					label: "Bulawayo Province",
					cities: [{ value: "bulawayo-city", label: "Bulawayo City" }],
				},
			],
		},
		{
			value: "botswana",
			label: "Botswana",
			states: [
				{
					value: "south-east",
					label: "South-East District",
					cities: [
						{ value: "gaborone", label: "Gaborone" },
						{ value: "lobatse", label: "Lobatse" },
						{ value: "ramotswa", label: "Ramotswa" },
					],
				},
				{
					value: "north-west",
					label: "North-West District",
					cities: [
						{ value: "maun", label: "Maun" },
						{ value: "ghanzi", label: "Ghanzi" },
					],
				},
			],
		},
	],
};

// Form Input Component using shadcn/ui with validation
const FormInput: React.FC<FormInputProps> = ({
	label,
	type = "text",
	value,
	onChange,
	placeholder,
	required = false,
	options = [],
	error,
	disabled = false,
}) => {
	const handleChange = (newValue: string) => {
		if (!disabled) {
			onChange(newValue);
		}
	};

	if (type === "select") {
		return (
			<div className="mb-4">
				<Label className="text-gray-300">
					{label} {required && <span className="text-red-400">*</span>}
				</Label>
				<Select value={value} onValueChange={handleChange} disabled={disabled}>
					<SelectTrigger
						className={`bg-gray-700 border-gray-600 text-white ${error ? "border-red-500" : ""} ${
							disabled ? "opacity-50 cursor-not-allowed" : ""
						}`}>
						<SelectValue placeholder={placeholder} />
					</SelectTrigger>
					<SelectContent className="bg-gray-700 border-gray-600">
						{options.map((option, index) => (
							<SelectItem key={index} value={option.value} className="text-white hover:bg-gray-600">
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
			</div>
		);
	}

	if (type === "textarea") {
		return (
			<div className="mb-4">
				<Label className="text-gray-300">
					{label} {required && <span className="text-red-400">*</span>}
				</Label>
				<Textarea
					value={value}
					onChange={(e) => handleChange(e.target.value)}
					placeholder={placeholder}
					rows={4}
					disabled={disabled}
					className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none ${
						error ? "border-red-500" : ""
					} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
				/>
				{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
			</div>
		);
	}

	return (
		<div className="mb-4">
			<Label className="text-gray-300">
				{label} {required && <span className="text-red-400">*</span>}
			</Label>
			<Input
				type={type}
				value={value}
				onChange={(e) => handleChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				className={`bg-gray-700 border-gray-600 text-white placeholder-gray-400 ${error ? "border-red-500" : ""} ${
					disabled ? "opacity-50 cursor-not-allowed" : ""
				}`}
			/>
			{error && <p className="text-red-400 text-sm mt-1">{error}</p>}
		</div>
	);
};

// Simplified Job Selection Component for Talents
const JobSelector: React.FC<JobSelectorProps> = ({ selectedJob, onJobSelect, error }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedEconomy, setSelectedEconomy] = useState<Economy | null>(null);
	const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
	const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

	// Get full career path for selected job
	const getJobCareerPath = (job: Job) => {
		const sector = jobCatalog.sectors.find((s) => s.id === job.sectorId);
		const industry = sector ? jobCatalog.industries.find((i) => i.id === sector.industryId) : null;
		const economy = industry ? jobCatalog.economies.find((e) => e.id === industry.economyId) : null;

		return { economy, industry, sector, job };
	};

	// Filter jobs based on search and selections
	const filteredJobs = useMemo(() => {
		let jobs = jobCatalog.jobs;

		// Filter by search term
		if (searchTerm) {
			jobs = jobs.filter((job) => job.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		// Filter by selections
		if (selectedEconomy) {
			const economyIndustries = jobCatalog.industries.filter((i) => i.economyId === selectedEconomy.id);
			const economySectors = jobCatalog.sectors.filter((s) => economyIndustries.some((i) => i.id === s.industryId));
			jobs = jobs.filter((j) => economySectors.some((s) => s.id === j.sectorId));
		}

		if (selectedIndustry) {
			const industrySectors = jobCatalog.sectors.filter((s) => s.industryId === selectedIndustry.id);
			jobs = jobs.filter((j) => industrySectors.some((s) => s.id === j.sectorId));
		}

		if (selectedSector) {
			jobs = jobs.filter((j) => j.sectorId === selectedSector.id);
		}

		return jobs;
	}, [searchTerm, selectedEconomy, selectedIndustry, selectedSector]);

	const resetFilters = () => {
		setSelectedEconomy(null);
		setSelectedIndustry(null);
		setSelectedSector(null);
		setSearchTerm("");
	};

	return (
		<Card className={`bg-gray-800 border-gray-700 ${error ? "border-red-500" : ""}`}>
			<CardHeader>
				<CardTitle className="text-green-400">Select Your Career Path</CardTitle>
				<CardDescription className="text-gray-400">Choose your profession from the job catalog</CardDescription>
			</CardHeader>
			<CardContent>
				{/* Search */}
				<div className="mb-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
						<Input
							type="text"
							placeholder="Search for careers..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 bg-gray-700 border-gray-600 text-white"
						/>
					</div>
				</div>

				{/* Filters */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
					<Select
						value={selectedEconomy?.id.toString() || ""}
						onValueChange={(value) => {
							const economy = jobCatalog.economies.find((e) => e.id.toString() === value);
							setSelectedEconomy(economy || null);
							setSelectedIndustry(null);
							setSelectedSector(null);
						}}>
						<SelectTrigger className="bg-gray-700 border-gray-600 text-white">
							<SelectValue placeholder="Economy" />
						</SelectTrigger>
						<SelectContent className="bg-gray-700 border-gray-600">
							{jobCatalog.economies.map((economy) => (
								<SelectItem
									key={economy.id}
									value={economy.id.toString()}
									className="text-white hover:bg-gray-600">
									{economy.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<Select
						value={selectedIndustry?.id.toString() || ""}
						onValueChange={(value) => {
							const industry = jobCatalog.industries.find((i) => i.id.toString() === value);
							setSelectedIndustry(industry || null);
							setSelectedSector(null);
						}}
						disabled={!selectedEconomy}>
						<SelectTrigger className="bg-gray-700 border-gray-600 text-white">
							<SelectValue placeholder="Industry" />
						</SelectTrigger>
						<SelectContent className="bg-gray-700 border-gray-600">
							{jobCatalog.industries
								.filter((i) => (selectedEconomy ? i.economyId === selectedEconomy.id : true))
								.map((industry) => (
									<SelectItem
										key={industry.id}
										value={industry.id.toString()}
										className="text-white hover:bg-gray-600">
										{industry.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>

					<Select
						value={selectedSector?.id.toString() || ""}
						onValueChange={(value) => {
							const sector = jobCatalog.sectors.find((s) => s.id.toString() === value);
							setSelectedSector(sector || null);
						}}
						disabled={!selectedIndustry}>
						<SelectTrigger className="bg-gray-700 border-gray-600 text-white">
							<SelectValue placeholder="Sector" />
						</SelectTrigger>
						<SelectContent className="bg-gray-700 border-gray-600">
							{jobCatalog.sectors
								.filter((s) => (selectedIndustry ? s.industryId === selectedIndustry.id : true))
								.map((sector) => (
									<SelectItem
										key={sector.id}
										value={sector.id.toString()}
										className="text-white hover:bg-gray-600">
										{sector.name}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</div>

				{/* Reset filters button */}
				{(selectedEconomy || selectedIndustry || selectedSector || searchTerm) && (
					<div className="mb-4">
						<Button variant="outline" size="sm" onClick={resetFilters} className="text-gray-300 border-gray-600">
							<X className="w-4 h-4 mr-2" />
							Clear Filters
						</Button>
					</div>
				)}

				{/* Jobs List */}
				<div className="space-y-2 max-h-80 overflow-y-auto">
					{filteredJobs.length === 0 ? (
						<div className="text-center py-8 text-gray-400">
							<Briefcase className="w-8 h-8 mx-auto mb-2 opacity-50" />
							<p>No careers found matching your criteria.</p>
						</div>
					) : (
						filteredJobs.map((job) => {
							const careerPath = getJobCareerPath(job);
							const isSelected = selectedJob?.id === job.id;

							return (
								<div
									key={job.id}
									className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
										isSelected
											? "bg-green-400/10 border-green-400/40"
											: "bg-gray-700 border-gray-600 hover:bg-gray-600"
									}`}
									onClick={() => onJobSelect(job)}>
									<div className="flex items-center justify-between">
										<div>
											<h4 className="font-medium text-white">{job.name}</h4>
											<div className="text-sm text-gray-400 space-y-1">
												<div>
													Economy:{" "}
													<span className="text-green-400">
														{careerPath.economy?.name}
													</span>
												</div>
												<div>
													Industry:{" "}
													<span className="text-yellow-400">
														{careerPath.industry?.name}
													</span>
												</div>
												<div>
													Sector:{" "}
													<span className="text-blue-400">
														{careerPath.sector?.name}
													</span>
												</div>
											</div>
										</div>
										{isSelected && <Check className="w-5 h-5 text-green-400" />}
									</div>
								</div>
							);
						})
					)}
				</div>

				{/* Selected Job Summary */}
				{selectedJob && (
					<Card className="mt-4 bg-green-400/10 border-green-400/20">
						<CardHeader>
							<CardTitle className="text-green-400 text-sm">Selected Career Path:</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-sm text-gray-300 space-y-1">
								{(() => {
									const careerPath = getJobCareerPath(selectedJob);
									return (
										<>
											<div>
												Economy:{" "}
												<span className="text-green-400">
													{careerPath.economy?.name}
												</span>
											</div>
											<div>
												Industry:{" "}
												<span className="text-yellow-400">
													{careerPath.industry?.name}
												</span>
											</div>
											<div>
												Sector:{" "}
												<span className="text-blue-400">
													{careerPath.sector?.name}
												</span>
											</div>
											<div>
												Job:{" "}
												<span className="text-white font-medium">
													{selectedJob.name}
												</span>
											</div>
										</>
									);
								})()}
							</div>
						</CardContent>
					</Card>
				)}

				{error && <p className="text-red-400 text-sm mt-2">{error}</p>}
			</CardContent>
		</Card>
	);
};

// Main Registration Portal Component
const RegistrationPortal: React.FC = () => {
	const [currentStep, setCurrentStep] = useState<"selection" | "form" | "success">("selection");
	const [selectedUserType, setSelectedUserType] = useState<UserType | null>(null);
	const [formData, setFormData] = useState<FormData>({});
	const [selectedJob, setSelectedJob] = useState<Job | null>(null);
	const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

	const handleUserTypeSelect = (userType: UserType): void => {
		setSelectedUserType(userType);
		setCurrentStep("form");
		setFormData({});
		setSelectedJob(null);
		setValidationErrors([]);
	};

	const handleInputChange = (field: string, value: string): void => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));

		// Handle location field changes - clear dependent fields
		if (field === "country") {
			setFormData((prev) => ({
				...prev,
				[field]: value,
				state: "", // Clear state when country changes
				city: "", // Clear city when country changes
			}));
		} else if (field === "state") {
			setFormData((prev) => ({
				...prev,
				[field]: value,
				city: "", // Clear city when state changes
			}));
		}

		// Clear validation error for this field
		setValidationErrors((prev) => prev.filter((error) => error.field !== field));
	};

	const handleJobSelect = (job: Job): void => {
		setSelectedJob(job);
		setValidationErrors((prev) => prev.filter((error) => error.field !== "job"));
	};

	const validateForm = (): boolean => {
		if (!selectedUserType) return false;

		const validationRules = getValidationRules(selectedUserType.id);
		const errors: ValidationError[] = [];

		// Validate all form fields
		Object.entries(validationRules).forEach(([fieldName, validator]) => {
			const fieldValue = formData[fieldName] || "";
			const error = validator(fieldValue);
			if (error) {
				errors.push({
					field: fieldName,
					message: error,
				});
			}
		});

		// Special validation for talent job selection
		if (selectedUserType.id === "talent" && !selectedJob) {
			errors.push({
				field: "job",
				message: "Please select a career from the job catalog",
			});
		}

		setValidationErrors(errors);
		return errors.length === 0;
	};

	const handleSubmit = (): void => {
		if (!validateForm()) {
			console.log("❌ Form validation failed:");
			validationErrors.forEach((error) => {
				console.log(`  - ${error.field}: ${error.message}`);
			});
			return;
		}

		// Get full career path for talents
		let careerPath = null;
		if (selectedUserType?.id === "talent" && selectedJob) {
			const sector = jobCatalog.sectors.find((s) => s.id === selectedJob.sectorId);
			const industry = sector ? jobCatalog.industries.find((i) => i.id === sector.industryId) : null;
			const economy = industry ? jobCatalog.economies.find((e) => e.id === industry.economyId) : null;

			careerPath = {
				economy: economy?.name,
				industry: industry?.name,
				sector: sector?.name,
				job: selectedJob.name,
				jobId: selectedJob.id,
				sectorId: selectedJob.sectorId,
				industryId: industry?.id,
				economyId: economy?.id,
			};
		}

		// Get location details
		const selectedCountry = locationData.countries.find((c) => c.value === formData.country);
		const selectedState = selectedCountry?.states.find((s) => s.value === formData.state);
		const selectedCity = selectedState?.cities.find((c) => c.value === formData.city);

		const locationDetails = {
			country: {
				value: formData.country,
				label: selectedCountry?.label,
			},
			state: {
				value: formData.state,
				label: selectedState?.label,
			},
			city: {
				value: formData.city,
				label: selectedCity?.label,
			},
		};

		// Comprehensive registration data logging
		const registrationData = {
			userType: {
				id: selectedUserType?.id,
				name: selectedUserType?.name,
			},
			personalInfo: {
				fullName: formData.fullName,
				email: formData.email,
				phone: formData.phone,
				gender: formData.gender,
			},
			location: locationDetails,
			...(selectedUserType?.id === "company" && {
				companyInfo: {
					companyName: formData.companyName,
					industry: formData.industry,
					companySize: formData.companySize,
					description: formData.description,
					website: formData.website,
				},
			}),
			...(selectedUserType?.id === "talent" && {
				talentInfo: {
					experience: formData.experience,
					skills: formData.skills,
					bio: formData.bio,
					careerPath: careerPath,
				},
			}),
			...(selectedUserType?.id === "cyber-agent" && {
				cyberAgentInfo: {
					specialization: formData.specialization,
					certifications: formData.certifications,
					services: formData.services,
				},
			}),
			...((selectedUserType?.id === "scout" ||
				selectedUserType?.id === "professional" ||
				selectedUserType?.id === "mentor" ||
				selectedUserType?.id === "philanthropist") && {
				professionalInfo: {
					background: formData.background,
					interests: formData.interests,
				},
			}),
			timestamp: new Date().toISOString(),
		};

		console.log("🚀 REGISTRATION SUBMISSION DEBUG:");
		console.log("=====================================");
		console.log("📋 Registration Data:", JSON.stringify(registrationData, null, 2));
		console.log("=====================================");
		console.log("✅ All form fields:", formData);
		console.log("👤 Selected user type:", selectedUserType);
		if (selectedJob) {
			console.log("💼 Selected job:", selectedJob);
			console.log("🎯 Career path:", careerPath);
		}
		console.log("📍 Location details:", locationDetails);
		console.log("⚠️  Validation errors:", validationErrors);
		console.log("=====================================");

		// TODO: Replace this with actual API call
		// Example: await registerUser(registrationData);

		setCurrentStep("success");
	};

	const resetForm = (): void => {
		setCurrentStep("selection");
		setSelectedUserType(null);
		setFormData({});
		setSelectedJob(null);
		setValidationErrors([]);
	};

	const getFieldError = (fieldName: string): string | undefined => {
		return validationErrors.find((error) => error.field === fieldName)?.message;
	};

	// Dynamic location data getters
	const getAvailableStates = () => {
		const selectedCountry = locationData.countries.find((c) => c.value === formData.country);
		return selectedCountry?.states || [];
	};

	const getAvailableCities = () => {
		const selectedCountry = locationData.countries.find((c) => c.value === formData.country);
		const selectedState = selectedCountry?.states.find((s) => s.value === formData.state);
		return selectedState?.cities || [];
	};

	const renderForm = (): React.ReactNode => {
		if (!selectedUserType) return null;

		const commonFields = (
			<>
				<FormInput
					label="Full Name"
					value={formData.fullName || ""}
					onChange={(value) => handleInputChange("fullName", value)}
					placeholder="Enter your full name"
					required
					error={getFieldError("fullName")}
				/>
				<FormInput
					label="Email Address"
					type="email"
					value={formData.email || ""}
					onChange={(value) => handleInputChange("email", value)}
					placeholder="Enter your email address"
					required
					error={getFieldError("email")}
				/>
				<FormInput
					label="Phone Number"
					type="tel"
					value={formData.phone || ""}
					onChange={(value) => handleInputChange("phone", value)}
					placeholder="Enter your phone number"
					required
					error={getFieldError("phone")}
				/>
				<FormInput
					label="Gender"
					type="select"
					value={formData.gender || ""}
					onChange={(value) => handleInputChange("gender", value)}
					placeholder="Select your gender"
					required
					options={[
						{ value: "male", label: "Male" },
						{ value: "female", label: "Female" },
					]}
					error={getFieldError("gender")}
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<FormInput
						label="Country"
						type="select"
						value={formData.country || ""}
						onChange={(value) => handleInputChange("country", value)}
						placeholder="Select country"
						required
						options={locationData.countries.map((country) => ({
							value: country.value,
							label: country.label,
						}))}
						error={getFieldError("country")}
					/>
					<FormInput
						label="State"
						type="select"
						value={formData.state || ""}
						onChange={(value) => handleInputChange("state", value)}
						placeholder={formData.country ? "Select state" : "Select country first"}
						required
						disabled={!formData.country}
						options={getAvailableStates().map((state) => ({
							value: state.value,
							label: state.label,
						}))}
						error={getFieldError("state")}
					/>
					<FormInput
						label="City"
						type="text"
						value={formData.city || ""}
						onChange={(value) => handleInputChange("city", value)}
						placeholder={"enter city"}
						required
						disabled={!formData.state}
						error={getFieldError("city")}
					/>
				</div>
			</>
		);

		switch (selectedUserType.id) {
			case "company":
				return (
					<>
						<FormInput
							label="Company Name"
							value={formData.companyName || ""}
							onChange={(value) => handleInputChange("companyName", value)}
							placeholder="Enter company name"
							required
							error={getFieldError("companyName")}
						/>
						<FormInput
							label="Industry"
							type="select"
							value={formData.industry || ""}
							onChange={(value) => handleInputChange("industry", value)}
							placeholder="Select your industry"
							required
							options={[
								{ value: "technology", label: "Technology" },
								{ value: "finance", label: "Finance" },
								{ value: "healthcare", label: "Healthcare" },
								{ value: "education", label: "Education" },
								{ value: "manufacturing", label: "Manufacturing" },
								{ value: "other", label: "Other" },
							]}
							error={getFieldError("industry")}
						/>
						<FormInput
							label="Company Size"
							type="select"
							value={formData.companySize || ""}
							onChange={(value) => handleInputChange("companySize", value)}
							placeholder="Select company size"
							required
							options={[
								{ value: "1-10", label: "1-10 employees" },
								{ value: "11-50", label: "11-50 employees" },
								{ value: "51-200", label: "51-200 employees" },
								{ value: "201-1000", label: "201-1000 employees" },
								{ value: "1000+", label: "1000+ employees" },
							]}
							error={getFieldError("companySize")}
						/>
						{commonFields}
						<FormInput
							label="Company Description"
							type="textarea"
							value={formData.description || ""}
							onChange={(value) => handleInputChange("description", value)}
							placeholder="Tell us about your company..."
							error={getFieldError("description")}
						/>
						<FormInput
							label="Website"
							type="url"
							value={formData.website || ""}
							onChange={(value) => handleInputChange("website", value)}
							placeholder="https://yourcompany.com"
							error={getFieldError("website")}
						/>
					</>
				);

			case "talent":
				return (
					<>
						{commonFields}
						<div className="mb-6">
							<Label className="text-gray-300 mb-4 block">
								Career Selection <span className="text-red-400">*</span>
							</Label>
							<JobSelector
								selectedJob={selectedJob}
								onJobSelect={handleJobSelect}
								error={getFieldError("job")}
							/>
						</div>
						<FormInput
							label="Years of Experience"
							type="select"
							value={formData.experience || ""}
							onChange={(value) => handleInputChange("experience", value)}
							placeholder="Select your experience level"
							required
							options={[
								{ value: "0-1", label: "0-1 years (Entry Level)" },
								{ value: "2-5", label: "2-5 years (Mid Level)" },
								{ value: "6-10", label: "6-10 years (Senior Level)" },
								{ value: "10+", label: "10+ years (Expert Level)" },
							]}
							error={getFieldError("experience")}
						/>
						<FormInput
							label="Skills"
							value={formData.skills || ""}
							onChange={(value) => handleInputChange("skills", value)}
							placeholder="List your key skills (comma-separated)"
							required
							error={getFieldError("skills")}
						/>
						<FormInput
							label="Bio"
							type="textarea"
							value={formData.bio || ""}
							onChange={(value) => handleInputChange("bio", value)}
							placeholder="Tell us about yourself and your professional background..."
							error={getFieldError("bio")}
						/>
					</>
				);

			case "cyber-agent":
				return (
					<>
						{commonFields}
						<FormInput
							label="Specialization"
							type="select"
							value={formData.specialization || ""}
							onChange={(value) => handleInputChange("specialization", value)}
							placeholder="Select your specialization"
							required
							options={[
								{ value: "cybersecurity", label: "Cybersecurity" },
								{ value: "software-development", label: "Software Development" },
								{ value: "data-science", label: "Data Science" },
								{ value: "cloud-computing", label: "Cloud Computing" },
								{ value: "ai-ml", label: "AI/Machine Learning" },
								{ value: "other", label: "Other" },
							]}
							error={getFieldError("specialization")}
						/>
						<FormInput
							label="Certifications"
							value={formData.certifications || ""}
							onChange={(value) => handleInputChange("certifications", value)}
							placeholder="List your professional certifications"
							error={getFieldError("certifications")}
						/>
						<FormInput
							label="Services Offered"
							type="textarea"
							value={formData.services || ""}
							onChange={(value) => handleInputChange("services", value)}
							placeholder="Describe the services you offer..."
							required
							error={getFieldError("services")}
						/>
					</>
				);

			default:
				return (
					<>
						{commonFields}
						<FormInput
							label="Professional Background"
							type="textarea"
							value={formData.background || ""}
							onChange={(value) => handleInputChange("background", value)}
							placeholder="Tell us about your professional background..."
							required
							error={getFieldError("background")}
						/>
						<FormInput
							label="Areas of Interest"
							value={formData.interests || ""}
							onChange={(value) => handleInputChange("interests", value)}
							placeholder="What areas are you interested in?"
							error={getFieldError("interests")}
						/>
					</>
				);
		}
	};

	return (
		<LayoutWrapper>
			<div className="min-h-screen bg-gray-900 text-white">
				{/* Main Content */}
				<div className="py-12">
					<div className="pt-8">
						{currentStep !== "selection" && (
							<Button variant="ghost" onClick={resetForm} className="text-white hover:text-green-400">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back to Selection
							</Button>
						)}
					</div>
					<AnimatePresence mode="wait">
						{/* User Type Selection */}
						{currentStep === "selection" && (
							<motion.div
								key="selection"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="text-center mb-16">
									<div className="text-6xl mb-6">👋</div>
									<h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
										Join JFAN Community
									</h1>
									<p className="text-xl text-gray-300 max-w-3xl mx-auto">
										Choose your role and become part of Africa's largest professional
										network. Connect, collaborate, and contribute to economic growth
										across the continent.
									</p>
								</div>

								<div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
									{userTypes.map((userType) => (
										<Card
											key={userType.id}
											className={`${userType.bgColor} hover:border-green-400 cursor-pointer bg-gray-800 border-gray-700 transition-all duration-300`}
											onClick={() => handleUserTypeSelect(userType)}>
											<CardContent className="p-6">
												<div className="text-center mb-6">
													<div
														className={`${userType.color} mb-4 flex justify-center`}>
														{userType.icon}
													</div>
													<h3
														className={`text-xl font-bold ${userType.color} mb-2`}>
														{userType.name}
													</h3>
													<p className="text-gray-300 text-sm mb-4">
														{userType.description}
													</p>
												</div>

												<div className="space-y-2 mb-6">
													{userType.features.map((feature, index) => (
														<div
															key={index}
															className="flex items-center space-x-2 text-sm text-gray-400">
															<Check className="w-3 h-3 text-green-400" />
															<span>{feature}</span>
														</div>
													))}
												</div>

												<Button className="w-full bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90">
													Register as {userType.name}
												</Button>
											</CardContent>
										</Card>
									))}
								</div>
							</motion.div>
						)}

						{/* Registration Form */}
						{currentStep === "form" && selectedUserType && (
							<motion.div
								key="form"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="text-center mb-12">
									<div className={`${selectedUserType.color} mb-4 flex justify-center`}>
										{selectedUserType.icon}
									</div>
									<h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
										Register as {selectedUserType.name}
									</h2>
									<p className="text-gray-300">{selectedUserType.description}</p>
								</div>

								{/* Validation Errors Summary */}
								{validationErrors.length > 0 && (
									<Alert className="mb-6 border-red-500 bg-red-500/10">
										<AlertCircle className="h-4 w-4 text-red-400" />
										<AlertDescription className="text-red-400">
											Please fix the following errors before submitting:
											<ul className="list-disc list-inside mt-2">
												{validationErrors.map((error, index) => (
													<li key={index}>{error.message}</li>
												))}
											</ul>
										</AlertDescription>
									</Alert>
								)}

								<Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
									<CardContent className="p-8">
										{renderForm()}

										<div className="flex items-center space-x-4 mt-8">
											<Button
												variant="outline"
												onClick={() => setCurrentStep("selection")}
												className="border-gray-600 text-gray-300 hover:border-green-400 hover:text-green-400">
												<ArrowLeft className="w-4 h-4 mr-2" />
												Back
											</Button>
											<Button
												className="flex-1 bg-gradient-to-r from-green-500 to-yellow-500 text-gray-900 hover:opacity-90"
												onClick={handleSubmit}>
												Complete Registration
												<ArrowRight className="w-4 h-4 ml-2" />
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						)}

						{/* Success Page */}
						{currentStep === "success" && (
							<motion.div
								key="success"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
								<div className="text-6xl mb-6">🎉</div>
								<h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
									Welcome to JFAN!
								</h2>
								<p className="text-xl text-gray-300 mb-8">
									Your registration as a{" "}
									<span className="text-green-400 font-bold">{selectedUserType?.name}</span> has
									been completed successfully. We're excited to have you join our community!
								</p>

								<Card className="mb-8 bg-gray-800 border-gray-700">
									<CardHeader>
										<CardTitle className="text-green-400">What's Next?</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="space-y-3 text-left text-white">
											<div className="flex items-center space-x-3">
												<Check className="w-5 h-5 text-green-400" />
												<span>
													Check your email for verification instructions
												</span>
											</div>
											<div className="flex items-center space-x-3">
												<Check className="w-5 h-5 text-green-400" />
												<span>
													Wait for admin approval to access the platform
												</span>
											</div>
											<div className="flex items-center space-x-3">
												<Check className="w-5 h-5 text-green-400" />
												<span>Complete your profile setup once approved</span>
											</div>
											<div className="flex items-center space-x-3">
												<Check className="w-5 h-5 text-green-400" />
												<span>Start connecting with the community</span>
											</div>
										</div>
									</CardContent>
								</Card>

								<div className="space-y-4">
									<Button
										variant="ghost"
										onClick={resetForm}
										className="text-white hover:text-green-400">
										Register Another Account
									</Button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default RegistrationPortal;
