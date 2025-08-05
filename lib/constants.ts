export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log(NEXT_PUBLIC_BACKEND_URL);

export const sidebarLinks = [
	{
		imgURL: "/icons/home.svg",
		route: "/",
		label: "Home",
	},
	{
		imgURL: "/icons/dollar-circle.svg",
		route: "/my-banks",
		label: "My Banks",
	},
	{
		imgURL: "/icons/transaction.svg",
		route: "/transaction-history",
		label: "Transaction History",
	},
	{
		imgURL: "/icons/money-send.svg",
		route: "/payment-transfer",
		label: "Transfer Funds",
	},
];

// good_user / good_password - Bank of America
export const TEST_USER_ID = "6627ed3d00267aa6fa3e";

// custom_user -> Chase Bank
// export const TEST_ACCESS_TOKEN =
//   "access-sandbox-da44dac8-7d31-4f66-ab36-2238d63a3017";

// custom_user -> Chase Bank
export const TEST_ACCESS_TOKEN = "access-sandbox-229476cf-25bc-46d2-9ed5-fba9df7a5d63";

export const ITEMS = [
	{
		id: "6624c02e00367128945e", // appwrite item Id
		accessToken: "access-sandbox-83fd9200-0165-4ef8-afde-65744b9d1548",
		itemId: "VPMQJKG5vASvpX8B6JK3HmXkZlAyplhW3r9xm",
		userId: "6627ed3d00267aa6fa3e",
		accountId: "X7LMJkE5vnskJBxwPeXaUWDBxAyZXwi9DNEWJ",
	},
	{
		id: "6627f07b00348f242ea9", // appwrite item Id
		accessToken: "access-sandbox-74d49e15-fc3b-4d10-a5e7-be4ddae05b30",
		itemId: "Wv7P6vNXRXiMkoKWPzeZS9Zm5JGWdXulLRNBq",
		userId: "6627ed3d00267aa6fa3e",
		accountId: "x1GQb1lDrDHWX4BwkqQbI4qpQP1lL6tJ3VVo9",
	},
];

export const topCategoryStyles = {
	"Food and Drink": {
		bg: "bg-blue-25",
		circleBg: "bg-blue-100",
		text: {
			main: "text-blue-900",
			count: "text-blue-700",
		},
		progress: {
			bg: "bg-blue-100",
			indicator: "bg-blue-700",
		},
		icon: "/icons/monitor.svg",
	},
	Travel: {
		bg: "bg-success-25",
		circleBg: "bg-success-100",
		text: {
			main: "text-success-900",
			count: "text-success-700",
		},
		progress: {
			bg: "bg-success-100",
			indicator: "bg-success-700",
		},
		icon: "/icons/coins.svg",
	},
	default: {
		bg: "bg-pink-25",
		circleBg: "bg-pink-100",
		text: {
			main: "text-pink-900",
			count: "text-pink-700",
		},
		progress: {
			bg: "bg-pink-100",
			indicator: "bg-pink-700",
		},
		icon: "/icons/shopping-bag.svg",
	},
};

export const transactionCategoryStyles = {
	"Food and Drink": {
		borderColor: "border-pink-600",
		backgroundColor: "bg-pink-500",
		textColor: "text-pink-700",
		chipBackgroundColor: "bg-inherit",
	},
	Payment: {
		borderColor: "border-success-600",
		backgroundColor: "bg-green-600",
		textColor: "text-success-700",
		chipBackgroundColor: "bg-inherit",
	},
	"Bank Fees": {
		borderColor: "border-success-600",
		backgroundColor: "bg-green-600",
		textColor: "text-success-700",
		chipBackgroundColor: "bg-inherit",
	},
	Transfer: {
		borderColor: "border-red-700",
		backgroundColor: "bg-red-700",
		textColor: "text-red-700",
		chipBackgroundColor: "bg-inherit",
	},
	Processing: {
		borderColor: "border-[#F2F4F7]",
		backgroundColor: "bg-gray-500",
		textColor: "text-[#344054]",
		chipBackgroundColor: "bg-[#F2F4F7]",
	},
	Success: {
		borderColor: "border-[#12B76A]",
		backgroundColor: "bg-[#12B76A]",
		textColor: "text-[#027A48]",
		chipBackgroundColor: "bg-[#ECFDF3]",
	},
	Travel: {
		borderColor: "border-[#0047AB]",
		backgroundColor: "bg-blue-500",
		textColor: "text-blue-700",
		chipBackgroundColor: "bg-[#ECFDF3]",
	},
	default: {
		borderColor: "",
		backgroundColor: "bg-blue-500",
		textColor: "text-blue-700",
		chipBackgroundColor: "bg-inherit",
	},
};

