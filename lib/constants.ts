export const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000/api/v1";
console.log("Backend URL from constants:", NEXT_PUBLIC_BACKEND_URL);
console.log("Environment variable NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);

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

// Team Members Data Structure
export interface TeamMember {
	id: string;
	name: string;
	position: string;
	department: string;
	bio: string; // Brief bio for card preview
	biography: string; // Detailed biography for modal
	image: string;
	socialLinks: {
		linkedin?: string;
		twitter?: string;
		github?: string;
		email?: string;
	};
	skills: string[];
	experience: string;
	education: string;
	achievements: string[];
}

export const teamMembers: TeamMember[] = [
	{
		id: "1",
		name: "Amb IDAH Onyilokwu Kingsley David",
		position: "Founder/CEO IQ-IHRAP; JFAN",
		department: "Executive Leadership",
		bio: "Visionary leader with over 15 years of experience in African economic development and talent mobilization. Dr. Hassan has spearheaded numerous initiatives connecting African professionals globally.",
		biography: "Ambassador IDAH Onyilokwu Kingsley David is a distinguished leader, entrepreneur, and advocate for African economic development. With over 15 years of dedicated experience in talent mobilization and economic empowerment across Africa, he has established himself as a visionary in connecting African professionals with global opportunities.\n\nAs the Founder and CEO of IQ-IHRAP (Intelligence Quotient - Integrated Human Resource and Project Management) and JFAN (Jobs For Africa Now), Ambassador David has pioneered innovative approaches to addressing unemployment and underemployment across the African continent. His work focuses on creating sustainable pathways for African talent to access international markets while building robust local economies.\n\nHis leadership philosophy centers on the belief that Africa's greatest resource is its people, and through strategic talent development and international partnerships, the continent can achieve unprecedented economic growth. Under his guidance, JFAN has grown into a comprehensive platform serving millions of African professionals worldwide.\n\nAmbassador David holds advanced degrees in Development Economics and has been recognized internationally for his contributions to African economic development. He regularly speaks at international forums on topics ranging from digital transformation in Africa to sustainable development goals, and has been featured in numerous publications for his innovative approaches to talent mobilization.",
		image: "/team/amb-kingsley-david-ceo.jpeg",
		socialLinks: {
			linkedin: "https://linkedin.com/in/dr-amina-hassan",
			twitter: "https://twitter.com/aminahassan",
			email: "amina.hassan@jfan.africa",
		},
		skills: ["Strategic Leadership", "Economic Development", "Public Speaking", "Policy Development"],
		experience: "15+ years in African Economic Development",
		education: "PhD in Development Economics, University of Oxford",
		achievements: [
			"Featured in Forbes Africa 40 Under 40",
			"Led $50M funding round for African talent initiatives",
			"Keynote speaker at African Union Economic Summit",
		],
	},
	{
		id: "2",
		name: "Barr Hezekiah O. IMONIVWERHA",
		position: "Chief Consultant JFAN",
		department: "Technology",
		bio: "Development Manager (CBDM) – 2023, Certified Physical Security Manager (CPSM) – 2021, Certified Intelligence Analyst (CINTA) – 2020, Certified Cyber Breach Investigator (CCBI - Switzerland) – 2020, Certified Enterprise Security Risk Manager (CESRM – UK) – 2023",
		biography: "Born February 18th 1962, Barr. Hezekiah O. IMONIVWHERHA hails from Eku, in Delta State of Nigeria and holds an LL.B from the University of Benin, Benin City after a brief stint at the Federal Polytechnic Idah, Kogi State where he obtained a National Diploma in Marketing. He further went on to bag a BL at the Nigerian Law School after the completion of his first Law Degree (LL.B) at the University of Benin; and thereafter an MBA at the Delta State University Abraka followed by an Advanced Diploma SOM at the University of Lagos. Finally in 2012, he earned a LLM from the University of Lagos to cap his academic sojourn. \n\n Professionally, Barr Hezekiah is a man of so many parts and paths: he is a certified Management Consultant (CMC) - 2019, a Chartered Business Development Manager (CBDM) – 2023, Certified Physical Security Manager (CPSM) – 2021, Certified Intelligence Analyst (CINTA) – 2020, Certified Cyber Breach Investigator (CCBI - Switzerland) – 2020, Certified Enterprise Security Risk Manager (CESRM – UK) – 2023, acquired the Institute of Disaster Management & Safety Science’s Program Officer Certification in 2014 --- to mention only a few\n\nBarr Hezekiah is a Fellow of the Nigerian Bar Association, Chartered Institute of Arbitrator Nigeria, Institute of Mediators and Conciliators, the Association of Counterterrorism and Security Professionals USA",
		image: "/team/Barr-Hezekiah-O.jpeg",

		socialLinks: {
			linkedin: "https://linkedin.com/in/",
			twitter: "https://twitter.com",
			email: "aisha.mwangi@jfan.africa",
		},
		skills: ["Strategic Partnerships", "Business Development", "Negotiation", "Relationship Management"],
		experience: "11+ years in Strategic Partnerships",
		education: "MBA Strategic Management, London Business School",
		achievements: [
			"Secured partnerships with 200+ global companies",
			"Generated $25M in partnership value",
			"Expanded JFAN presence to 15 international markets",
		],
	},
	{
		id: "3",
		name: "Professor Hilary Inyang",
		position: "Head of Regional Operations",
		department: "Operations",
		bio: "Operations expert specializing in multi-regional coordination across Africa. Fatou ensures seamless collaboration between our five continental regions and diaspora communities.",
		biography: " Professor Hilary Inyang is a renowned Geoenvironmental researcher, educator and explorer, reviewer of the 2017 IPCC report and Honorary Theme Editor of the United Nation Encyclopedia of Life Support Systems (Environmental Monitoring Section). He is currently the Honorary President of the International Society of Environmental Geotechnology (ISEG) as well as the United Nations Educational, Scientific and Cultural Organization (UNESCO)-Paris Consultant on Water Security; Visiting Professor at the Indian Institute of Technology-Bombay (IIT-B); and Visiting International Research Fellow at the Africa Institute of South Africa (AISA). \n Prof Inyang was most recently, a United States Ambassador’s Distinguished Scholar to Ethiopia (Called back after the COVID/Ethiopian Civil War-induced break to resume September, 2022). He is a two-time Vice Chancellor (the African University of Science and Technology (AUST), Abuja; and the Botswana International University of Science and Technology (BIUST), Palapye, Botswana); former Duke Energy Distinguished Professor of Environmental Engineering and Science and Global Institute Director at the University of North Carolina-Charlotte, United States of America; former DuPont Professor and Center Director at the University of Massachusetts Lowell, United States of America; and former Chairman of the United States Environmental Protection Agency’s Science Advisory Board (Engineering). He is the author of 276 publications on various topics in environmental systems and climate change, including the 2022 United Nations Educational, Scientific and Cultural Organization (UNESCO) Guidebook on Scientific Writing. He is the winner of more than 25 professional awards. \nProf Inyang holds a PhD in Civil and Construction Engineering from Iowa State University, Nigeria. He obtained his MS in Civil and Environmental Engineering, and BSc in Civil and Environmental Engineering from North Dakota State University, United States. (1983, Oklahoma State University, United Statesa). He obtained his BSc Honours in Geology from University of Calabar, Nigeia.",
		image: "/team/prof-hiilary.png",
		socialLinks: {
			linkedin: "https://linkedin.com/in/#",
			twitter: "https://twitter.com/#",
			email: "hillary.iyang@jfan.africa",
		},
		skills: ["Operations Management", "Cross-Cultural Communication", "Project Management", "Team Leadership"],
		experience: "10+ years in Continental Operations",
		education: "PhD Civil and Construction Engineering",
		achievements: [
			"Coordinated operations across 55 African countries",
			"Reduced operational costs by 40% through process optimization",
			"Led successful expansion into diaspora markets",
		],
	},
	{
		id: "4",
		name: "Sir Khalifah Onu",
		position: "Head of Talent Development",
		department: "Human Resources",
		bio: "People development specialist focused on unlocking Africa's human potential. Dr. Asante designs programs that enhance skills and create pathways for career advancement.",
		biography: "Mr. Khalifah Onu stands as a distinguished mentor, visionary leader, and a pioneering force in entrepreneurial and philanthropic endeavors. His profound impact as a strategic nation-builder is evident through his transformative initiatives and his relentless drive to empower communities across Africa and beyond. \n\n A Nigerian-born British business magnate, Mr. Onu is renowned for his unparalleled expertise in enterprise development and wealth redistribution. His tenure as a former Presidential Aide in Nigeria laid the foundation for a career that has blossomed into one of global influence. Today, Mr. Khalifah Onu is regarded as a trailblazer whose leadership and strategic vision have shaped industries, changed lives, and uplifted communities. \n\nAs the Chairman of Royal CBS Group Limited, he has garnered respect for his innovation, ethical entrepreneurship, and strategic investments. His reputation is defined by a commitment to job creation and economic empowerment, earning him the moniker “The Wing of Freedom.” Far from being a wealth hoarder, Mr. Onu is celebrated as a distributor of wealth and creator of opportunities, qualities that distinguish his entrepreneurial journey.",
		image: "/team/kalifa-onu.jpeg",
		socialLinks: {
			linkedin: "https://linkedin.com/in/",
			twitter: "https://twitter.com",
			email: "kalifa.onu@jfan.africa",
		},

		skills: ["Talent Development", "Training Design", "Performance Management", "Leadership Coaching"],
		experience: "14+ years in Human Resource Development",
		education: "PhD in Organizational Psychology, University of Ghana",
		achievements: [
			"Developed training programs for 100K+ professionals",
			"Published 3 books on African talent development",
			"Consultant to World Bank on skills development",
		],
	},
	{
		id: "5",
		name: "Micheal Dalu",
		position: "Chief Technology Officer",
		department: "Technology",
		bio: "Tech innovator passionate about building scalable platforms that connect Africa's digital talent with global opportunities. Samuel leads our technical vision and product development.",
		biography: "Micheal is a distinguished technology leader with over 12 years of experience in software engineering and digital platform development. As Chief Technology Officer at JFAN, he spearheads the technical vision and product development initiatives that power Africa's largest talent mobilization platform.\n\nHis expertise spans full-stack development, system architecture, artificial intelligence, and cloud computing. Micheal has been instrumental in building scalable platforms that have successfully connected over 2 million African professionals with global opportunities. His innovative approach to talent matching algorithms has revolutionized how African professionals are discovered and connected with international employers.\n\nBefore joining JFAN, Micheal held senior technical roles at various multinational technology companies, where he gained extensive experience in building enterprise-grade systems that serve millions of users globally. His passion for leveraging technology to solve Africa's unique challenges has driven him to develop cutting-edge solutions that bridge the gap between African talent and global opportunities.\n\nSamuel holds a Master's degree in Computer Science from the University of Cape Town and is a recognized thought leader in African technology circles. He regularly speaks at international technology conferences and has published several research papers on machine learning applications in talent acquisition and workforce development.",
		image: "/team/mike.jpg",
		socialLinks: {
			linkedin: "https://linkedin.com/in/",
			github: "https://github.com/mikedalu",
			twitter: "https://twitter.com/",
			email: "micheal.dalu@jfan.africa",
		},
		skills: ["Full-Stack Development", "System Architecture", "AI/ML", "Cloud Computing"],
		experience: "5+ years in Software Engineering",
		education: "BSc Zoology, Bsc. Software Engineering",
		achievements: [
			"Built platforms serving 2M+ African professionals",
			"Patent holder for talent matching algorithms",
			"Speaker at AfricaTech Summit 2021",
		],
	},

	{
		id: "6",
		name: "Abdulmalik Yakubu",
		position: "Head of Media & Marketing",
		department: "Marketing & Media",
		bio: "Marketing specialist ",
		biography: "",
		image: "/team/malik.png",
		socialLinks: {
			linkedin: "https://linkedin.com/in/omar-el-rashid",
			github: "https://github.com/omarelrashid",
			email: "omar.elrashid@jfan.africa",
		},
		skills: ["Public Speaking", "Lead Conversion", "Statistical Analysis", "Marketing"],
		experience: "4+ years in Digital Marketing",
		education: "Msc Business Management",
		achievements: [
			"Built ML models with 95% accuracy in talent matching",
			"Published research on African labor market trends",
			"Saved $2M annually through predictive analytics",
		],
	},
];
