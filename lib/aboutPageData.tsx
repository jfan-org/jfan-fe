// lib/aboutData.ts
import { Target, Globe, Users, Award, TrendingUp, Shield, Heart, Lightbulb, Building, Handshake, Brain, Zap } from "lucide-react";
import { Statistic, TeamMember, Milestone, CoreValue, Initiative, Partnership } from "../types";

export const aboutStatistics: Statistic[] = [
	{
		value: "22M+",
		label: "Active Members",
		description: "Professionals across Africa and diaspora",
		icon: <Users className="w-8 h-8" />,
	},
	{
		value: "55",
		label: "Countries",
		description: "Complete African continental coverage",
		icon: <Globe className="w-8 h-8" />,
	},
	{
		value: "438K+",
		label: "Partner Companies",
		description: "Organizations actively recruiting",
		icon: <Building className="w-8 h-8" />,
	},
	{
		value: "1.2M+",
		label: "Job Opportunities",
		description: "Active positions across all sectors",
		icon: <Target className="w-8 h-8" />,
	},
	{
		value: "98%",
		label: "Success Rate",
		description: "Members finding suitable opportunities",
		icon: <Award className="w-8 h-8" />,
	},
	{
		value: "6",
		label: "Regional Hubs",
		description: "Strategic locations across Africa",
		icon: <TrendingUp className="w-8 h-8" />,
	},
];

export const coreValues: CoreValue[] = [
	{
		icon: <Users className="w-8 h-8" />,
		title: "Unity",
		description: "Bringing together diverse African communities under one unified platform for collective growth and development.",
		principles: [
			"Pan-African collaboration",
			"Cultural diversity celebration",
			"Inclusive community building",
			"Cross-border partnerships",
		],
	},
	{
		icon: <Award className="w-8 h-8" />,
		title: "Excellence",
		description: "Committed to delivering exceptional service and maintaining the highest standards in everything we do.",
		principles: ["Quality-first approach", "Continuous improvement", "Professional standards", "Service excellence"],
	},
	{
		icon: <Lightbulb className="w-8 h-8" />,
		title: "Innovation",
		description: "Embracing cutting-edge technologies and creative solutions to solve Africa's professional challenges.",
		principles: ["Technology advancement", "Creative problem-solving", "Future-ready solutions", "Digital transformation"],
	},
	{
		icon: <Shield className="w-8 h-8" />,
		title: "Integrity",
		description: "Operating with transparency, honesty, and ethical practices in all our interactions and partnerships.",
		principles: ["Transparent operations", "Ethical business practices", "Honest communication", "Trustworthy partnerships"],
	},
	{
		icon: <Heart className="w-8 h-8" />,
		title: "Empowerment",
		description: "Enabling individuals and communities to unlock their full potential and achieve sustainable success.",
		principles: ["Skill development", "Capacity building", "Economic empowerment", "Community upliftment"],
	},
	{
		icon: <TrendingUp className="w-8 h-8" />,
		title: "Growth",
		description: "Fostering continuous learning, development, and expansion opportunities for all members.",
		principles: ["Professional development", "Career advancement", "Network expansion", "Personal growth"],
	},
];

export const partnerships: Partnership[] = [
	{
		name: "IHRC",
		full: "International Human Rights Commission",
		description: "Ensuring fair labor practices and human rights protection across all JFAN operations.",
		region: "Africa Region HQ",
		focus: "Human Rights & Labor Standards",
	},
	{
		name: "PAOSMI",
		full: "Pan African Alliance of Small & Medium Industries",
		description: "Supporting SME development and entrepreneurship across the African continent.",
		region: "Continental Network",
		focus: "SME Development & Entrepreneurship",
	},
	{
		name: "AAS",
		full: "African Academy of Science",
		description: "Promoting scientific research, innovation, and evidence-based policy development.",
		region: "Research & Development",
		focus: "Scientific Research & Innovation",
	},
	{
		name: "GISDAAD",
		full: "Global Institute for Sustainable Development",
		description: "Advancing sustainable development goals through advanced analysis and design.",
		region: "Advanced Analysis & Design",
		focus: "Sustainable Development",
	},
];

