"use client";
import React, { useState, useEffect } from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Briefcase, Building, TrendingUp, MapPin, Award, DollarSign, Target } from "lucide-react";

// Mock API service
const analyticsAPI = {
	getDashboardStats: async () => ({
		totalUsers: 15420,
		totalJobSeekers: 13890,
		totalEmployers: 1530,
		totalJobs: 2840,
		totalApplications: 45230,
		activeJobs: 2156,
		onboardedUsers: 12340,
		newUsersThisMonth: 1240,
		totalCompanies: 890,
		featuredJobs: 340,
		onboardingRate: 80.02,
		applicationRate: 15.93,
		jobToEmployerRatio: 1.86,
	}),

	getUsersByCountry: async () => [
		{ country: "Nigeria", countryCode: "NG", flag: "🇳🇬", userCount: 8420, jobSeekerCount: 7580, employerCount: 840 },
		{ country: "Kenya", countryCode: "KE", flag: "🇰🇪", userCount: 3240, jobSeekerCount: 2916, employerCount: 324 },
		{ country: "South Africa", countryCode: "ZA", flag: "🇿🇦", userCount: 2180, jobSeekerCount: 1962, employerCount: 218 },
		{ country: "Ghana", countryCode: "GH", flag: "🇬🇭", userCount: 920, jobSeekerCount: 828, employerCount: 92 },
		{ country: "Egypt", countryCode: "EG", flag: "🇪🇬", userCount: 660, jobSeekerCount: 594, employerCount: 66 },
	],

	getTopSkills: async () => [
		{ skillName: "JavaScript", category: "technical", userCount: 2340, avgProficiency: 2.4 },
		{ skillName: "Communication", category: "soft_skills", userCount: 1890, avgProficiency: 2.8 },
		{ skillName: "Python", category: "technical", userCount: 1650, avgProficiency: 2.6 },
		{ skillName: "Leadership", category: "soft_skills", userCount: 1420, avgProficiency: 3.1 },
		{ skillName: "English", category: "language", userCount: 1380, avgProficiency: 3.2 },
		{ skillName: "React", category: "technical", userCount: 1290, avgProficiency: 2.5 },
		{ skillName: "Microsoft Excel", category: "tools_software", userCount: 1240, avgProficiency: 2.9 },
		{ skillName: "Digital Marketing", category: "industry_specific", userCount: 1180, avgProficiency: 2.7 },
	],

	getRegistrationTrends: async () => [
		{ period: "2024-11-01", userCount: 45, jobSeekerCount: 38, employerCount: 7 },
		{ period: "2024-11-02", userCount: 62, jobSeekerCount: 54, employerCount: 8 },
		{ period: "2024-11-03", userCount: 58, jobSeekerCount: 51, employerCount: 7 },
		{ period: "2024-11-04", userCount: 73, jobSeekerCount: 65, employerCount: 8 },
		{ period: "2024-11-05", userCount: 69, jobSeekerCount: 62, employerCount: 7 },
		{ period: "2024-11-06", userCount: 81, jobSeekerCount: 71, employerCount: 10 },
		{ period: "2024-11-07", userCount: 76, jobSeekerCount: 68, employerCount: 8 },
	],

	getUsersByGender: async () => [
		{ gender: "male", userCount: 8920, jobSeekerCount: 8028, employerCount: 892 },
		{ gender: "female", userCount: 5680, jobSeekerCount: 5112, employerCount: 568 },
		{ gender: "other", userCount: 520, jobSeekerCount: 468, employerCount: 52 },
		{ gender: "prefer_not_to_say", userCount: 300, jobSeekerCount: 270, employerCount: 30 },
	],

	getUsersByExperience: async () => [
		{ experienceLevel: "entry_level", userCount: 4200, avgYearsExperience: 1.2, avgExpectedSalaryMax: 2800 },
		{ experienceLevel: "junior", userCount: 3800, avgYearsExperience: 2.1, avgExpectedSalaryMax: 3500 },
		{ experienceLevel: "mid_level", userCount: 3600, avgYearsExperience: 4.8, avgExpectedSalaryMax: 5200 },
		{ experienceLevel: "senior", userCount: 2400, avgYearsExperience: 8.3, avgExpectedSalaryMax: 7800 },
		{ experienceLevel: "lead", userCount: 1200, avgYearsExperience: 12.1, avgExpectedSalaryMax: 11500 },
		{ experienceLevel: "executive", userCount: 220, avgYearsExperience: 18.5, avgExpectedSalaryMax: 18200 },
	],

	getTopJobTitles: async () => [
		{ jobTitle: "Software Engineer", industry: "Technology", jobCount: 340, applicationCount: 5100, avgMaxSalary: 4200 },
		{ jobTitle: "Digital Marketing Manager", industry: "Marketing", jobCount: 210, applicationCount: 3150, avgMaxSalary: 3200 },
		{ jobTitle: "Sales Representative", industry: "Sales", jobCount: 180, applicationCount: 2700, avgMaxSalary: 2800 },
		{ jobTitle: "Data Analyst", industry: "Technology", jobCount: 150, applicationCount: 2250, avgMaxSalary: 3800 },
		{ jobTitle: "Project Manager", industry: "Management", jobCount: 140, applicationCount: 2100, avgMaxSalary: 4500 },
	],
};

