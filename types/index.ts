// types/index.ts
export interface Economy {
	id: number;
	name: string;
}

export interface Industry {
	id: number;
	economyId: number;
	name: string;
}

export interface Sector {
	id: number;
	industryId: number;
	name: string;
}

export interface Job {
	id: number;
	sectorId: number;
	name: string;
}

export interface JobCatalog {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

export interface Region {
	name: string;
	country: string;
	color: string;
}

export interface Community {
	name: string;
	icon: string;
	description: string;
}

export interface RegionDetails {
	countries: string[];
	stats: {
		members: string;
		companies: string;
		jobs: string;
	};
	languages: string[];
	industries: string[];
	description: string;
}

export interface HeroSlide {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	cta: string;
}

export interface FeaturedJob {
	title: string;
	company: string;
	location: string;
	type: string;
	salary: string;
	posted: string;
	skills: string[];
}

export interface ContactInfo {
	icon: React.ReactNode;
	title: string;
	details: string[];
	description: string;
}

export interface FooterSection {
	title: string;
	links: FooterLink[];
}

export interface FooterLink {
	name: string;
	href: string;
}

export interface RegistrationType {
	id: string;
	title: string;
	desc: string;
	icon: React.ReactNode;
	features: string[];
}

export interface Value {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export interface Partnership {
	name: string;
	full: string;
	description: string;
}

export interface NavItem {
	name: string;
	href: string;
}

export interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	type: string;
}

// types/index.ts
export interface Economy {
	id: number;
	name: string;
}

export interface Industry {
	id: number;
	economyId: number;
	name: string;
}

export interface Sector {
	id: number;
	industryId: number;
	name: string;
}

export interface Job {
	id: number;
	sectorId: number;
	name: string;
}

export interface JobCatalog {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

export interface Region {
	name: string;
	country: string;
	color: string;
}

export interface Community {
	name: string;
	icon: string;
	description: string;
}

export interface RegionDetails {
	countries: string[];
	stats: {
		members: string;
		companies: string;
		jobs: string;
	};
	languages: string[];
	industries: string[];
	description: string;
}

export interface HeroSlide {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	cta: string;
}

export interface FeaturedJob {
	title: string;
	company: string;
	location: string;
	type: string;
	salary: string;
	posted: string;
	skills: string[];
}

export interface ContactInfo {
	icon: React.ReactNode;
	title: string;
	details: string[];
	description: string;
}

export interface FooterSection {
	title: string;
	links: FooterLink[];
}

export interface FooterLink {
	name: string;
	href: string;
}

export interface RegistrationType {
	id: string;
	title: string;
	desc: string;
	icon: React.ReactNode;
	features: string[];
}

export interface Value {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export interface Partnership {
	name: string;
	full: string;
	description: string;
	region?: string;
	focus?: string;
}

export interface NavItem {
	name: string;
	href: string;
}

export interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	type: string;
}

// About page specific types
export interface Statistic {
	value: string;
	label: string;
	description: string;
	icon: React.ReactNode;
}

export interface TeamMember {
	id: string;
	name: string;
	position: string;
	region: string;
	bio: string;
	image?: string;
	linkedin?: string;
	email?: string;
}

export interface Milestone {
	year: string;
	title: string;
	description: string;
	impact?: string;
}

export interface CoreValue {
	icon: React.ReactNode;
	title: string;
	description: string;
	principles: string[];
}

export interface Initiative {
	title: string;
	description: string;
	status: "active" | "completed" | "planned";
	impact?: string;
	partners?: string[];
}

// types/index.ts
export interface Economy {
	id: number;
	name: string;
}

export interface Industry {
	id: number;
	economyId: number;
	name: string;
}

export interface Sector {
	id: number;
	industryId: number;
	name: string;
}

export interface Job {
	id: number;
	sectorId: number;
	name: string;
}

export interface JobCatalog {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

export interface Region {
	name: string;
	country: string;
	color: string;
}

export interface Community {
	name: string;
	icon: string;
	description: string;
}

export interface RegionDetails {
	countries: string[];
	stats: {
		members: string;
		companies: string;
		jobs: string;
	};
	languages: string[];
	industries: string[];
	description: string;
}

export interface HeroSlide {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	cta: string;
}

export interface FeaturedJob {
	title: string;
	company: string;
	location: string;
	type: string;
	salary: string;
	posted: string;
	skills: string[];
}

export interface ContactInfo {
	icon: React.ReactNode;
	title: string;
	details: string[];
	description: string;
}

export interface FooterSection {
	title: string;
	links: FooterLink[];
}

export interface FooterLink {
	name: string;
	href: string;
}

export interface RegistrationType {
	id: string;
	title: string;
	desc: string;
	icon: React.ReactNode;
	features: string[];
}

export interface Value {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export interface Partnership {
	name: string;
	full: string;
	description: string;
	region?: string;
	focus?: string;
}

export interface NavItem {
	name: string;
	href: string;
}

export interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	type: string;
}

// About page specific types
export interface Statistic {
	value: string;
	label: string;
	description: string;
	icon: React.ReactNode;
}

export interface TeamMember {
	id: string;
	name: string;
	position: string;
	region: string;
	bio: string;
	image?: string;
	linkedin?: string;
	email?: string;
}

export interface Milestone {
	year: string;
	title: string;
	description: string;
	impact?: string;
}

export interface CoreValue {
	icon: React.ReactNode;
	title: string;
	description: string;
	principles: string[];
}

export interface Initiative {
	title: string;
	description: string;
	status: "active" | "completed" | "planned";
	impact?: string;
	partners?: string[];
}

// Regions page specific types
export interface RegionalOffice {
	city: string;
	address: string;
	phone: string;
	email: string;
	coordinates?: {
		lat: number;
		lng: number;
	};
}

export interface RegionalDirector {
	id: string;
	name: string;
	position: string;
	bio: string;
	experience: string;
	education: string;
	achievements: string[];
	email: string;
	linkedin?: string;
	image?: string;
}

export interface RegionalProgram {
	id: string;
	title: string;
	description: string;
	focus: string[];
	status: "active" | "planned" | "completed";
	budget?: string;
	beneficiaries?: string;
	partners?: string[];
	startDate: string;
	endDate?: string;
}

export interface SuccessStory {
	id: string;
	name: string;
	profession: string;
	country: string;
	story: string;
	achievement: string;
	year: string;
	image?: string;
}

export interface RegionalData {
	name: string;
	slug: string;
	headquarters: string;
	color: string;
	establishedYear: string;
	description: string;
	countries: string[];
	population: string;
	gdp: string;
	languages: string[];
	currencies: string[];
	timeZones: string[];
	keyIndustries: string[];
	stats: {
		members: string;
		companies: string;
		jobs: string;
		universities: string;
		startups: string;
		partnerships: string;
	};
	office: RegionalOffice;
	director: RegionalDirector;
	programs: RegionalProgram[];
	successStories: SuccessStory[];
	opportunities: {
		trending: string[];
		emerging: string[];
		highDemand: string[];
	};
	challenges: string[];
	initiatives: string[];
	futureGoals: string[];
}

export interface Economy {
	id: number;
	name: string;
}

export interface Industry {
	id: number;
	economyId: number;
	name: string;
}

export interface Sector {
	id: number;
	industryId: number;
	name: string;
}

export interface Job {
	id: number;
	sectorId: number;
	name: string;
}

export interface JobCatalog {
	economies: Economy[];
	industries: Industry[];
	sectors: Sector[];
	jobs: Job[];
}

export interface Region {
	name: string;
	country: string;
	color: string;
}

export interface Community {
	name: string;
	icon: string;
	description: string;
}

export interface RegionDetails {
	countries: string[];
	stats: {
		members: string;
		companies: string;
		jobs: string;
	};
	languages: string[];
	industries: string[];
	description: string;
}

export interface HeroSlide {
	title: string;
	subtitle: string;
	description: string;
	image: string;
	cta: string;
}

export interface FeaturedJob {
	title: string;
	company: string;
	location: string;
	type: string;
	salary: string;
	posted: string;
	skills: string[];
}

export interface ContactInfo {
	icon: React.ReactNode;
	title: string;
	details: string[];
	description: string;
}

export interface FooterSection {
	title: string;
	links: FooterLink[];
}

export interface FooterLink {
	name: string;
	href: string;
}

export interface RegistrationType {
	id: string;
	title: string;
	desc: string;
	icon: React.ReactNode;
	features: string[];
}

export interface Value {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export interface Partnership {
	name: string;
	full: string;
	description: string;
	region?: string;
	focus?: string;
}

export interface NavItem {
	name: string;
	href: string;
}

export interface FormData {
	name: string;
	email: string;
	subject: string;
	message: string;
	type: string;
}

// About page specific types
export interface Statistic {
	value: string;
	label: string;
	description: string;
	icon: React.ReactNode;
}

export interface TeamMember {
	id: string;
	name: string;
	position: string;
	region: string;
	bio: string;
	image?: string;
	linkedin?: string;
	email?: string;
}

export interface Milestone {
	year: string;
	title: string;
	description: string;
	impact?: string;
}

export interface CoreValue {
	icon: React.ReactNode;
	title: string;
	description: string;
	principles: string[];
}

export interface Initiative {
	title: string;
	description: string;
	status: "active" | "completed" | "planned";
	impact?: string;
	partners?: string[];
}

// Regions page specific types
export interface RegionalOffice {
	city: string;
	address: string;
	phone: string;
	email: string;
	coordinates?: {
		lat: number;
		lng: number;
	};
}

export interface RegionalDirector {
	id: string;
	name: string;
	position: string;
	bio: string;
	experience: string;
	education: string;
	achievements: string[];
	email: string;
	linkedin?: string;
	image?: string;
}

export interface RegionalProgram {
	id: string;
	title: string;
	description: string;
	focus: string[];
	status: "active" | "planned" | "completed";
	budget?: string;
	beneficiaries?: string;
	partners?: string[];
	startDate: string;
	endDate?: string;
}

export interface SuccessStory {
	id: string;
	name: string;
	profession: string;
	country: string;
	story: string;
	achievement: string;
	year: string;
	image?: string;
}

export interface RegionalData {
	name: string;
	slug: string;
	headquarters: string;
	color: string;
	establishedYear: string;
	description: string;
	countries: string[];
	population: string;
	gdp: string;
	languages: string[];
	currencies: string[];
	timeZones: string[];
	keyIndustries: string[];
	stats: {
		members: string;
		companies: string;
		jobs: string;
		universities: string;
		startups: string;
		partnerships: string;
	};
	office: RegionalOffice;
	director: RegionalDirector;
	programs: RegionalProgram[];
	successStories: SuccessStory[];
	opportunities: {
		trending: string[];
		emerging: string[];
		highDemand: string[];
	};
	challenges: string[];
	initiatives: string[];
	futureGoals: string[];
}

// Communities page specific types
export interface CommunityData {
	id: string;
	name: string;
	slug: string;
	icon: string;
	tagline: string;
	description: string;
	color: string;
	established: string;
	stats: {
		members: string;
		professionals: string;
		companies: string;
		jobs: string;
		events: string;
		projects: string;
	};
	keyAreas: string[];
	benefits: string[];
	requirements: string[];
	events: CommunityEvent[];
	leaders: CommunityLeader[];
	resources: CommunityResource[];
	successStories: CommunitySuccessStory[];
	partnerships: string[];
	initiatives: CommunityInitiative[];
	futureGoals: string[];
}

export interface CommunityEvent {
	id: string;
	title: string;
	type: "webinar" | "workshop" | "networking" | "conference" | "hackathon";
	date: string;
	time: string;
	duration: string;
	location: "virtual" | "physical" | "hybrid";
	description: string;
	speakers?: string[];
	capacity?: number;
	registered?: number;
	status: "upcoming" | "ongoing" | "completed";
}

export interface CommunityLeader {
	id: string;
	name: string;
	position: string;
	company: string;
	expertise: string[];
	bio: string;
	achievements: string[];
	socialLinks?: {
		linkedin?: string;
		twitter?: string;
		website?: string;
	};
}

export interface CommunityResource {
	id: string;
	title: string;
	type: "guide" | "template" | "tool" | "course" | "ebook" | "video";
	description: string;
	category: string;
	difficulty: "beginner" | "intermediate" | "advanced";
	downloadCount?: number;
	rating?: number;
	url?: string;
}

export interface CommunitySuccessStory {
	id: string;
	memberName: string;
	profession: string;
	company: string;
	story: string;
	achievement: string;
	beforeAfter: {
		before: string;
		after: string;
	};
	year: string;
	image?: string;
}

export interface CommunityInitiative {
	id: string;
	title: string;
	description: string;
	status: "active" | "planned" | "completed";
	impact?: string;
	participants?: string;
	startDate: string;
	endDate?: string;
}