export const teamMembers: TeamMember[] = [
	{
		id: "dir-north",
		name: "Dr. Amina Hassan",
		position: "Regional Director",
		region: "North Africa",
		bio: "Leading operations across North Africa with over 15 years of experience in international development and technology innovation.",
		email: "amina.hassan@jfan.africa",
	},
	{
		id: "dir-west",
		name: "Prof. Kwame Asante",
		position: "Regional Director",
		region: "West Africa",
		bio: "Driving fintech innovation and creative industries development across West Africa's 16 countries.",
		email: "kwame.asante@jfan.africa",
	},
	{
		id: "dir-east",
		name: "Dr. Grace Wanjiku",
		position: "Regional Director",
		region: "East Africa",
		bio: "Fostering entrepreneurship and agricultural innovation in East Africa's growing tech ecosystem.",
		email: "grace.wanjiku@jfan.africa",
	},
	{
		id: "dir-central",
		name: "Mr. Jean-Baptiste Moukoko",
		position: "Regional Director",
		region: "Central Africa",
		bio: "Promoting sustainable development and resource management across Central Africa's diverse economies.",
		email: "jean.moukoko@jfan.africa",
	},
	{
		id: "dir-south",
		name: "Ms. Nomsa Ndlovu",
		position: "Regional Director",
		region: "Southern Africa",
		bio: "Leading financial services and industrial development initiatives across Southern Africa's established markets.",
		email: "nomsa.ndlovu@jfan.africa",
	},
	{
		id: "dir-diaspora",
		name: "Dr. Chidi Okonkwo",
		position: "Global Diaspora Director",
		region: "Diaspora Network",
		bio: "Connecting African professionals worldwide and facilitating knowledge transfer and investment opportunities.",
		email: "chidi.okonkwo@jfan.africa",
	},
];

export const milestones: Milestone[] = [
	{
		year: "2020",
		title: "JFAN Foundation",
		description: "Established as a response to Africa's need for unified professional networking.",
		impact: "Initial 50,000 members across 10 countries",
	},
	{
		year: "2021",
		title: "Continental Expansion",
		description: "Extended operations to all 55 African countries with regional hub establishment.",
		impact: "Reached 2.5M members and 25,000 partner companies",
	},
	{
		year: "2022",
		title: "Strategic Partnerships",
		description: "Formed key alliances with IHRC, PAOSMI, AAS, and GISDAAD.",
		impact: "Enhanced credibility and expanded service offerings",
	},
	{
		year: "2023",
		title: "Technology Innovation",
		description: "Launched AI-powered job matching and skills assessment platform.",
		impact: "98% job matching success rate achieved",
	},
	{
		year: "2024",
		title: "Global Recognition",
		description: "Recognized as Africa's leading professional network by international bodies.",
		impact: "22M+ active members, 438K+ partner companies",
	},
];

export const initiatives: Initiative[] = [
	{
		title: "NTS Crowd-Donor Community Portal",
		description: "Revolutionary crowdfunding platform enabling individual and corporate donation accounts for professional development.",
		status: "active",
		impact: "$12M+ raised for skill development programs",
		partners: ["African Development Bank", "World Bank Group"],
	},
	{
		title: "Digital Skills Academy",
		description: "Comprehensive online training platform offering courses in emerging technologies and digital skills.",
		status: "active",
		impact: "500K+ professionals trained",
		partners: ["Microsoft", "Google", "IBM"],
	},
	{
		title: "Women in Tech Initiative",
		description: "Empowering African women in technology through mentorship, funding, and networking opportunities.",
		status: "active",
		impact: "75K+ women supported, 40% increase in tech participation",
	},
	{
		title: "Youth Entrepreneurship Program",
		description: "Supporting young African entrepreneurs with business development resources and funding access.",
		status: "active",
		impact: "25K+ young entrepreneurs supported, 15,000 businesses launched",
	},
	{
		title: "Green Jobs Initiative",
		description: "Promoting sustainable employment opportunities in renewable energy and environmental sectors.",
		status: "planned",
		impact: "Target: 100K green jobs by 2026",
	},
	{
		title: "Rural Development Program",
		description: "Extending JFAN services to rural communities through mobile technology and local partnerships.",
		status: "active",
		impact: "2M+ rural professionals connected",
	},
];