// Color mapping for stats cards
const colorClasses = {
	blue: {
		background: "bg-blue-100",
		text: "text-blue-600",
	},
	green: {
		background: "bg-green-100",
		text: "text-green-600",
	},
	purple: {
		background: "bg-purple-100",
		text: "text-purple-600",
	},
	orange: {
		background: "bg-orange-100",
		text: "text-orange-600",
	},
};

// Stats Card Component - Fixed
const StatsCard = ({ title, value, change, icon: Icon, color = "blue" }) => {
	const colors = colorClasses[color] || colorClasses.blue;

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-gray-600">{title}</p>
						<p className="text-2xl font-bold">{value}</p>
						{change && (
							<p className={`text-sm ${change > 0 ? "text-green-600" : "text-red-600"}`}>
								{change > 0 ? "+" : ""}
								{change}% from last month
							</p>
						)}
					</div>
					<div className={`p-3 ${colors.background} rounded-full`}>
						<Icon className={`w-6 h-6 ${colors.text}`} />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

// Country Distribution Component
const CountryDistribution = ({ data }) => {
	const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<MapPin className="w-5 h-5" />
					User Distribution by Country
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<ResponsiveContainer width="100%" height={300}>
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								labelLine={false}
								label={({ country, percent }) => `${country}: ${(percent * 100).toFixed(0)}%`}
								outerRadius={80}
								fill="#8884d8"
								dataKey="userCount">
								{data.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>

					<div className="space-y-4">
						{data.map((country, index) => (
							<div
								key={country.countryCode}
								className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								<div className="flex items-center gap-3">
									<span className="text-2xl">{country.flag}</span>
									<div>
										<p className="font-medium">{country.country}</p>
										<p className="text-sm text-gray-600">
											{country.userCount.toLocaleString()} users
										</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm text-gray-600">
										Job Seekers: {country.jobSeekerCount.toLocaleString()}
									</p>
									<p className="text-sm text-gray-600">
										Employers: {country.employerCount.toLocaleString()}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

// Skills Analysis Component
const SkillsAnalysis = ({ data }) => {
	const [selectedCategory, setSelectedCategory] = useState("all");

	const categories = ["all", "technical", "soft_skills", "language", "tools_software", "industry_specific"];

	const filteredData = selectedCategory === "all" ? data : data.filter((skill) => skill.category === selectedCategory);

	const getCategoryColor = (category) => {
		const colors = {
			technical: "#3B82F6",
			soft_skills: "#10B981",
			language: "#F59E0B",
			tools_software: "#8B5CF6",
			industry_specific: "#EF4444",
		};
		return colors[category] || "#6B7280";
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2">
						<Award className="w-5 h-5" />
						Top Skills Analysis
					</CardTitle>
					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger className="w-48">
							<SelectValue placeholder="Select category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							<SelectItem value="technical">Technical</SelectItem>
							<SelectItem value="soft_skills">Soft Skills</SelectItem>
							<SelectItem value="language">Languages</SelectItem>
							<SelectItem value="tools_software">Tools & Software</SelectItem>
							<SelectItem value="industry_specific">Industry Specific</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={400}>
					<BarChart data={filteredData.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="skillName" angle={-45} textAnchor="end" height={100} fontSize={12} />
						<YAxis />
						<Tooltip
							formatter={(value, name) => [
								name === "userCount" ? `${value} users` : `${value}/4.0`,
								name === "userCount" ? "Users" : "Avg Proficiency",
							]}
						/>
						<Legend />
						<Bar dataKey="userCount" fill="#8884d8" name="Users" />
						<Bar dataKey="avgProficiency" fill="#82ca9d" name="Avg Proficiency" />
					</BarChart>
				</ResponsiveContainer>

				<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
					{filteredData.slice(0, 8).map((skill) => (
						<div key={skill.skillName} className="flex items-center justify-between p-3 border rounded-lg">
							<div className="flex items-center gap-3">
								<div
									className="w-3 h-3 rounded-full"
									style={{ backgroundColor: getCategoryColor(skill.category) }}
								/>
								<div>
									<p className="font-medium">{skill.skillName}</p>
									<Badge variant="outline" className="text-xs">
										{skill.category.replace("_", " ")}
									</Badge>
								</div>
							</div>
							<div className="text-right">
								<p className="font-medium">{skill.userCount.toLocaleString()}</p>
								<p className="text-sm text-gray-600">{skill.avgProficiency.toFixed(1)}/4.0 avg</p>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

// Registration Trends Component
const RegistrationTrends = ({ data }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<TrendingUp className="w-5 h-5" />
				Registration Trends (Last 7 Days)
			</CardTitle>
		</CardHeader>
		<CardContent>
			<ResponsiveContainer width="100%" height={300}>
				<AreaChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis
						dataKey="period"
						tickFormatter={(value) =>
							new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
						}
					/>
					<YAxis />
					<Tooltip
						labelFormatter={(value) =>
							new Date(value).toLocaleDateString("en-US", {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})
						}
					/>
					<Legend />
					<Area
						type="monotone"
						dataKey="jobSeekerCount"
						stackId="1"
						stroke="#8884d8"
						fill="#8884d8"
						name="Job Seekers"
					/>
					<Area type="monotone" dataKey="employerCount" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Employers" />
				</AreaChart>
			</ResponsiveContainer>
		</CardContent>
	</Card>
);

// Experience Level Distribution
const ExperienceDistribution = ({ data }) => (
	<Card>
		<CardHeader>
			<CardTitle>Experience Level Distribution</CardTitle>
		</CardHeader>
		<CardContent>
			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="experienceLevel" tickFormatter={(value) => value.replace("_", " ")} />
					<YAxis />
					<Tooltip
						formatter={(value, name) => [
							name === "userCount"
								? `${value} users`
								: name === "avgYearsExperience"
								? `${value} years`
								: `$${value.toLocaleString()}`,
							name === "userCount"
								? "Users"
								: name === "avgYearsExperience"
								? "Avg Experience"
								: "Expected Salary",
						]}
					/>
					<Legend />
					<Bar dataKey="userCount" fill="#8884d8" name="Users" />
					<Bar dataKey="avgExpectedSalaryMax" fill="#82ca9d" name="Expected Salary" />
				</BarChart>
			</ResponsiveContainer>
		</CardContent>
	</Card>
);

// Top Job Titles Component
const TopJobTitles = ({ data }) => (
	<Card>
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<Briefcase className="w-5 h-5" />
				Most In-Demand Job Titles
			</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-4">
				{data.map((job, index) => (
					<div key={job.jobTitle} className="flex items-center justify-between p-4 border rounded-lg">
						<div className="flex items-center gap-4">
							<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
								<span className="text-sm font-bold text-blue-600">#{index + 1}</span>
							</div>
							<div>
								<p className="font-medium">{job.jobTitle}</p>
								<p className="text-sm text-gray-600">{job.industry}</p>
							</div>
						</div>
						<div className="text-right">
							<p className="font-medium">{job.jobCount} jobs</p>
							<p className="text-sm text-gray-600">{job.applicationCount.toLocaleString()} applications</p>
							<p className="text-sm text-green-600">${job.avgMaxSalary.toLocaleString()} avg salary</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

// Main Dashboard Component
const AdminDashboard = () => {
	const [dashboardStats, setDashboardStats] = useState(null);
	const [countryData, setCountryData] = useState([]);
	const [skillsData, setSkillsData] = useState([]);
	const [trendsData, setTrendsData] = useState([]);
	const [genderData, setGenderData] = useState([]);
	const [experienceData, setExperienceData] = useState([]);
	const [jobTitlesData, setJobTitlesData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [stats, countries, skills, trends, gender, experience, jobTitles] = await Promise.all([
					analyticsAPI.getDashboardStats(),
					analyticsAPI.getUsersByCountry(),
					analyticsAPI.getTopSkills(),
					analyticsAPI.getRegistrationTrends(),
					analyticsAPI.getUsersByGender(),
					analyticsAPI.getUsersByExperience(),
					analyticsAPI.getTopJobTitles(),
				]);

				setDashboardStats(stats);
				setCountryData(countries);
				setSkillsData(skills);
				setTrendsData(trends);
				setGenderData(gender);
				setExperienceData(experience);
				setJobTitlesData(jobTitles);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching dashboard data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<div className="text-center">
					<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
					<p className="mt-4 text-gray-600">Loading dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 bg-gray-50 min-h-screen">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
				<p className="text-gray-600">Overview of your job platform analytics</p>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
				<StatsCard
					title="Total Users"
					value={dashboardStats?.totalUsers?.toLocaleString()}
					change={8.1}
					icon={Users}
					color="blue"
				/>
				<StatsCard
					title="Active Jobs"
					value={dashboardStats?.activeJobs?.toLocaleString()}
					change={12.3}
					icon={Briefcase}
					color="green"
				/>
				<StatsCard
					title="Total Applications"
					value={dashboardStats?.totalApplications?.toLocaleString()}
					change={15.2}
					icon={Target}
					color="purple"
				/>
				<StatsCard
					title="Companies"
					value={dashboardStats?.totalCompanies?.toLocaleString()}
					change={5.7}
					icon={Building}
					color="orange"
				/>
			</div>

			{/* Key Metrics */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card>
					<CardContent className="p-6">
						<div className="text-center">
							<p className="text-3xl font-bold text-green-600">
								{dashboardStats?.onboardingRate?.toFixed(1)}%
							</p>
							<p className="text-gray-600">Onboarding Rate</p>
							<p className="text-sm text-gray-500 mt-2">
								{dashboardStats?.onboardedUsers?.toLocaleString()} of{" "}
								{dashboardStats?.totalUsers?.toLocaleString()} users completed onboarding
							</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="text-center">
							<p className="text-3xl font-bold text-blue-600">
								{dashboardStats?.applicationRate?.toFixed(1)}
							</p>
							<p className="text-gray-600">Applications per Job</p>
							<p className="text-sm text-gray-500 mt-2">Average application rate across all jobs</p>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardContent className="p-6">
						<div className="text-center">
							<p className="text-3xl font-bold text-purple-600">
								{dashboardStats?.jobToEmployerRatio?.toFixed(1)}
							</p>
							<p className="text-gray-600">Jobs per Employer</p>
							<p className="text-sm text-gray-500 mt-2">Average number of jobs posted per employer</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Charts Grid */}
			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
				<CountryDistribution data={countryData} />
				<RegistrationTrends data={trendsData} />
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
				<ExperienceDistribution data={experienceData} />
				<TopJobTitles data={jobTitlesData} />
			</div>

			<div className="mb-8">
				<SkillsAnalysis data={skillsData} />
			</div>

			{/* Gender Distribution */}
			<Card className="mb-8">
				<CardHeader>
					<CardTitle>Gender Distribution</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
						{genderData.map((item) => (
							<div key={item.gender} className="text-center p-4 bg-gray-50 rounded-lg">
								<p className="text-2xl font-bold">{item.userCount.toLocaleString()}</p>
								<p className="text-gray-600 capitalize">{item.gender.replace("_", " ")}</p>
								<p className="text-sm text-gray-500">
									{(
										(item.userCount /
											genderData.reduce((sum, g) => sum + g.userCount, 0)) *
										100
									).toFixed(1)}
									%
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default AdminDashboard;
