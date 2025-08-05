"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
	Search,
	Filter,
	ChevronRight,
	ChevronDown,
	Briefcase,
	Users,
	Building,
	TrendingUp,
	Star,
	Eye,
	BookOpen,
	Video,
	FileText,
	ToolCase,
	Award,
	Zap,
	ArrowRight,
	Globe,
	BarChart3,
	Target,
	Menu,
	X,
	Layers,
	Grid,
	List,
} from "lucide-react";
import AnimatedSection from "../ui/AnimatedSection";
import Button from "../ui/NewButton";
import { Economy, Industry } from "@/types";
import Card from "../ui/NewCard";
import LayoutWrapper from "../layouts/LayoutWrapper";

// Job Catalog Data (from your provided structure)
const jobCatalog = {
	economies: [
		{ id: 1, name: "Creative Economy" },
		{ id: 2, name: "Athletic Economy" },
		{ id: 3, name: "Entreprenuerial Economy" },
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
		{ id: 111, economyId: 3, name: "MANUFACTURING ENTREPRENEURS" },
		{ id: 112, economyId: 3, name: "Logistical ENTREPRENEURS" },
	],
	sectors: [
		//Atst Id 101
		{ id: 1001, industryId: 101, name: "Performing Arts Sector" },
		{ id: 1002, industryId: 101, name: "VISUAL ARTS SECTOR" },
		{ id: 1003, industryId: 101, name: "PHILOSOPHICAL ARTS" },
		{ id: 1004, industryId: 101, name: "AUDITORY ARTS SECTOR" },

		//science and Technology Id 102
		{ id: 1007, industryId: 102, name: "Computer-based Works Sector" },
		{ id: 1008, industryId: 102, name: "Electrical Works Sector" },
		{ id: 1009, industryId: 102, name: "Electronic Works Sector" },
		{ id: 1010, industryId: 102, name: "3I  Sector: IMMIGRATION, INNOVATION & INVENTIVE SCIENCES SECTOR" },

		//Artisanal Industry Id 104
		{ id: 1011, industryId: 103, name: "CIVIL CONSTRUCTS Sector" },
		{ id: 1012, industryId: 103, name: "MACHANICAL WORKS Sector" },
		{ id: 1014, industryId: 103, name: "METAL WORKS Sector" },
		{ id: 1015, industryId: 103, name: "Capentry & Joinery Sector" },

		//Vocational Industry Id 104
		{ id: 1016, industryId: 104, name: " COSMETICS SECTOR" },
		{ id: 1017, industryId: 104, name: " PERSONAL GROOMING SECTOR" },
		{ id: 1018, industryId: 104, name: " GENERAL VOCATIONAL SECTOR" },

		//Big Arena Sports Industry Id 105
		{ id: 1019, industryId: 105, name: "BIG ARENA SPORTS SECTOR" },

		//Mental Sports Industry Id 106
		{ id: 1020, industryId: 106, name: "TARGET SPORTS SECTOR" },
		{ id: 1021, industryId: 106, name: "TABLE TOP SPORTS SECTOR" },

		//Track and Field Sport Industry Id 107
		{ id: 1022, industryId: 107, name: "TRACK RACES SECTOR" },
		{ id: 1023, industryId: 107, name: "THROW SPORTS SECTOR" },
		{ id: 1024, industryId: 107, name: "JUMP SPORTS SECTOR" },
		{ id: 1025, industryId: 107, name: "COMBAT SPORTS SECTOR" },
		{ id: 1026, industryId: 107, name: "WATER SPORTS  SECTOR" },
		{ id: 1027, industryId: 107, name: "MOTOR SPROTS SECTOR" },

		//Animal Sports Industry Id 108
		{ id: 1028, industryId: 108, name: "HORSEBACK SPORTS SECTOR" },

		//Agricultural Entrepreneurs Id 109
		{ id: 1029, industryId: 109, name: "CULTIVATION SECTOR" },
		{ id: 1030, industryId: 109, name: "STORAGE SECTOR" },
		{ id: 1031, industryId: 109, name: "PROCESSING SECTOR" },
		{ id: 1032, industryId: 109, name: "AGRO - LOGISTICS SECTOR" },

		//Tourism & Hospitality Sector Id 110
		{ id: 1033, industryId: 110, name: "VENUES SECTOR" },
		{ id: 1034, industryId: 110, name: "RECREATION SECTOR" },
		{ id: 1035, industryId: 110, name: "FOOD & BEVERAGE SECTOR" },
		{ id: 1036, industryId: 110, name: "TOUR MANAGEMENT SECTOR" },
		{ id: 1037, industryId: 110, name: "STOP-OVER MANAGEMENT SECTOR" },

		//Manufacturing Sector Id 111
		{ id: 1038, industryId: 111, name: "ELECTRICAL / ELECTRONICS SECTOR" },
		{ id: 1039, industryId: 111, name: "MACHANICAL & METALLURGICAL SECTOR" },
		{ id: 1040, industryId: 111, name: "BIO-CHEMICAL MANUFACTURING  SECTOR" },
		{ id: 1041, industryId: 111, name: "CIVIL CONSTRUCTION SECTOR" },

		//Logisticts Sector Id 112
		{ id: 1042, industryId: 112, name: "ADVERTS & ORDER MANAGEMENT SECTOR" },
		{ id: 1043, industryId: 112, name: "ADVERTHOLDING & WHOLESALES SECTOR" },
		{ id: 1044, industryId: 112, name: "RETAIL CHAINS SECTOR" },
		{ id: 1045, industryId: 112, name: "LOGISTICS & DELIVERY SECTOR" },
	],

	jobs: [
		//Performing Art Sector Id 1001
		{ id: 10001, sectorId: 1001, name: "SINGERS" },
		{ id: 10002, sectorId: 1001, name: "INSTRUMENTALISTS" },
		{ id: 10003, sectorId: 1001, name: "ACTORS/COMEDIANS" },
		{ id: 10004, sectorId: 1001, name: "ARTISTES (SOCIAL MEDIA)" },
		{ id: 10005, sectorId: 1001, name: "VOICE-OVER ARTISTE (OAPs)" },
		{ id: 10006, sectorId: 1001, name: "MODELS (FACE)" },
		{ id: 10007, sectorId: 1001, name: "DISC JOCKEYS (DJs)" },

		//Visual Arts Id 1002
		{ id: 10008, sectorId: 1002, name: "PAINTERS" },
		{ id: 10009, sectorId: 1002, name: "SCULPTERS" },
		{ id: 10010, sectorId: 1002, name: "PRINTSMAKERS" },
		{ id: 10011, sectorId: 1002, name: "PHOTOGRAPHERS" },
		{ id: 10012, sectorId: 1002, name: "CAMERAMEN" },
		{ id: 10013, sectorId: 1002, name: "MAKE-UP ARTISTES" },
		{ id: 10014, sectorId: 1002, name: "LIVE-EVENT ARTISTES" },

		//Philosophical Arts sector Id 1003
		{ id: 10015, sectorId: 1003, name: "PAINTERS" },
		{ id: 10016, sectorId: 1003, name: "SCULPTERS" },
		{ id: 10017, sectorId: 1003, name: "PRINTSMAKERS" },
		{ id: 10018, sectorId: 1003, name: "PHOTOGRAPHERS" },
		{ id: 10019, sectorId: 1003, name: "CAMERAMEN" },
		{ id: 10020, sectorId: 1003, name: "MAKE-UP ARTISTES" },
		{ id: 10021, sectorId: 1003, name: "LIVE-EVENT ARTISTES" },

		//AUDITORY ARTS SECTOR Id 1004
		{ id: 10022, sectorId: 1004, name: "SOUND EFX ENGINEERS" },
		{ id: 10023, sectorId: 1004, name: "SOUND BITE CREATORS" },
		{ id: 10024, sectorId: 1004, name: "DISCOGRAPHERS" },
		{ id: 10025, sectorId: 1004, name: "SOUND MIXING ENGINEERS" },
		{ id: 10026, sectorId: 1004, name: "SOUND DIRECTORS (LIVE)" },
		{ id: 10027, sectorId: 1004, name: "SOUND RE-ENFORCERS" },

		//Computer Based Works sector Id 1007

		{ id: 10028, sectorId: 1007, name: "COMPUTER PROGRAMMERS" },
		{ id: 10029, sectorId: 1007, name: "COMPUTER NETWORKERS" },
		{ id: 10030, sectorId: 1007, name: "WEBSITE & APP DEVELOPERS" },
		{ id: 10031, sectorId: 1007, name: "DATABASE ENGR / MNGRS" },
		{ id: 10032, sectorId: 1007, name: "VIDEO EDITORS" },
		{ id: 10033, sectorId: 1007, name: "GRAPHIC DESIGNERS" },
		{ id: 10034, sectorId: 1007, name: "COMPUTER ANIMATORS" },
		{ id: 10035, sectorId: 1007, name: "CMPTR SYSTEMS INSTALLERS" },
		{ id: 10036, sectorId: 1007, name: "CMPTER SYSTEMS MODELLERS" },

		// Electrical Works Sector Id 1008
		{ id: 10037, sectorId: 1008, name: "CIRCUIT DESIGNERS" },
		{ id: 10038, sectorId: 1008, name: "CIRCUIT MAINTENANCE" },
		{ id: 10039, sectorId: 1008, name: "ELECTRICAL INSTALLERS" },
		{ id: 10040, sectorId: 1008, name: "LINE INSPECTORS" },
		{ id: 10041, sectorId: 1008, name: "ELECTRICAL ENGINEERS" },
		{ id: 10042, sectorId: 1008, name: "ELECTRICAL RIG WORKERS" },
		{ id: 10043, sectorId: 1008, name: "MARINE ELECTRICIANS" },

		// Electronic Works Sector Id 1009
		{ id: 10044, sectorId: 1009, name: "e-CIRCUITRY ENGINEERS" },
		{ id: 10045, sectorId: 1009, name: "e-CIRCUIT ARTISANS" },
		{ id: 10046, sectorId: 1009, name: "RADIO-GRAPHERS" },
		{ id: 10047, sectorId: 1009, name: "TELEVISION ENGINEERS" },
		{ id: 10048, sectorId: 1009, name: "SIGNAL ENGINEERS" },
		{ id: 10049, sectorId: 1009, name: "e-WAVE ENGINEERS" },
		{ id: 10050, sectorId: 1009, name: "NANO TECH ENGRS" },

		// 3I Sector (Immigration, Innovation & Inventive Sciences) Id 1010
		{ id: 10051, sectorId: 1010, name: "MECHANICAL WORKS" },
		{ id: 10052, sectorId: 1010, name: "ELECTRICAL WORKS" },
		{ id: 10053, sectorId: 1010, name: "ELECTRONIC WORKS" },
		{ id: 10054, sectorId: 1010, name: "BIOLOGICAL WORKS" },
		{ id: 10055, sectorId: 1010, name: "CHEMICAL WORKS" },
		{ id: 10056, sectorId: 1010, name: "AVIONICS" },
		{ id: 10057, sectorId: 1010, name: "METALLURGICAL WORKS" },
		{ id: 10058, sectorId: 1010, name: "RECYCLERS" },
		{ id: 10059, sectorId: 1010, name: "MIXED ELEMENTS" },

		// Civil Constructs Sector Id 1011
		{ id: 10060, sectorId: 1011, name: "ARCHITECTS" },
		{ id: 10061, sectorId: 1011, name: "PLAN MAKERS" },
		{ id: 10062, sectorId: 1011, name: "PROJECT EVALUERS" },
		{ id: 10063, sectorId: 1011, name: "LOCATION SURVEYORS" },
		{ id: 10064, sectorId: 1011, name: "MASONS / BUILDERS" },
		{ id: 10065, sectorId: 1011, name: "CAST MAKERS / LAYERS" },
		{ id: 10066, sectorId: 1011, name: "MACHINE OPERATORS" },
		{ id: 10067, sectorId: 1011, name: "SITE HANDS" },
		{ id: 10068, sectorId: 1011, name: "BUILDING ENGINEERS" },

		// Mechanical Works Sector Id 1012
		{ id: 10069, sectorId: 1012, name: "TOYS" },
		{ id: 10070, sectorId: 1012, name: "MECHANICAL DEVICES" },
		{ id: 10071, sectorId: 1012, name: "HYDROLOGICAL WORKS" },
		{ id: 10072, sectorId: 1012, name: "AERIAL DEVICES/WRKS" },
		{ id: 10073, sectorId: 1012, name: "MIXED TYPE DEVICES" },

		// Metal Works Sector Id 1014
		{ id: 10074, sectorId: 1014, name: "METAL WORKS DESIGNERS" },
		{ id: 10075, sectorId: 1014, name: "WELDERS (SURFACE)" },
		{ id: 10076, sectorId: 1014, name: "WELDERS (UNDER-WATER)" },
		{ id: 10077, sectorId: 1014, name: "LAPIDARY WORKS" },
		{ id: 10078, sectorId: 1014, name: "UTENSILS & TOOLS" },
		{ id: 10079, sectorId: 1014, name: "SECURITY & ROAD FURNITURE" },
		{ id: 10080, sectorId: 1014, name: "METAL FURNITURE DOMESTIC" },
		{ id: 10081, sectorId: 1014, name: "METAL FURNITURE INDUSTRIAL" },

		// Carpentry & Joinery Sector Id 1015
		{ id: 10082, sectorId: 1015, name: "DOMESTIC FURNITURE" },
		{ id: 10083, sectorId: 1015, name: "HOSPITAL FURNITURE" },
		{ id: 10084, sectorId: 1015, name: "INDUSTRIAL FURNITURE" }, // Fixed spelling from "INDUASTRIAL"
		{ id: 10085, sectorId: 1015, name: "TECHNICAL WOOD TOOLS" },
		{ id: 10086, sectorId: 1015, name: "UPHOLSTERY" },
		{ id: 10087, sectorId: 1015, name: "ROOF WORKERS" },
		{ id: 10088, sectorId: 1015, name: "PUBLIC FURNITURE" },

		// Cosmetics Sector Id 1016
		{ id: 10089, sectorId: 1016, name: "FACIAL PROD MAKERS" },
		{ id: 10090, sectorId: 1016, name: "BODY PROD MAKERS" },
		{ id: 10091, sectorId: 1016, name: "PEDICURE/MANICURISTS" }, // Fixed "PEDUCURE" to standard "PEDICURE"
		{ id: 10092, sectorId: 1016, name: "HAIR TECHNICIANS" },
		{ id: 10093, sectorId: 1016, name: "JEWELLERS" },
		{ id: 10094, sectorId: 1016, name: "COSTUME PRODUCERS" },
		{ id: 10095, sectorId: 1016, name: "VISUAL EFX DESIGNERS" },
		// Personal Grooming Sector Id 1017
		{ id: 10096, sectorId: 1017, name: "BARBERS" },
		{ id: 10097, sectorId: 1017, name: "BODY-BUILDERS" },
		{ id: 10098, sectorId: 1017, name: "HAIRDRESSERS/STYLISTS" },
		{ id: 10099, sectorId: 1017, name: "PERSONAL MAKE-UP" },
		{ id: 10100, sectorId: 1017, name: "STYLE COACHES" },
		{ id: 10101, sectorId: 1017, name: "DRESS DESIGNERS" },
		{ id: 10102, sectorId: 1017, name: "TAILORS" },
		{ id: 10103, sectorId: 1017, name: "SPA-WORKERS" },

		// General Vocational Sector Id 1018
		{ id: 10104, sectorId: 1018, name: "INTERIOR DECORATORS" },
		{ id: 10105, sectorId: 1018, name: "EXTERIOR DECORATORS" },
		{ id: 10106, sectorId: 1018, name: "EVENT PLANNERS" },
		{ id: 10107, sectorId: 1018, name: "PERSONAL SECURITY (BGs)" }, // Note: "PERSONAL" typo preserved
		{ id: 10108, sectorId: 1018, name: "DRIVERS/CHAUFFEURS" }, // Consolidated spacing
		{ id: 10109, sectorId: 1018, name: "LAPIDARY (NON-METAL)" },
		{ id: 10110, sectorId: 1018, name: "DOM CONSUMABLES" },
		{ id: 10111, sectorId: 1018, name: "INDUSTRIAL CONSUMABLES" },
		{ id: 10112, sectorId: 1018, name: "PUBLIC AESTHETICIANS" }, // Note: "AESTHETICIANS" spelling preserved

		// Big Arena Sports Sector Id 1019
		{ id: 10113, sectorId: 1019, name: "FOOTBALLERS" },
		{ id: 10114, sectorId: 1019, name: "BASKETBALLERS" },
		{ id: 10115, sectorId: 1019, name: "VOLLEYBALLERS" },
		{ id: 10116, sectorId: 1019, name: "TABLE TENNIS PLAYERS" },
		{ id: 10117, sectorId: 1019, name: "LAWN TENNIS PLAYERS" },
		{ id: 10118, sectorId: 1019, name: "BADMINTON PLAYERS" },
		{ id: 10119, sectorId: 1019, name: "SNOOKER PLAYERS" },

		// Target Sports Sector Id 1020
		{ id: 10120, sectorId: 1020, name: "ARCHERY" },
		{ id: 10121, sectorId: 1020, name: "DARTS" },
		{ id: 10122, sectorId: 1020, name: "TARGET (MILITARY) SPORT" },
		{ id: 10123, sectorId: 1020, name: "CATAPULT" }, // Note: British spelling preserved

		// Table Top Sports Sector Id 1021
		{ id: 10124, sectorId: 1021, name: "CHESS" },
		{ id: 10125, sectorId: 1021, name: "DRAUGHT" },
		{ id: 10126, sectorId: 1021, name: "EYO" },
		{ id: 10127, sectorId: 1021, name: "LUDO" },
		{ id: 10128, sectorId: 1021, name: "WHOT" },
		{ id: 10129, sectorId: 1021, name: "CARDS" },

		// Track Races Sector Id 1022
		{ id: 10130, sectorId: 1022, name: "LONG DISTANCE RACE 5KM RUNNERS" },
		{ id: 10131, sectorId: 1022, name: "MID-DISTANCE (800M-3KM) RUNNERS" }, // Fixed hyphen position
		{ id: 10132, sectorId: 1022, name: "SHORT TAKE (100M) RUNNERS" },
		{ id: 10133, sectorId: 1022, name: "RELAY (400M) RUNNERS" },
		{ id: 10134, sectorId: 1022, name: "STEEPLE CHASE 3KM RUNNERS" }, // Corrected "STAPLE" to "STEEPLE"
		{ id: 10135, sectorId: 1022, name: "HURDLES 100M RUNNERS" }, // Corrected "HUDDLES" to "HURDLES"
		{ id: 10136, sectorId: 1022, name: "DECATHLON" },
		{ id: 10137, sectorId: 1022, name: "HEPTATHLON" },
		{ id: 10138, sectorId: 1022, name: "PENTATHLON" },

		// Throw Sports Sector Id 1023
		{ id: 10139, sectorId: 1023, name: "JAVELIN" },
		{ id: 10140, sectorId: 1023, name: "SHOT PUT" },
		{ id: 10141, sectorId: 1023, name: "DISCUS" },
		{ id: 10142, sectorId: 1023, name: "HAMMER" },
		{ id: 10143, sectorId: 1023, name: "LOG THROW" }, // Added as non-traditional throwing event

		// Jump Sports Sector Id 1024
		{ id: 10144, sectorId: 1024, name: "LONG JUMPERS" }, // Note: "LONG" typo preserved
		{ id: 10145, sectorId: 1024, name: "POLE VAULTERS" },
		{ id: 10146, sectorId: 1024, name: "TRIPLE JUMPERS" }, // Corrected "TREPLE" to "TRIPLE"
		{ id: 10147, sectorId: 1024, name: "OBSTACLE JUMPERS" },
		{ id: 10148, sectorId: 1024, name: "TAG-TEAM JUMPERS" },
		{ id: 10149, sectorId: 1024, name: "RELAY JUMPERS" },

		// Combat Sports Sector Id 1025
		{ id: 10150, sectorId: 1025, name: "BOXERS" },
		{ id: 10151, sectorId: 1025, name: "DAMBEE TRADITIONAL WRESTLERS" }, // Preserved traditional spelling
		{ id: 10152, sectorId: 1025, name: "MODERN WRESTLERS" },
		{ id: 10153, sectorId: 1025, name: "JUDOKA" }, // Correct term for Judo practitioners
		{ id: 10154, sectorId: 1025, name: "TAEKWONDO" }, // Standardized spelling
		{ id: 10155, sectorId: 1025, name: "KARATE" },

		// Water Sports Sector Id 1026
		{ id: 10156, sectorId: 1026, name: "SWIMMERS" },
		{ id: 10157, sectorId: 1026, name: "WATER POLO" },
		{ id: 10158, sectorId: 1026, name: "WATER VOLLEYBALLERS" },
		{ id: 10159, sectorId: 1026, name: "WATER KINESTHETICS" }, // Preserved original term

		// Motor Sports Sector Id 1027
		{ id: 10160, sectorId: 1027, name: "BICYCLE TOURS 15KM-45KM" }, // Consolidated spacing
		{ id: 10161, sectorId: 1027, name: "SHORT CYCLE RACES 400M" }, // Note: "CYCLE" preserved
		{ id: 10162, sectorId: 1027, name: "MID CYCLING RACES 1200M" }, // Note: Mixed "CYCLE"/"CYCLING"
		{ id: 10163, sectorId: 1027, name: "LONG CYCLING RACES 5KM" },

		// Horseback Sports Sector Id 2028
		{ id: 10164, sectorId: 1028, name: "HORSE RACING" },
		{ id: 10165, sectorId: 1028, name: "POLO" },
		{ id: 10166, sectorId: 1028, name: "BARREL" }, // Presumably barrel racing
		{ id: 10167, sectorId: 1028, name: "HORSE SHOWS" }, // All equestrian show competitions

		// Cultivation Sector Id 1029
		{ id: 10168, sectorId: 1029, name: "CROP FARMERS" },
		{ id: 10169, sectorId: 1029, name: "ANIMAL HUSBANDRY" },
		{ id: 10170, sectorId: 1029, name: "HORTICULTURALISTS" },
		{ id: 10171, sectorId: 1029, name: "SPECIAL AGRICULTURE" }, // Specialty/niche farming
		{ id: 10172, sectorId: 1029, name: "MEDICAL AGRICULTURE" }, // Medicinal crops/pharma farming

		// Storage Sector Id 1030
		{ id: 10173, sectorId: 1030, name: "CROP STORAGE COMPANIES" },
		{ id: 10174, sectorId: 1030, name: "PERISHABLE STORAGE COYS" }, // "COYS" preserved as abbreviation for "companies"
		{ id: 10175, sectorId: 1030, name: "FLUID STORAGE COMPANIES" },
		{ id: 10176, sectorId: 1030, name: "INDUSTRIAL PACKAGING" },
		{ id: 10177, sectorId: 1030, name: "SPECIAL AGRO-HOLDING COMPANIES" }, // Fixed "=" to "-" in "AGRO-HOLDING"

		// Processing Sector Id 1031
		{ id: 10178, sectorId: 1031, name: "RETAIL PROCESSING COMPANIES" },
		{ id: 10179, sectorId: 1031, name: "INDUSTRIAL PROCESSING COYS" }, // Preserved "COYS" abbreviation
		{ id: 10180, sectorId: 1031, name: "BY-PRODUCT PROCESSING COYS" }, // Corrected "BY-PRODUCE" to "BY-PRODUCT"
		{ id: 10181, sectorId: 1031, name: "WASTE PROCESSING COMPANIES" },
		{ id: 10182, sectorId: 1031, name: "MEDICAL PRODUCE PROCESSING COYS" }, // Fixed "PROCESING" typo
		{ id: 10183, sectorId: 1031, name: "SPECIAL PRODUCE PROCESSING" },

		// Agro-Logistics Sector Id 1032
		{ id: 10184, sectorId: 1032, name: "LANDED AGRO HAULAGE COMPANIES" },
		{ id: 10185, sectorId: 1032, name: "MARINE AGRO HAULAGE COMPANIES" },
		{ id: 10186, sectorId: 1032, name: "AERIAL AGRO-HAULAGE COYS" }, // Hyphenated as in original
		{ id: 10187, sectorId: 1032, name: "INTERCHANGE AGRO-HAULAGE COYS" },
		{ id: 10188, sectorId: 1032, name: "SPECIAL HAULAGE HANDLING COYS" },

		// Venues Sector Id 1033
		{ id: 10189, sectorId: 1033, name: "SMALL VENUES < 2000" }, // Note: "VENUES" spelling preserved
		{ id: 10190, sectorId: 1033, name: "MEDIUM VENUES < 5000" },
		{ id: 10191, sectorId: 1033, name: "BIG EVENTS ARENA < 10000" }, // Singular "ARENA" preserved
		{ id: 10192, sectorId: 1033, name: "STADIUMS/VELODROMES > 10000" },
		{ id: 10193, sectorId: 1033, name: "EVENT COURSES > 15000" },
		{ id: 10194, sectorId: 1033, name: "TOUR COURSES > 20000" },

		// Recreation Sector Id 1034
		{ id: 10195, sectorId: 1034, name: "SMALL HOTELS (>3 STAR)" },
		{ id: 10196, sectorId: 1034, name: "MEDIUM HOTELS (>5 STAR)" }, // Corrected "HOTEL" to plural
		{ id: 10197, sectorId: 1034, name: "BIG HOTELS (<5 STAR)" }, // Corrected "HOTEL" to plural
		{ id: 10198, sectorId: 1034, name: "THEME PARKS" },
		{ id: 10199, sectorId: 1034, name: "MEDIUM THEME PARKS" }, // Fixed double space
		{ id: 10200, sectorId: 1034, name: "FESTIVAL/CARNIVAL LOCALES" }, // Crossed 10200 threshold

		// Food & Beverage Sector Id 1035
		{ id: 10201, sectorId: 1035, name: "GENERAL MANAGER OF RESORT" },
		{ id: 10202, sectorId: 1035, name: "ASST. GEN. MNGR (RESTAURANT)" },
		{ id: 10203, sectorId: 1035, name: "HEAD CHEF/EXEC CHEF" },
		{ id: 10204, sectorId: 1035, name: "SOUS CHEF" },
		{ id: 10205, sectorId: 1035, name: "LINE CHEF" },
		{ id: 10206, sectorId: 1035, name: "PASTRY CHEF" },
		{ id: 10207, sectorId: 1035, name: "FRONT OFFICE MNGR" },
		{ id: 10208, sectorId: 1035, name: "HEAD WAITER/WAITSTAFF SUPERVISOR" },
		{ id: 10209, sectorId: 1035, name: "BARTENDER" },
		{ id: 10210, sectorId: 1035, name: "HOST/HOSTESS" },
		{ id: 10211, sectorId: 1035, name: "WAITSTAFF (WAITERS & WAITRESSES)" },
		{ id: 10212, sectorId: 1035, name: "KITCHEN ASSISTANT" },
		{ id: 10213, sectorId: 1035, name: "DISH WASHER" },
		{ id: 10214, sectorId: 1035, name: "RUNNER/BUSSER" },

		// Tour Management Sector Id 1036
		{ id: 10215, sectorId: 1036, name: "LOCAL AREA TOURS" },
		{ id: 10216, sectorId: 1036, name: "PROVINCIAL TOURS" },
		{ id: 10217, sectorId: 1036, name: "REGIONAL TOURS" },
		{ id: 10218, sectorId: 1036, name: "INTER-REGIONAL TOURS" }, // Standardized hyphen
		{ id: 10219, sectorId: 1036, name: "NATIONAL TOURS" },
		{ id: 10220, sectorId: 1036, name: "SPECIAL TOURS" },

		// Stop-Over Management Sector Id 1037
		{ id: 10221, sectorId: 1037, name: "LAND PORTS" },
		{ id: 10222, sectorId: 1037, name: "HYDRO-PORTS" }, // Standardized hyphen
		{ id: 10223, sectorId: 1037, name: "AIRPORTS" },
		{ id: 10224, sectorId: 1037, name: "RAIL STATIONS" },
		{ id: 10225, sectorId: 1037, name: "DRONE STATIONS" }, // Preserved original spelling
		{ id: 10226, sectorId: 1037, name: "SPECIAL PORTS" },

		// Electrical/Electronics Sector Id 1038
		{ id: 10227, sectorId: 1038, name: "MAKERS OF DOMESTIC APPLIANCES" },
		{ id: 10228, sectorId: 1038, name: "MAKERS OF INDUSTRIAL APPLIANCES" },
		{ id: 10229, sectorId: 1038, name: "MAKERS OF PUBLIC-USE APPLIANCES" },
		{ id: 10230, sectorId: 1038, name: "MAKERS OF SPECIAL APPLIANCES" },
		{ id: 10231, sectorId: 1038, name: "MAKERS OF NANO-TECH APPLIANCES" },

		// Mechanical & Metallurgical Sector Id 1039
		{ id: 10232, sectorId: 1039, name: "MAKERS OF DOM. ENGINES & DEVICES" }, // Preserved "DOM." abbreviation
		{ id: 10233, sectorId: 1039, name: "MAKERS OF IND. ENGINES & DEVICES" }, // Preserved "IND." abbreviation
		{ id: 10234, sectorId: 1039, name: "MAKERS OF PUBLIC-USE ENGINES/DEV" }, // Consolidated spacing after slash
		{ id: 10235, sectorId: 1039, name: "MAKERS OF SPECIAL DEVICES" },
		{ id: 10236, sectorId: 1039, name: "MAKERS OF NANO-TECH DEVICES" },
		{ id: 10237, sectorId: 1039, name: "MAKERS OF SECURITY/PROTECTIVE DEV" }, // Preserved "DEV" abbreviation

		// Bio-Chemical Manufacturing Sector Id 1040
		{ id: 10238, sectorId: 1040, name: "MAKERS OF DOM BIO-CHEM PRODUCE" },
		{ id: 10239, sectorId: 1040, name: "MAKERS OF IND. BIO-CHEM PRODUCE" },
		{ id: 10240, sectorId: 1040, name: "MAKERS OF OUTDOOR BIO-CHEM PRO" },
		{ id: 10241, sectorId: 1040, name: "MAKERS OF SPECIAL BIO-CHEM PROD" },
		{ id: 10242, sectorId: 1040, name: "MAKERS OF MULTI-ELEMENTAL PROD" },
		{ id: 10243, sectorId: 1040, name: "RESEARCH BODIES IN BIO-CHEMICALS" }, // Note: Kept original "BIO-CHEMICALS" casing

		// Civil Construction Sector Id 1041
		{ id: 10244, sectorId: 1041, name: "PRE-FABRICATORS" },
		{ id: 10245, sectorId: 1041, name: "SHORT TERM PROJECT MANAGERS" },
		{ id: 10246, sectorId: 1041, name: "MID-TERM PROJECT MANAGERS" },
		{ id: 10247, sectorId: 1041, name: "LONG TERM PROJECT MANAGERS" },
		{ id: 10248, sectorId: 1041, name: "BUILDING INNOVATORS & DESIGN COYS" }, // Preserved "COYS" abbreviation
		{ id: 10249, sectorId: 1041, name: "LANDMARK & MONUMENT COMPANIES" },

		// Adverts & Order Management Sector Id 1042
		{ id: 10250, sectorId: 1042, name: "PROJECTS PERCEPTION MANAGERS" },
		{ id: 10251, sectorId: 1042, name: "PERSONALITY IMAGE MANAGERS" },
		{ id: 10252, sectorId: 1042, name: "PRODUCE IMAGE AND APPEAL MGRS" }, // Preserved "MGRS" abbreviation
		{ id: 10253, sectorId: 1042, name: "CONCEPT AWARENESS MANGRS" }, // Preserved "MANGRS" spelling
		{ id: 10254, sectorId: 1042, name: "RE-RUN AWARENESS MANAGERS" }, // Hyphen preserved
		{ id: 10255, sectorId: 1042, name: "INDUSTRY REPUTATION MANAGERS" },

		// Holding & Wholesales Sector Id 1043
		{ id: 10256, sectorId: 1043, name: "AGRO-PRODUCE HOLDING & STORAGE" }, // Hyphen preserved
		{ id: 10257, sectorId: 1043, name: "MED/PHARMACEUTICAL HOLDING/STRG" }, // Slash usage preserved
		{ id: 10258, sectorId: 1043, name: "NON-PERISHABLE RESOURCE STORAGE" }, // Hyphen preserved
		{ id: 10259, sectorId: 1043, name: "INTANGIBLE PROPERTY HANDLING COYS" }, // "COYS" preserved
		{ id: 10260, sectorId: 1043, name: "INDIE ETHICS AND VALUES COYS" }, // "COYS" preserved
		{ id: 10261, sectorId: 1043, name: "INDIE COMMERCE & TRADE RESEARCH" }, // Ampersand preserved

		// Retail Chains Sector Id 1044
		{ id: 10262, sectorId: 1044, name: "AGRO-RETAIL CHAIN MNGMNT COYS" }, // "MNGMNT" and "COYS" preserved
		{ id: 10263, sectorId: 1044, name: "MED/PHARMA HOLDING & RETAIL COYS" }, // Slash and ampersand preserved
		{ id: 10264, sectorId: 1044, name: "GEN. CONSUMABLES RETAIL CHAINS COYS" }, // "GEN." abbreviation preserved
		{ id: 10265, sectorId: 1044, name: "RETAIL OF INTANGIBLE RESOURCES" },
		{ id: 10266, sectorId: 1044, name: "RETAIL OF INDIE RESOURCES" }, // "INDIE" preserved
		{ id: 10267, sectorId: 1044, name: "RETAIL OF COMMUNITY RESOURCES" },

		// Logistics & Delivery Sector Id 1045
		{ id: 10268, sectorId: 1045, name: "AGRO PRODUCE ORDER MANAGEMENT" },
		{ id: 10269, sectorId: 1045, name: "MED/PHAR PRODUCE ORDER MGMNT" }, // "MGMNT" abbreviation preserved
		{ id: 10270, sectorId: 1045, name: "GEN. CONSUMABLES ORDER MANAGEMENT" }, // "GEN." abbreviation preserved
		{ id: 10271, sectorId: 1045, name: "INTANGIBLE SERVICES ORDER MANAGEMENT" },
		{ id: 10272, sectorId: 1045, name: "INDUSTRIAL ORDER MANAGEMENT" },
		{ id: 10273, sectorId: 1045, name: "COMMUNITY ORDER MANAGEMENT" },
	],
};