// lib/constants.ts new
import { Region, Community, JobCatalog, RegionDetails } from "../types";

export const africanCountries: string[] = [
	"Algeria",
	"Angola",
	"Benin",
	"Botswana",
	"Burkina Faso",
	"Burundi",
	"Cameroon",
	"Cape Verde",
	"Central African Republic",
	"Chad",
	"Comoros",
	"Congo",
	"Democratic Republic of Congo",
	"Djibouti",
	"Egypt",
	"Equatorial Guinea",
	"Eritrea",
	"Eswatini",
	"Ethiopia",
	"Gabon",
	"Gambia",
	"Ghana",
	"Guinea",
	"Guinea-Bissau",
	"Ivory Coast",
	"Kenya",
	"Lesotho",
	"Liberia",
	"Libya",
	"Madagascar",
	"Malawi",
	"Mali",
	"Mauritania",
	"Mauritius",
	"Morocco",
	"Mozambique",
	"Namibia",
	"Niger",
	"Nigeria",
	"Rwanda",
	"São Tomé and Príncipe",
	"Senegal",
	"Seychelles",
	"Sierra Leone",
	"Somalia",
	"South Africa",
	"South Sudan",
	"Sudan",
	"Tanzania",
	"Togo",
	"Tunisia",
	"Uganda",
	"Zambia",
	"Zimbabwe",
];

export const regions: Region[] = [
	{ name: "North Africa", country: "Egypt", color: "#10B981" },
	{ name: "Southern Africa", country: "South Africa", color: "#F59E0B" },
	{ name: "Central Africa", country: "Central African Republic", color: "#6B7280" },
	{ name: "West Africa", country: "Nigeria", color: "#10B981" },
	{ name: "East Africa", country: "Kenya", color: "#F59E0B" },
	{ name: "Diaspora Region", country: "Global", color: "#6B7280" },
];

export const communities: Community[] = [
	{ name: "Athletes Community", icon: "🏃", description: "Sports professionals and enthusiasts" },
	{ name: "Creative Community", icon: "🎨", description: "Artists, designers, and creative minds" },
	{ name: "Entrepreneurship Community", icon: "💼", description: "Business leaders and innovators" },
	{ name: "Services Community", icon: "🔧", description: "Service providers and skilled workers" },
	{ name: "Enablement Community", icon: "🤝", description: "Supporters and facilitators" },
];

export const jobCatalog: JobCatalog = {
	economies: [
		{ id: 1, name: "Creative Economy" },
		{ id: 2, name: "Athletic Economy" },
		{ id: 3, name: "Entrepreneurial Economy" },
	],
	industries: [
		{ id: 101, economyId: 1, name: "Arts Industry" },
		{ id: 102, economyId: 1, name: "Science & Technology Industry" },
		{ id: 103, economyId: 1, name: "Artisanal Industry" },
		{ id: 104, economyId: 1, name: "Vocational Industry" },
		{ id: 105, economyId: 2, name: "Big Arena Sports Industry" },
		{ id: 106, economyId: 2, name: "Mental Sports Industry" },
		{ id: 107, economyId: 2, name: "Track & Field Sports Industry" },
		{ id: 108, economyId: 2, name: "Animal Sports Industry" },
		{ id: 109, economyId: 3, name: "Agricultural Entrepreneurs" },
		{ id: 110, economyId: 3, name: "Tourism and Hospitality" },
		{ id: 111, economyId: 3, name: "Manufacturing Entrepreneurs" },
		{ id: 112, economyId: 3, name: "Logistical Entrepreneurs" },
	],
	sectors: [],
	jobs: [],
};