// Stats for the catalog
const catalogStats = {
	totalEconomies: jobCatalog.economies.length,
	totalIndustries: jobCatalog.industries.length,
	totalSectors: jobCatalog.sectors.length,
	totalJobs: jobCatalog.jobs.length,
	featuredEconomies: ["Creative Economy", "Athletic Economy", "Entrepreneurial Economy"],
};

// TypeScript interfaces
interface TreeNodeProps {
	item: unknown;
	level?: number;
	type: string;
	isExpanded?: boolean;
	onToggle?: () => void;
	children?: React.ReactNode;
}

// Expandable Tree Node Component
const TreeNode: React.FC<TreeNodeProps> = ({ item, level = 0, type, isExpanded, onToggle, children }) => {
	const getIcon = (type: string) => {
		switch (type) {
			case "economy":
				return <Globe className="w-5 h-5" />;
			case "industry":
				return <Building className="w-5 h-5" />;
			case "sector":
				return <Layers className="w-5 h-5" />;
			case "job":
				return <Briefcase className="w-4 h-4" />;
			default:
				return <Grid className="w-5 h-5" />;
		}
	};

	const getColor = (type: string) => {
		switch (type) {
			case "economy":
				return "text-green-400";
			case "industry":
				return "text-yellow-400";
			case "sector":
				return "text-blue-400";
			case "job":
				return "text-gray-300";
			default:
				return "text-gray-400";
		}
	};

	return (
		<div className={`ml-${level * 4}`}>
			<div
				className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors ${
					children ? "cursor-pointer" : ""
				}`}
				onClick={children && onToggle ? onToggle : undefined}>
				{children && onToggle && (
					<motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
						<ChevronRight className="w-4 h-4 text-gray-400" />
					</motion.div>
				)}
				<div className={getColor(type)}>{getIcon(type)}</div>
				<span className={`${getColor(type)} font-medium`}>{item.name}</span>
			</div>
			<AnimatePresence>
				{isExpanded && children && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

// Main Component
const JobCatalogBrowser = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState("tree"); // 'tree' or 'grid'
	const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
	const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
	const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});

	const toggleNode = (id: string) => {
		setExpandedNodes((prev) => ({
			...prev,
			[id]: !prev[id],
		}));
	};

	const toggleCard = (economyId: number) => {
		setExpandedCards((prev) => ({
			...prev,
			[economyId]: !prev[economyId],
		}));
	};

	const filteredData = useMemo(() => {
		if (!searchTerm) return jobCatalog;

		const searchLower = searchTerm.toLowerCase();

		const filteredJobs = jobCatalog.jobs.filter((job) => job.name.toLowerCase().includes(searchLower));

		const filteredSectors = jobCatalog.sectors.filter(
			(sector) => sector.name.toLowerCase().includes(searchLower) || filteredJobs.some((job) => job.sectorId === sector.id)
		);

		const filteredIndustries = jobCatalog.industries.filter(
			(industry) =>
				industry.name.toLowerCase().includes(searchLower) ||
				filteredSectors.some((sector) => sector.industryId === industry.id)
		);

		const filteredEconomies = jobCatalog.economies.filter(
			(economy) =>
				economy.name.toLowerCase().includes(searchLower) ||
				filteredIndustries.some((industry) => industry.economyId === economy.id)
		);

		return {
			economies: filteredEconomies,
			industries: filteredIndustries,
			sectors: filteredSectors,
			jobs: filteredJobs,
		};
	}, [searchTerm]);

	const getEconomyIcon = (economyName: string) => {
		if (economyName.includes("Creative")) return "🎨";
		if (economyName.includes("Athletic")) return "🏃";
		if (economyName.includes("Entrepreneurial")) return "💼";
		return "🌟";
	};

	return (
		<LayoutWrapper>
			<div className="min-h-screen bg-gray-900 text-white">
				<div className="pt-16">
					{/* Hero Section */}
					<AnimatedSection className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
						<div className="max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="mb-8">
								<div className="text-6xl mb-6">🗂️</div>
								<h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
									Job Catalog Explorer
								</h1>
								<p className="text-xl md:text-2xl text-yellow-400 mb-6">
									Discover Your Career Path Across Africa&apos;s Economy
								</p>
								<p className="text-lg text-gray-300 mb-8 max-w-4xl mx-auto">
									Explore the comprehensive taxonomy of careers organized by economic sectors,
									industries, and specializations. Find your place in Africa&apos;s diverse
									economic landscape.
								</p>
							</motion.div>

							{/* Catalog Statistics */}
							<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
								{[
									{
										value: catalogStats.totalEconomies,
										label: "Economic Sectors",
										icon: <Globe className="w-6 h-6" />,
									},
									{
										value: catalogStats.totalIndustries,
										label: "Industries",
										icon: <Building className="w-6 h-6" />,
									},
									{
										value: catalogStats.totalSectors,
										label: "Specializations",
										icon: <Layers className="w-6 h-6" />,
									},
									{
										value: catalogStats.totalJobs,
										label: "Career Types",
										icon: <Briefcase className="w-6 h-6" />,
									},
								].map((stat, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 30 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
										className="text-center">
										<div className="text-yellow-400 mb-2 flex justify-center">
											{stat.icon}
										</div>
										<div className="text-2xl font-bold text-green-400 mb-1">
											{stat.value}
										</div>
										<div className="text-sm text-gray-300">{stat.label}</div>
									</motion.div>
								))}
							</div>

							{/* Search and View Toggle */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8 }}
								className="max-w-4xl mx-auto">
								<div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 border border-gray-700">
									<div className="flex flex-col md:flex-row gap-4">
										<div className="flex-1 relative">
											<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
											<input
												type="text"
												placeholder="Search careers, industries, sectors..."
												value={searchTerm}
												onChange={(e) => setSearchTerm(e.target.value)}
												className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-transparent text-white placeholder-gray-400"
											/>
										</div>
										<div className="flex gap-3">
											<Button
												variant={viewMode === "tree" ? "primary" : "ghost"}
												onClick={() => setViewMode("tree")}
												icon={<List className="w-5 h-5" />}>
												Tree View
											</Button>
											<Button
												variant={viewMode === "grid" ? "primary" : "ghost"}
												onClick={() => setViewMode("grid")}
												icon={<Grid className="w-5 h-5" />}>
												Grid View
											</Button>
										</div>
									</div>
								</div>
							</motion.div>
						</div>
					</AnimatedSection>

					{/* Main Content */}
					<AnimatedSection className="py-20 bg-gray-800">
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							{viewMode === "tree" ? (
								/* Tree View */
								<div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
									<h2 className="text-2xl font-bold mb-6 text-green-400">
										Career Taxonomy Tree
									</h2>
									<div className="space-y-2">
										{filteredData.economies.map((economy) => {
											const economyIndustries = filteredData.industries.filter(
												(industry) => industry.economyId === economy.id
											);

											return (
												<TreeNode
													key={economy.id}
													item={economy}
													type="economy"
													isExpanded={
														expandedNodes[`economy-${economy.id}`]
													}
													onToggle={() =>
														toggleNode(`economy-${economy.id}`)
													}>
													{economyIndustries.length > 0 && (
														<div className="space-y-2">
															{economyIndustries.map(
																(industry) => {
																	const industrySectors =
																		filteredData.sectors.filter(
																			(
																				sector
																			) =>
																				sector.industryId ===
																				industry.id
																		);

																	return (
																		<TreeNode
																			key={
																				industry.id
																			}
																			item={
																				industry
																			}
																			level={
																				1
																			}
																			type="industry"
																			isExpanded={
																				expandedNodes[
																					`industry-${industry.id}`
																				]
																			}
																			onToggle={() =>
																				toggleNode(
																					`industry-${industry.id}`
																				)
																			}>
																			{industrySectors.length >
																				0 && (
																				<div className="space-y-2">
																					{industrySectors.map(
																						(
																							sector
																						) => {
																							const sectorJobs =
																								filteredData.jobs.filter(
																									(
																										job
																									) =>
																										job.sectorId ===
																										sector.id
																								);

																							return (
																								<TreeNode
																									key={
																										sector.id
																									}
																									item={
																										sector
																									}
																									level={
																										2
																									}
																									type="sector"
																									isExpanded={
																										expandedNodes[
																											`sector-${sector.id}`
																										]
																									}
																									onToggle={() =>
																										toggleNode(
																											`sector-${sector.id}`
																										)
																									}>
																									{sectorJobs.length >
																										0 && (
																										<div className="space-y-1 ml-8">
																											{sectorJobs.map(
																												(
																													job
																												) => (
																													<TreeNode
																														key={
																															job.id
																														}
																														item={
																															job
																														}
																														level={
																															3
																														}
																														type="job"
																													/>
																												)
																											)}
																										</div>
																									)}
																								</TreeNode>
																							);
																						}
																					)}
																				</div>
																			)}
																		</TreeNode>
																	);
																}
															)}
														</div>
													)}
												</TreeNode>
											);
										})}
									</div>
								</div>
							) : (
								/* Grid View */
								<div>
									<h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
										Economic Sectors Overview
									</h2>
									<div className="grid lg:grid-cols-3 gap-8">
										{filteredData.economies.map((economy) => {
											const economyIndustries = filteredData.industries.filter(
												(industry) => industry.economyId === economy.id
											);
											const isExpanded = expandedCards[economy.id];

											return (
												<Card
													key={economy.id}
													className="hover:border-yellow-400">
													<div className="text-center mb-6">
														<div className="text-4xl mb-4">
															{getEconomyIcon(economy.name)}
														</div>
														<h3 className="text-2xl font-bold text-green-400 mb-2">
															{economy.name}
														</h3>
														<p className="text-gray-400">
															{economyIndustries.length}{" "}
															Industries
														</p>
													</div>

													<div className="space-y-3 mb-6">
														{economyIndustries
															.slice(
																0,
																isExpanded
																	? economyIndustries.length
																	: 4
															)
															.map((industry) => {
																const industrySectors =
																	filteredData.sectors.filter(
																		(
																			sector
																		) =>
																			sector.industryId ===
																			industry.id
																	);

																return (
																	<div
																		key={
																			industry.id
																		}
																		className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
																		onClick={() =>
																			setSelectedIndustry(
																				industry
																			)
																		}>
																		<div>
																			<span className="text-yellow-400 font-medium">
																				{
																					industry.name
																				}
																			</span>
																			<div className="text-sm text-gray-500">
																				{
																					industrySectors.length
																				}{" "}
																				sectors
																			</div>
																		</div>
																		<ChevronRight className="w-4 h-4 text-gray-400" />
																	</div>
																);
															})}
														{!isExpanded &&
															economyIndustries.length >
																4 && (
																<div className="text-center text-gray-500 text-sm">
																	+
																	{economyIndustries.length -
																		4}{" "}
																	more
																	industries
																</div>
															)}
													</div>

													{/* Expanded Industry Details */}
													{isExpanded &&
														selectedIndustry &&
														economyIndustries.some(
															(ind) =>
																ind.id ===
																selectedIndustry.id
														) && (
															<motion.div
																initial={{
																	opacity: 0,
																	height: 0,
																}}
																animate={{
																	opacity: 1,
																	height: "auto",
																}}
																className="mb-6 p-4 bg-gray-700 rounded-lg">
																<h4 className="text-lg font-bold text-yellow-400 mb-3">
																	{
																		selectedIndustry.name
																	}{" "}
																	- Sectors
																</h4>
																<div className="space-y-2">
																	{filteredData.sectors
																		.filter(
																			(
																				sector
																			) =>
																				sector.industryId ===
																				selectedIndustry.id
																		)
																		.map(
																			(
																				sector
																			) => {
																				const sectorJobs =
																					filteredData.jobs.filter(
																						(
																							job
																						) =>
																							job.sectorId ===
																							sector.id
																					);
																				return (
																					<div
																						key={
																							sector.id
																						}
																						className="flex items-center justify-between p-2 bg-gray-800 rounded">
																						<div>
																							<span className="text-blue-400 text-sm font-medium">
																								{
																									sector.name
																								}
																							</span>
																							<div className="text-xs text-gray-500">
																								{
																									sectorJobs.length
																								}{" "}
																								career
																								types
																							</div>
																						</div>
																					</div>
																				);
																			}
																		)}
																</div>
															</motion.div>
														)}

													<div className="grid grid-cols-2 gap-4 mb-6 text-center text-sm">
														<div>
															<div className="text-lg font-bold text-yellow-400">
																{
																	filteredData.sectors.filter(
																		(
																			sector
																		) =>
																			economyIndustries.some(
																				(
																					ind
																				) =>
																					ind.id ===
																					sector.industryId
																			)
																	).length
																}
															</div>
															<div className="text-gray-500">
																Sectors
															</div>
														</div>
														<div>
															<div className="text-lg font-bold text-green-400">
																{
																	filteredData.jobs.filter(
																		(
																			job
																		) =>
																			filteredData.sectors.some(
																				(
																					sector
																				) =>
																					sector.id ===
																						job.sectorId &&
																					economyIndustries.some(
																						(
																							ind
																						) =>
																							ind.id ===
																							sector.industryId
																					)
																			)
																	).length
																}
															</div>
															<div className="text-gray-500">
																Career Types
															</div>
														</div>
													</div>

													<div className="space-y-3">
														<Button
															className="w-full"
															onClick={() =>
																toggleCard(economy.id)
															}>
															{isExpanded
																? "Show Less"
																: `Explore ${
																		economy.name.split(
																			" "
																		)[0]
																  }`}
														</Button>
														{isExpanded && (
															<Button
																variant="ghost"
																size="sm"
																className="w-full"
																onClick={() =>
																	setViewMode(
																		"tree"
																	)
																}>
																View in Tree Mode
															</Button>
														)}
													</div>
												</Card>
											);
										})}
									</div>

									{/* Selected Industry Detail Modal/Section */}
									{selectedIndustry && (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											className="mt-12 bg-gray-800 rounded-2xl p-8 border border-gray-700">
											<div className="flex justify-between items-center mb-6">
												<h3 className="text-2xl font-bold text-yellow-400">
													{selectedIndustry.name} - Career Pathways
												</h3>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => setSelectedIndustry(null)}
													icon={<X className="w-4 h-4" />}>
													Close
												</Button>
											</div>

											<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
												{filteredData.sectors
													.filter(
														(sector) =>
															sector.industryId ===
															selectedIndustry.id
													)
													.map((sector) => {
														const sectorJobs =
															filteredData.jobs.filter(
																(job) =>
																	job.sectorId ===
																	sector.id
															);
														return (
															<div
																key={sector.id}
																className="bg-gray-700 rounded-lg p-4">
																<h4 className="text-blue-400 font-bold mb-3">
																	{sector.name}
																</h4>
																<div className="space-y-2">
																	{sectorJobs.map(
																		(
																			job
																		) => (
																			<div
																				key={
																					job.id
																				}
																				className="flex items-center space-x-2">
																				<Briefcase className="w-3 h-3 text-gray-400" />
																				<span className="text-gray-300 text-sm">
																					{
																						job.name
																					}
																				</span>
																			</div>
																		)
																	)}
																	{sectorJobs.length ===
																		0 && (
																		<p className="text-gray-500 text-sm italic">
																			No
																			specific
																			careers
																			listed
																		</p>
																	)}
																</div>
															</div>
														);
													})}
											</div>
										</motion.div>
									)}
								</div>
							)}
						</div>
					</AnimatedSection>

					{/* Call to Action */}
					<AnimatedSection className="py-20 bg-gradient-to-r from-green-500 via-yellow-500 to-green-500">
						<div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
							<h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Explore Your Career Path?</h2>
							<p className="text-xl mb-8 text-gray-800">
								Use our comprehensive job catalog to discover career opportunities that align with
								your interests and skills across Africa&apos;s diverse economy.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button
									variant="secondary"
									size="lg"
									className="bg-gray-900 text-white hover:bg-gray-800"
									icon={<Search className="w-5 h-5" />}>
									Advanced Search
								</Button>
								<Button
									variant="ghost"
									size="lg"
									className="bg-gray-900 text-white hover:bg-gray-800"
									icon={<BookOpen className="w-5 h-5" />}>
									Career Guidance
								</Button>
							</div>
						</div>
					</AnimatedSection>
				</div>
			</div>
		</LayoutWrapper>
	);
};

export default JobCatalogBrowser;