export const regionDetails: Record<string, RegionDetails> = {
	"North Africa": {
		countries: ["Algeria", "Egypt", "Libya", "Morocco", "Sudan", "Tunisia"],
		stats: { members: "2.5M+", companies: "45K+", jobs: "125K+" },
		languages: ["Arabic", "French", "English"],
		industries: ["Oil & Gas", "Tourism", "Agriculture", "Technology"],
		description: "Gateway between Africa, Europe, and the Middle East with rich cultural heritage and growing tech ecosystem.",
	},
	"West Africa": {
		countries: [
			"Nigeria",
			"Ghana",
			"Senegal",
			"Mali",
			"Burkina Faso",
			"Niger",
			"Guinea",
			"Sierra Leone",
			"Liberia",
			"Ivory Coast",
			"Gambia",
			"Guinea-Bissau",
			"Cape Verde",
			"Mauritania",
			"Togo",
			"Benin",
		],
		stats: { members: "8.2M+", companies: "120K+", jobs: "380K+" },
		languages: ["English", "French", "Portuguese", "Local Languages"],
		industries: ["Technology", "Oil & Gas", "Agriculture", "Finance", "Creative Arts"],
		description: "Africa's most populous region and economic powerhouse, leading in fintech innovation and creative industries.",
	},
	"East Africa": {
		countries: ["Kenya", "Tanzania", "Uganda", "Rwanda", "Ethiopia", "Burundi", "South Sudan", "Somalia", "Eritrea", "Djibouti"],
		stats: { members: "3.8M+", companies: "65K+", jobs: "190K+" },
		languages: ["English", "Swahili", "Amharic", "Local Languages"],
		industries: ["Agriculture", "Tourism", "Technology", "Manufacturing", "Coffee Export"],
		description: "Hub of innovation and entrepreneurship with strong agricultural base and growing tech startup ecosystem.",
	},
	"Central Africa": {
		countries: [
			"Central African Republic",
			"Cameroon",
			"Chad",
			"Democratic Republic of Congo",
			"Republic of Congo",
			"Equatorial Guinea",
			"Gabon",
			"São Tomé and Príncipe",
		],
		stats: { members: "1.9M+", companies: "28K+", jobs: "85K+" },
		languages: ["French", "English", "Portuguese", "Local Languages"],
		industries: ["Mining", "Forestry", "Oil & Gas", "Agriculture"],
		description: "Resource-rich region with vast mineral wealth and growing focus on sustainable development initiatives.",
	},
	"Southern Africa": {
		countries: [
			"South Africa",
			"Botswana",
			"Zimbabwe",
			"Zambia",
			"Namibia",
			"Lesotho",
			"Eswatini",
			"Malawi",
			"Mozambique",
			"Madagascar",
			"Mauritius",
			"Seychelles",
			"Comoros",
		],
		stats: { members: "4.1M+", companies: "85K+", jobs: "245K+" },
		languages: ["English", "Afrikaans", "Portuguese", "Local Languages"],
		industries: ["Mining", "Finance", "Technology", "Tourism", "Manufacturing"],
		description: "Industrial and financial hub of Africa with advanced infrastructure and established business networks.",
	},
	"Diaspora Region": {
		countries: ["Global Network"],
		stats: { members: "2.8M+", companies: "95K+", jobs: "200K+" },
		languages: ["Multi-lingual", "English", "French", "Portuguese"],
		industries: ["Technology", "Healthcare", "Education", "Consulting", "Finance"],
		description: "Connecting African professionals worldwide, facilitating knowledge transfer and investment opportunities.",
	},
};
