import { useState, useEffect, useCallback, createContext, useContext, useRef, useMemo } from "react";
import {
  Home, Calendar, TrendingUp, Users, CreditCard, CalendarDays,
  Menu, X, Bell, Settings, Shield, ChevronRight, ChevronDown, Clock,
  PartyPopper, ArrowUpRight, ArrowDownRight, Award, DollarSign, LayoutDashboard,
  UserCheck, Megaphone, LogOut, Plus, Edit3, Send, Check, Search, Copy, Info,
  CircleCheck, UserPlus, Heart, Flame, Star, Sun, Moon, Wind, Sparkles,
  Mountain, Leaf, Music, Gift, Share2, MapPin, Zap, Waves, Eye
} from "lucide-react";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

// ═══════════════════════════════════════════════════════════════
//  STUDIO_CONFIG — CdA Power Yoga
// ═══════════════════════════════════════════════════════════════
const STUDIO_CONFIG = {
  name: "CDA POWER",
  subtitle: "YOGA",
  tagline: "Strength & ease, on and off the mat.",
  logoMark: "CP",
  logoImage: null,
  description: "An extraordinary yoga community designed to give you access to a lifetime of power and purpose — at Riverstone in Coeur d'Alene.",
  heroLine1: "FIND YOUR",
  heroLine2: "POWER",

  address: { street: "2018 N Main St", city: "Coeur d'Alene", state: "ID", zip: "83814" },
  phone: "(208) 290-5777",
  email: "hello@cdapoweryoga.com",
  neighborhood: "Village at Riverstone",
  website: "https://cdapoweryoga.com",
  social: { instagram: "@cdapoweryoga" },

  theme: {
    accent:     { h: 138, s: 28, l: 66 },   // Sage green (#91ba99 from site)
    accentAlt:  { h: 38,  s: 72, l: 68 },   // Warm gold (#e7bd74 from site)
    warning:    { h: 20,  s: 50, l: 52 },    // Earthy terracotta
    primary:    { h: 138, s: 10, l: 26 },    // Dark forest green (from site bg)
    surface:    { h: 40,  s: 20, l: 96 },    // Warm cream (#f9f4ec feel)
    surfaceDim: { h: 40,  s: 14, l: 92 },    // Soft warm cream
  },

  features: {
    workshops: true,
    retreats: false,
    soundBaths: true,
    teacherTrainings: true,
    practiceTracking: true,
    communityFeed: true,
    guestPasses: true,
    milestones: true,
  },

  classCapacity: 35,
  specialtyCapacity: 25,
};

// ═══════════════════════════════════════════════════════════════
//  STUDIO IMAGES — Real URLs from cdapoweryoga.com
// ═══════════════════════════════════════════════════════════════
const STUDIO_IMAGES = {
  logo: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/4d37c295-1cb4-4ef8-b175-b5faa07d4480/businesscards_CDA_good_outlines.jpg?format=300w",
  heroHome: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/3d06eb92-1d71-411f-adaa-c4ae56bc980a/D29A0127.jpg?format=750w",
  heroClasses: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/c3a01fbc-521c-4fa7-931b-51e3bc82578e/D29A0170.jpg?format=750w",
  heroSchedule: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/1cc4a848-cec1-4202-a0f9-3b6068f1509a/D29A0142.jpg?format=750w",
  heroPractice: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/63feb894-b63e-4f7c-9fb8-06ed49f14f78/D29A0163.jpg?format=750w",
  heroCommunity: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/991297b7-c531-4f01-9507-d89bbb56b720/D29A0201.jpg?format=750w",
  heroTeachers: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/49782219-312f-4ec6-a9b1-14f507014275/D29A0369.jpg?format=750w",
  heroEvents: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/daf4feff-f965-493d-a102-398e79e51d4c/tt2026.jpg?format=750w",
  heroMembership: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/19b74bc8-b664-4b0c-87a2-c86a35d68580/D29A0238.jpg?format=750w",
  trainingGroup: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/a361b906-1c38-456e-9ad3-d2d982370541/IMG_4620.png?format=500w",
  studioExterior: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/1535386845994-7GIFG3JFLNU081FL0S66/b44a3b2379d9fff553c204c2d4a9142cl-m0xd-w480_h480_q80.jpg?format=300w",
  eventAcroYoga: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/83889cd9-dbc1-4052-8314-9aa97ab34c40/FullSizeRender+8+copy.jpg?format=500w",
  eventBreathwork: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/effc28b2-6e19-4a6f-8aea-54f666c3a837/Breathwork+Saturday+6+pm.png?format=500w",
  communityBenefit1: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/497c7df0-d5b6-4cfb-92ec-235cf0fcc298/tempImagejc1NKv.jpg?format=500w",
  communityBenefit2: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/c760d1cb-0964-4094-ac52-17d826bb6a51/tempImagedOxbwb.jpg?format=500w",
  teachers: {
    ashley: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/e6e2964e-3684-4824-a8d1-874268076d8d/D29A0639.jpg?format=300w",
    amanda: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/cf6d6ce1-f196-474f-ac42-e0af44d1d9fc/D29A0562.jpg?format=300w",
    bree: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/1f0b8c27-7750-42e0-80cc-914db5fc7786/4798222591518491078.jpg?format=300w",
    claire: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/6a5a5987-80aa-4e39-b963-ec090d3d8643/IMG_1931.JPG?format=300w",
    jared: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/1632115176851-UTNB6TR9WPMVVLXXPVPI/Jared.jpg?format=300w",
    chris: "https://images.squarespace-cdn.com/content/v1/5b61e95d96d455d9a929ed35/365f359e-8eab-4215-9a4e-800e55cb9fb0/IMG_3881.jpeg?format=300w",
  },
};

// ═══════════════════════════════════════════════════════════════
//  THEME SYSTEM
// ═══════════════════════════════════════════════════════════════
const hsl = (c, a) => a !== undefined ? `hsla(${c.h},${c.s}%,${c.l}%,${a})` : `hsl(${c.h},${c.s}%,${c.l}%)`;
const hslShift = (c, lShift) => `hsl(${c.h},${c.s}%,${Math.max(0, Math.min(100, c.l + lShift))}%)`;

const T = {
  accent: hsl(STUDIO_CONFIG.theme.accent),
  accentDark: hslShift(STUDIO_CONFIG.theme.accent, -12),
  accentLight: hslShift(STUDIO_CONFIG.theme.accent, 30),
  accentGhost: hsl(STUDIO_CONFIG.theme.accent, 0.08),
  accentBorder: hsl(STUDIO_CONFIG.theme.accent, 0.18),
  success: hsl(STUDIO_CONFIG.theme.accentAlt),
  successGhost: hsl(STUDIO_CONFIG.theme.accentAlt, 0.08),
  successBorder: hsl(STUDIO_CONFIG.theme.accentAlt, 0.18),
  warning: hsl(STUDIO_CONFIG.theme.warning),
  warningGhost: hsl(STUDIO_CONFIG.theme.warning, 0.08),
  warningBorder: hsl(STUDIO_CONFIG.theme.warning, 0.2),
  bg: hsl(STUDIO_CONFIG.theme.primary),
  bgCard: hsl(STUDIO_CONFIG.theme.surface),
  bgDim: hsl(STUDIO_CONFIG.theme.surfaceDim),
  text: "#2c2f2c",
  textMuted: "#6a7268",
  textFaint: "#98a09a",
  border: "#ddd8d0",
  borderLight: "#eae6e0",
};

// ═══════════════════════════════════════════════════════════════
//  DATE HELPERS
// ═══════════════════════════════════════════════════════════════
const today = new Date().toISOString().split("T")[0];
const offsetDate = (d) => { const dt = new Date(); dt.setDate(dt.getDate() + d); return dt.toISOString().split("T")[0]; };
const formatDateShort = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); };
const formatDateLong = (s) => { const d = new Date(s + "T00:00:00"); return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }); };
const fmtTime = (t) => { const [h, m] = t.split(":"); const hr = +h; return `${hr % 12 || 12}:${m} ${hr >= 12 ? "PM" : "AM"}`; };

// ═══════════════════════════════════════════════════════════════
//  MOCK DATA — CdA Power Yoga content
// ═══════════════════════════════════════════════════════════════
const TEACHERS = [
  { id: "t1", firstName: "Ashley", lastName: "Severinsen", role: "Owner & Lead Teacher", certs: ["E-RYT-500", "Baptiste Yoga", "Ana Forrest Trained"], specialties: ["Power Flow", "Breathwork", "Teacher Training"], yearsTeaching: 22, bio: "Ashley's yoga journey began at the University of Utah studying Ashtanga. Aside from her family, yoga has been the focus of her life since 2003. Her primary 500-hour training was with D'ana Baptiste, and she continually seeks new ways to deepen her practice.", photo: STUDIO_IMAGES.teachers.ashley },
  { id: "t2", firstName: "Claire", lastName: "Wilson", role: "Senior Teacher", certs: ["RYT-500", "Sound Healing Cert", "15+ Years"], specialties: ["26/2", "Slow Flow", "Sound Healing"], yearsTeaching: 15, bio: "Claire guides students of all levels through mindful movement, breathwork, and meditation. A trained sound-healing facilitator who completed her favorite yoga and sound training in Thailand, she weaves the therapeutic power of sound into deeply restorative experiences.", photo: STUDIO_IMAGES.teachers.claire },
  { id: "t3", firstName: "Bree", lastName: "Kowalski", role: "Teacher", certs: ["RYT-200", "Baptiste Certified"], specialties: ["Power Flow", "26/2", "Sculpt"], yearsTeaching: 5, bio: "Bree brings wonderful energy and dedication to her classes with thoughtful attention to each student, including posture adjustments when needed. Her dynamic teaching style makes every class both challenging and accessible.", photo: STUDIO_IMAGES.teachers.bree },
  { id: "t4", firstName: "Chris", lastName: "Reeves", role: "Teacher", certs: ["RYT-200", "CDA-PY Trained", "RN"], specialties: ["Restore", "Yoga Nidra", "Restorative"], yearsTeaching: 1, bio: "As a mother, RN, and wife of a firefighter, Chris found yoga to quiet her mind and reconnect with body and breath. She's fallen in love with Restorative Yoga and the deep peace it brings, holding space for students to create their own healing practice.", photo: STUDIO_IMAGES.teachers.chris },
  { id: "t5", firstName: "Amanda", lastName: "Torres", role: "Senior Teacher", certs: ["RYT-500", "Baptiste Yoga", "Wellness Coach"], specialties: ["Power Flow", "Breathwork", "Slow + Strong"], yearsTeaching: 8, bio: "Amanda is one of the OG teachers at CDA Power Yoga. She facilitates monthly breathwork gatherings and serves as a wellness coach. Her classes balance strength with surrender, always bringing you back to your breath.", photo: STUDIO_IMAGES.teachers.amanda },
  { id: "t6", firstName: "Jared", lastName: "Mitchell", role: "Teacher", certs: ["RYT-200", "Inversions Specialist"], specialties: ["Power Flow", "Inversions", "Handstands"], yearsTeaching: 4, bio: "Jared leads fun, supportive explorations of handstands and inversions. Whether you're brand new or want to up-level, his all-levels workshops guide you through alignment, strength, balance, and mindset.", photo: STUDIO_IMAGES.teachers.jared },
];

const TODAYS_FOCUS = {
  id: "focus-today", date: today, name: "Power Flow: Presence & Purpose", type: "POWER FLOW",
  style: "Heated", temp: "90–95°F infrared", duration: 60,
  description: "An all-levels, upbeat vinyasa practice flowing with breath and movement. Balance ease and strength in the body and mind with increased opportunity for arm balances and inversions.",
  intention: "Create presence in a fast-paced world. Balance strength with ease.",
  teacherTip: "The poses aren't the point — the presence you bring to them is. Modify freely. Every variation is the full expression when you breathe into it.",
  playlist: "Power Hour — Ashley's Spotify",
};

const PAST_PRACTICES = [
  { id: "p-y1", date: offsetDate(-1), name: "Slow + Strong", type: "SLOW FLOW", style: "Lightly Heated", temp: "80°F", duration: 60, description: "A mindful vinyasa flow balancing steady breath with controlled movement. Cued at a slower tempo with time for intentional alignment, building body awareness and depth in each pose.", intention: "Discover the depth of each pose.", teacherTip: "Slower doesn't mean easier. Let the tempo reveal what speed hides." },
  { id: "p-y2", date: offsetDate(-2), name: "Deep Restore", type: "RESTORE", style: "Room Temp", temp: "Room Temp", duration: 75, description: "Very slow-paced healing movement and stillness. Focused on grounding and surrender, incorporating elements of Yin Yoga, Yoga Nidra, hands-on assists, and meditation.", intention: "Surrender is not giving up — it's letting in.", teacherTip: "Grab extra blankets and bolsters. Make your nest as cozy as possible." },
  { id: "p-y3", date: offsetDate(-3), name: "26/2 Series", type: "26/2", style: "Heated", temp: "90–95°F", duration: 90, description: "A beginning yoga series of 26 powerful postures presented in the same sequence each class. Each posture builds upon the previous, increasing range of motion, strength, and balance.", intention: "Through repetition, we find freedom." },
];

const UPCOMING_PRACTICE = { id: "p-tmrw", date: offsetDate(1), name: "Sound Bath + Restore", type: "SPECIAL", style: "Restorative", temp: "Room Temp", duration: 90, description: "Claire guides you through a gentle restorative practice followed by a healing sound bath with crystal bowls and chimes. An immersive experience of deep relaxation and self-discovery.", intention: "Sound is medicine. Stillness is home.", teacherTip: "Bring an extra layer — you'll cool down during the sound journey." };

const CLASSES_TODAY = [
  { id: "cl1", time: "05:45", type: "Power Flow (Hot)", coach: "Ashley Severinsen", capacity: 35, registered: 31, waitlist: 0 },
  { id: "cl2", time: "07:00", type: "26/2 Series (Hot)", coach: "Claire Wilson", capacity: 35, registered: 35, waitlist: 4 },
  { id: "cl3", time: "09:00", type: "Power Flow (Hot)", coach: "Bree Kowalski", capacity: 35, registered: 27, waitlist: 0 },
  { id: "cl4", time: "12:00", type: "Slow + Strong", coach: "Amanda Torres", capacity: 30, registered: 16, waitlist: 0 },
  { id: "cl5", time: "16:00", type: "Power Flow (Hot)", coach: "Ashley Severinsen", capacity: 35, registered: 33, waitlist: 0 },
  { id: "cl6", time: "17:15", type: "Sculpt (Hot)", coach: "Bree Kowalski", capacity: 30, registered: 30, waitlist: 3 },
  { id: "cl7", time: "19:00", type: "Restore / Yoga Nidra", coach: "Chris Reeves", capacity: 25, registered: 19, waitlist: 0 },
];

const WEEKLY_SCHEDULE = [
  { day: "Monday", classes: [{ time: "05:45", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "07:00", type: "26/2 Series (Hot)", coach: "Claire" }, { time: "09:00", type: "Power Flow (Hot)", coach: "Bree" }, { time: "12:00", type: "Slow + Strong", coach: "Amanda" }, { time: "16:00", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "17:15", type: "Sculpt (Hot)", coach: "Bree" }, { time: "19:00", type: "Restore", coach: "Chris" }] },
  { day: "Tuesday", classes: [{ time: "05:45", type: "26/2 Series (Hot)", coach: "Claire" }, { time: "07:00", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "09:00", type: "Slow Flow", coach: "Amanda" }, { time: "12:00", type: "Power Flow (Hot)", coach: "Bree" }, { time: "16:00", type: "Power + Restore", coach: "Ashley" }, { time: "17:15", type: "Power Flow (Hot)", coach: "Jared" }] },
  { day: "Wednesday", classes: [{ time: "05:45", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "07:00", type: "26/2 Series (Hot)", coach: "Claire" }, { time: "09:00", type: "Power Flow (Hot)", coach: "Amanda" }, { time: "12:00", type: "Slow + Strong", coach: "Chris" }, { time: "16:00", type: "Power Flow (Hot)", coach: "Bree" }, { time: "17:15", type: "Breathwork", coach: "Amanda" }] },
  { day: "Thursday", classes: [{ time: "05:45", type: "26/2 Series (Hot)", coach: "Claire" }, { time: "07:00", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "09:00", type: "Sculpt (Hot)", coach: "Bree" }, { time: "12:00", type: "Power Flow (Hot)", coach: "Jared" }, { time: "16:00", type: "Slow Flow", coach: "Amanda" }, { time: "17:15", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "19:00", type: "Yoga Nidra", coach: "Chris" }] },
  { day: "Friday", classes: [{ time: "05:45", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "07:00", type: "26/2 Series (Hot)", coach: "Claire" }, { time: "09:00", type: "Power Flow (Hot)", coach: "Bree" }, { time: "12:00", type: "Slow + Strong", coach: "Amanda" }, { time: "16:00", type: "Power + Restore", coach: "Ashley" }, { time: "19:00", type: "Sound Bath", coach: "Claire" }] },
  { day: "Saturday", classes: [{ time: "07:00", type: "Power Flow (Hot)", coach: "Ashley" }, { time: "09:00", type: "26/2 Series (Hot)", coach: "Claire" }, { time: "10:30", type: "Sculpt (Hot)", coach: "Bree" }, { time: "12:00", type: "Restore", coach: "Chris" }] },
  { day: "Sunday", classes: [{ time: "08:00", type: "Power Flow (Hot)", coach: "Amanda" }, { time: "09:30", type: "Slow Flow", coach: "Claire" }, { time: "17:00", type: "Breathwork", coach: "Amanda" }] },
];

const COMMUNITY_FEED = [
  { id: "cf1", user: "Kelsey M.", milestone: "100 Classes", message: "Triple digits! This studio and community has changed everything for me. Grateful.", date: today, celebrations: 28 },
  { id: "cf2", user: "Ryan T.", milestone: "30-Day Streak", message: "30 days on the mat. More present, more patient, more alive. Thank you Ashley and team.", date: today, celebrations: 22 },
  { id: "cf3", user: "Jen S.", milestone: "First Crow Pose!", message: "Finally held crow for 5 full breaths! Jared's inversions workshop gave me the confidence.", date: offsetDate(-1), celebrations: 35 },
  { id: "cf4", user: "Marcus B.", milestone: "1 Year Member", message: "One year at CDA Power Yoga. Came for the workout, stayed for the community.", date: offsetDate(-1), celebrations: 47 },
];

const MILESTONE_BADGES = {
  "First Class": { icon: Leaf, color: T.accent },
  "10 Classes": { icon: Wind, color: T.accent },
  "50 Classes": { icon: Mountain, color: T.accent },
  "100 Classes": { icon: Sun, color: T.success },
  "7-Day Streak": { icon: Flame, color: T.warning },
  "30-Day Streak": { icon: Sparkles, color: T.warning },
  "First Inversion": { icon: ArrowUpRight, color: "#7a8a6a" },
  "Crow Pose": { icon: Star, color: "#8a7a60" },
  "1 Year Member": { icon: Award, color: T.success },
};

const EVENTS = [
  { id: "ev1", name: "Handstands & Inversions Workshop", date: "2026-04-18", startTime: "13:00", type: "Workshop", description: "Join Jared & Mike for a fun, supportive exploration of handstands and the fundamentals of inversions. All-levels — just bring a willingness to try, play, and discover what you're capable of.", fee: 25, maxParticipants: 30, registered: 22, status: "Registration Open", image: STUDIO_IMAGES.eventAcroYoga },
  { id: "ev2", name: "Breathwork + Sound Healing Journey", date: "2026-05-08", startTime: "19:00", type: "Special Event", description: "Join Ashley and Claire for a transformative experience combining breathwork and sound healing to guide you into deep relaxation and self-discovery.", fee: 35, maxParticipants: 25, registered: 17, status: "Registration Open", image: STUDIO_IMAGES.eventBreathwork },
  { id: "ev3", name: "Back to Basics: Foundation & Alignment", date: "2026-05-16", startTime: "10:00", type: "Workshop", description: "Join Ashley for individual instruction regarding foundation and alignment specific for your body. Learn about core poses like downdog, warriors, and balance postures.", fee: 45, maxParticipants: 20, registered: 12, status: "Registration Open", image: STUDIO_IMAGES.heroClasses },
  { id: "ev4", name: "First of the Month: Power + Restore", date: offsetDate(5), startTime: "09:00", type: "Monthly Practice", description: "A 90-minute disciplined practice to set intentions and tone for the month ahead. Start with an all-levels heated Power Flow, then end with deeply restorative poses.", fee: 25, maxParticipants: 35, registered: 24, status: "Open", image: STUDIO_IMAGES.heroPractice },
];

const MEMBERSHIP_TIERS = [
  { id: "m1", name: "Intro Offer", type: "intro", price: 59, period: "3 weeks", features: ["Unlimited classes for 3 weeks", "Try all class styles", "Meet the teaching team", "New students only"], popular: false },
  { id: "m2", name: "Drop-In", type: "drop-in", price: 30, period: "per class", features: ["1 class credit", "No commitment", "Share with a friend"], popular: false },
  { id: "m3", name: "10 Class Pack", type: "pack", price: 240, period: "10 classes", features: ["10 class credits", "Valid for 1 year", "Share with a friend", "Great for regular practice"], popular: false },
  { id: "m4", name: "20 Class Pack", type: "pack", price: 460, period: "20 classes", features: ["20 class credits", "Valid for 1 year", "Share with a friend", "Best per-class value on packs"], popular: false },
  { id: "m5", name: "Unlimited Monthly", type: "unlimited", price: 170, period: "/month autopay", monthToMonth: 175, features: ["Unlimited classes", "Member perks & discounts", "10% off workshops", "2 guest passes/month", "Cancel with 7 days notice"], popular: true },
  { id: "m6", name: "Unlimited Annual", type: "annual", price: 1560, period: "/year", features: ["Unlimited classes all year", "All member perks", "10% off workshops", "2 guest passes/month", "Best overall value — save $480+"], popular: false },
];

const ANNOUNCEMENTS = [
  { id: "a1", title: "Empower Teacher Training 2026!", message: "Transform how you relate to the world. Whether you want to deepen your practice, gain leadership tools, or become a yoga teacher — join us.", type: "celebration", pinned: true, image: STUDIO_IMAGES.trainingGroup },
  { id: "a2", title: "First Responders & Veterans: $100/mo", message: "We offer unlimited classes to first responders, veterans, and school teachers for $100/month. Thank you for your service!", type: "info", pinned: false },
];

const MEMBERS_DATA = [
  { id: "mem1", name: "Kelsey Morgan", email: "kelsey@email.com", membership: "Unlimited Monthly", status: "active", joined: "2023-03-10", checkIns: 312, lastVisit: today },
  { id: "mem2", name: "Ryan Torres", email: "ryan@email.com", membership: "Unlimited Monthly", status: "active", joined: "2022-08-01", checkIns: 456, lastVisit: offsetDate(-1) },
  { id: "mem3", name: "Jen Schultz", email: "jen@email.com", membership: "10 Class Pack", status: "active", joined: "2025-10-15", checkIns: 34, lastVisit: offsetDate(-2) },
  { id: "mem4", name: "Marcus Bell", email: "marcus@email.com", membership: "Unlimited Annual", status: "active", joined: "2025-03-24", checkIns: 178, lastVisit: today },
  { id: "mem5", name: "Sarah Kim", email: "sarah@email.com", membership: "Unlimited Monthly", status: "frozen", joined: "2024-07-01", checkIns: 112, lastVisit: offsetDate(-28) },
  { id: "mem6", name: "Tom Nguyen", email: "tom@email.com", membership: "20 Class Pack", status: "active", joined: "2026-01-05", checkIns: 8, lastVisit: offsetDate(-4) },
  { id: "mem7", name: "Emily Park", email: "emily@email.com", membership: "Unlimited Monthly", status: "active", joined: "2023-06-01", checkIns: 267, lastVisit: today },
  { id: "mem8", name: "Dave Larson", email: "dave@email.com", membership: "Unlimited Annual", status: "active", joined: "2024-02-14", checkIns: 398, lastVisit: offsetDate(-1) },
];

const ADMIN_METRICS = {
  activeMembers: 187, memberChange: 14,
  todayCheckIns: 68, weekCheckIns: 421,
  monthlyRevenue: 28650, revenueChange: 11.2,
  workshopRevenue: 3100,
};

const ADMIN_CHARTS = {
  attendance: [
    { day: "Mon", total: 76, avg: 13 }, { day: "Tue", total: 64, avg: 11 },
    { day: "Wed", total: 72, avg: 12 }, { day: "Thu", total: 78, avg: 13 },
    { day: "Fri", total: 68, avg: 11 }, { day: "Sat", total: 84, avg: 21 },
    { day: "Sun", total: 38, avg: 13 },
  ],
  revenue: [
    { month: "Sep", revenue: 23200 }, { month: "Oct", revenue: 24800 },
    { month: "Nov", revenue: 25600 }, { month: "Dec", revenue: 24100 },
    { month: "Jan", revenue: 26800 }, { month: "Feb", revenue: 27400 },
    { month: "Mar", revenue: 28650 },
  ],
  classPopularity: [
    { name: "5:45 AM", pct: 90 }, { name: "7:00 AM", pct: 98 },
    { name: "9:00 AM", pct: 78 }, { name: "12:00 PM", pct: 54 },
    { name: "4:00 PM", pct: 94 }, { name: "5:15 PM", pct: 96 },
    { name: "7:00 PM", pct: 76 },
  ],
  membershipBreakdown: [
    { name: "Unlimited Monthly", value: 98, color: T.accent },
    { name: "Unlimited Annual", value: 36, color: T.success },
    { name: "Class Packs", value: 34, color: T.warning },
    { name: "Drop-In / Intro", value: 19, color: T.textMuted },
  ],
};

// ═══════════════════════════════════════════════════════════════
//  APP CONTEXT
// ═══════════════════════════════════════════════════════════════
const AppContext = createContext(null);

// ═══════════════════════════════════════════════════════════════
//  CONSUMER PAGES
// ═══════════════════════════════════════════════════════════════

function HomePage() {
  const { classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed } = useContext(AppContext);
  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
  const upcoming = CLASSES_TODAY.filter(c => c.time >= currentTime).slice(0, 4);

  return (
    <div className="pb-6">
      {/* Hero */}
      <section style={{ background: `linear-gradient(165deg, ${T.bg} 0%, hsl(138,14%,28%) 100%)`, color: "#fff", padding: "48px 22px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${STUDIO_IMAGES.heroHome})`, backgroundSize: "cover", backgroundPosition: "center top", opacity: 0.75 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36,44,38,0.5) 0%, rgba(36,44,38,0.3) 50%, rgba(36,44,38,0.55) 100%)" }} />
        <div style={{ position: "absolute", bottom: -30, right: -20, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${hsl(STUDIO_CONFIG.theme.accent, 0.08)}, transparent 70%)` }} />
        <div style={{ position: "relative" }}>
          <p style={{ color: T.success, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>
            {formatDateLong(today)}
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 52, lineHeight: 0.95, letterSpacing: "-0.02em", margin: 0, fontWeight: 400, color: "#fff" }}>
            {STUDIO_CONFIG.heroLine1}<br/>
            <span style={{ color: T.success, fontStyle: "italic" }}>{STUDIO_CONFIG.heroLine2}</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, maxWidth: 280, marginTop: 10, lineHeight: 1.5 }}>{STUDIO_CONFIG.description}</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: "0 16px", marginTop: -16, position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { icon: Calendar, label: "Reserve", page: "schedule", color: T.accent },
            { icon: Flame, label: "Practice", page: "practice", color: T.success },
            { icon: Heart, label: "Community", page: "community", color: T.warning },
            { icon: Users, label: "Teachers", page: "teachers", color: T.textMuted },
          ].map(a => (
            <QuickAction key={a.label} {...a} />
          ))}
        </div>
      </section>

      {/* Today's Practice Focus */}
      <section style={{ padding: "0 16px", marginTop: 24 }}>
        <SectionHeader title="Today's Practice" linkText="All Classes" linkPage="classes" />
        <PracticeCardFull practice={TODAYS_FOCUS} variant="featured" />
      </section>

      {/* Upcoming Classes */}
      <section style={{ padding: "0 16px", marginTop: 28 }}>
        <SectionHeader title="Upcoming Classes" linkText="Full Schedule" linkPage="schedule" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {upcoming.length > 0 ? upcoming.map(c => {
            const regs = (classRegistrations[c.id] || 0);
            const totalReg = c.registered + regs;
            const isFull = totalReg >= c.capacity;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
                <div style={{ textAlign: "center", minWidth: 44 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, color: T.text, fontWeight: 600 }}>{fmtTime(c.time).split(":")[0]}</span>
                  <span style={{ display: "block", fontSize: 11, color: T.textMuted }}>{fmtTime(c.time).slice(-5)}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: T.text, fontSize: 14, margin: 0 }}>{c.type}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{c.coach.split(" ")[0]}</p>
                </div>
                <div style={{ textAlign: "right", marginRight: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: isFull ? T.warning : totalReg >= c.capacity * 0.8 ? T.success : T.accent }}>{totalReg}/{c.capacity}</span>
                  {c.waitlist > 0 && <span style={{ display: "block", fontSize: 11, color: T.textFaint }}>+{c.waitlist} waitlist</span>}
                </div>
                <button onClick={() => openReservation({ ...c, date: today })} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: isFull ? T.bgDim : T.accent, color: isFull ? T.textMuted : "#fff", transition: "all 0.15s" }}>
                  {isFull ? "Waitlist" : "Reserve"}
                </button>
              </div>
            );
          }) : (
            <EmptyState icon={Moon} message="No more classes today" sub="See tomorrow's schedule" />
          )}
        </div>
      </section>

      {/* Community Feed */}
      {STUDIO_CONFIG.features.communityFeed && (
        <section style={{ padding: "0 16px", marginTop: 28 }}>
          <SectionHeader title="Community" linkText="View All" linkPage="community" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {COMMUNITY_FEED.slice(0, 3).map(item => {
              const myC = feedCelebrations[item.id] || 0;
              return (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: `linear-gradient(135deg, ${T.successGhost}, transparent)`, border: `1px solid ${T.successBorder}`, borderRadius: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.success, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Sparkles size={18} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>
                      {item.user} <span style={{ color: T.success }}>{item.milestone}</span>
                    </p>
                    <p style={{ fontSize: 12, color: "#6b7268", margin: "2px 0 0", lineHeight: 1.4 }}>
                      {item.message.length > 60 ? item.message.slice(0, 60) + "…" : item.message}
                    </p>
                  </div>
                  <button onClick={() => celebrateFeed(item.id)} style={{ padding: 8, borderRadius: 8, border: "none", background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, transition: "all 0.15s" }}>
                    <Heart size={18} color={T.success} fill={myC > 0 ? T.success : "none"} />
                    <span style={{ fontSize: 12, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Announcements */}
      {ANNOUNCEMENTS.length > 0 && (
        <section style={{ padding: "0 16px", marginTop: 28 }}>
          <SectionHeader title="Announcements" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ANNOUNCEMENTS.map(a => (
              <div key={a.id} style={{ borderRadius: 12, borderLeft: `4px solid ${a.type === "celebration" ? T.accent : a.type === "alert" ? T.warning : T.textMuted}`, background: a.type === "celebration" ? T.accentGhost : a.type === "alert" ? T.warningGhost : T.bgDim, overflow: "hidden" }}>
                {a.image && <img src={a.image} alt="" loading="lazy" style={{ width: "100%", height: 100, objectFit: "cover" }} />}
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: 0 }}>{a.title}</h3>
                      <p style={{ fontSize: 13, color: "#6b7268", margin: "4px 0 0" }}>{a.message}</p>
                    </div>
                    {a.pinned && <span style={{ fontSize: 11, fontWeight: 600, color: T.accent, background: T.accentGhost, padding: "2px 8px", borderRadius: 99 }}>Pinned</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ padding: "0 16px", marginTop: 28 }}>
        <CTACard />
      </section>
    </div>
  );
}

// ——— CLASSES PAGE ———
function ClassesPage() {
  const [expandedPractice, setExpandedPractice] = useState(null);
  const allPractices = [TODAYS_FOCUS, ...PAST_PRACTICES, UPCOMING_PRACTICE].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroClasses} title="Classes" subtitle="Past, present, and upcoming practice" />
      <div style={{ padding: "16px 16px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {allPractices.map(p => (
          <PracticeCardFull key={p.id} practice={p} expanded={expandedPractice === p.id} onToggle={() => setExpandedPractice(expandedPractice === p.id ? null : p.id)} />
        ))}
      </div>
      </div>
    </div>
  );
}

// ——— SCHEDULE PAGE ———
function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const { classRegistrations, registerForClass, openReservation } = useContext(AppContext);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroSchedule} title="Schedule" subtitle="Reserve your spot — classes fill up fast" />
      <div style={{ padding: "16px 16px 0" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        {days.map((d, i) => (
          <button key={d} onClick={() => setSelectedDay(i)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", background: selectedDay === i ? T.accent : T.bgDim, color: selectedDay === i ? "#fff" : T.textMuted, transition: "all 0.15s" }}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {WEEKLY_SCHEDULE[selectedDay]?.classes.map((cls, i) => {
          const isSpecial = cls.type.includes("Nidra") || cls.type.includes("Sound") || cls.type.includes("Breathwork") || cls.type.includes("Restore");
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
              <div style={{ textAlign: "center", minWidth: 56 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: T.text, fontWeight: 600 }}>{fmtTime(cls.time)}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: 0 }}>{cls.type}</p>
                  {isSpecial && <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "1px 6px", borderRadius: 4, background: T.warningGhost, color: T.warning }}>Special</span>}
                </div>
                {cls.coach && <p style={{ fontSize: 12, color: T.textMuted, margin: "3px 0 0" }}>{cls.coach}</p>}
              </div>
              <button onClick={() => openReservation({ id: `sched-${selectedDay}-${i}`, time: cls.time, type: cls.type, coach: cls.coach || "TBD", capacity: isSpecial ? STUDIO_CONFIG.specialtyCapacity : STUDIO_CONFIG.classCapacity, registered: Math.floor((isSpecial ? STUDIO_CONFIG.specialtyCapacity : STUDIO_CONFIG.classCapacity) * 0.65), waitlist: 0, dayLabel: dayNames[selectedDay] })} style={{ padding: "8px 16px", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: T.accent, color: "#fff" }}>
                Reserve
              </button>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

// ——— PRACTICE TRACKING PAGE ———
function PracticePage() {
  const [activeTab, setActiveTab] = useState("log");
  const [reflection, setReflection] = useState({ energy: 4, focus: 4, notes: "" });
  const [saved, setSaved] = useState(null);

  const handleSave = () => {
    setSaved("log");
    setTimeout(() => setSaved(null), 2000);
    setReflection({ energy: 4, focus: 4, notes: "" });
  };

  const streakDays = 14;
  const totalClasses = 92;

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroPractice} title="My Practice" subtitle="Track your journey and celebrate growth" />
      <div style={{ padding: "16px 16px 0" }}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        <div style={{ background: T.accentGhost, border: `1px solid ${T.accentBorder}`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
          <Flame size={20} color={T.accent} style={{ margin: "0 auto 4px" }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: T.text }}>{streakDays}</div>
          <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Day Streak</div>
        </div>
        <div style={{ background: T.successGhost, border: `1px solid ${T.successBorder}`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
          <Star size={20} color={T.success} style={{ margin: "0 auto 4px" }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: T.text }}>{totalClasses}</div>
          <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Classes</div>
        </div>
        <div style={{ background: T.warningGhost, border: `1px solid ${T.warningBorder}`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
          <Mountain size={20} color={T.warning} style={{ margin: "0 auto 4px" }} />
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: T.text }}>7</div>
          <div style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Milestones</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 20, background: T.bgDim, borderRadius: 10, padding: 4 }}>
        {[{ id: "log", label: "Reflection" }, { id: "milestones", label: "Milestones" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, padding: "10px 0", borderRadius: 8, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: activeTab === tab.id ? T.bgCard : "transparent", color: activeTab === tab.id ? T.text : T.textMuted, boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,.06)" : "none", transition: "all 0.15s" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "log" && (
        <div style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Leaf size={18} color={T.accent} />
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Post-Practice Reflection</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Energy Level</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setReflection({...reflection, energy: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.energy >= n ? T.accent : T.border}`, background: reflection.energy >= n ? T.accentGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {n <= 2 ? <Moon size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : n <= 4 ? <Sun size={18} color={reflection.energy >= n ? T.accent : T.textFaint} /> : <Sparkles size={18} color={reflection.energy >= n ? T.accent : T.textFaint} />}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Focus & Presence</label>
              <div style={{ display: "flex", gap: 6 }}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setReflection({...reflection, focus: n})} style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${reflection.focus >= n ? T.success : T.border}`, background: reflection.focus >= n ? T.successGhost : "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {n <= 2 ? <Wind size={18} color={reflection.focus >= n ? T.success : T.textFaint} /> : n <= 4 ? <Heart size={18} color={reflection.focus >= n ? T.success : T.textFaint} /> : <Sparkles size={18} color={reflection.focus >= n ? T.success : T.textFaint} />}
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Notes / Gratitude" value={reflection.notes} onChange={v => setReflection({...reflection, notes: v})} placeholder="What came up for you on the mat today?" multiline />
            <button onClick={handleSave} style={{ padding: "12px 0", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer", background: T.accent, color: "#fff", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em", fontSize: 17 }}>
              {saved === "log" ? <><Check size={16} style={{ display: "inline", verticalAlign: "middle" }} /> Saved</> : "Save Reflection"}
            </button>
          </div>
        </div>
      )}

      {activeTab === "milestones" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {Object.entries(MILESTONE_BADGES).map(([name, badge]) => {
            const earned = ["First Class", "10 Classes", "50 Classes", "7-Day Streak", "First Inversion", "Crow Pose", "1 Year Member"].includes(name);
            const IconComp = badge.icon;
            return (
              <div key={name} style={{ background: earned ? T.bgCard : T.bgDim, border: `1px solid ${earned ? T.border : T.borderLight}`, borderRadius: 12, padding: "16px 12px", textAlign: "center", opacity: earned ? 1 : 0.45 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: earned ? `${badge.color}18` : T.bgDim, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                  <IconComp size={24} color={earned ? badge.color : T.textFaint} />
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: T.text, margin: "0 0 2px" }}>{name}</p>
                <p style={{ fontSize: 11, color: T.textMuted, margin: 0 }}>{earned ? "Earned ✓" : "Keep going!"}</p>
              </div>
            );
          })}
        </div>
      )}
      </div>
    </div>
  );
}

// ——— COMMUNITY PAGE ———
function CommunityPage() {
  const { feedCelebrations, celebrateFeed } = useContext(AppContext);

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroCommunity} title="Community" subtitle="Celebrate milestones and cheer each other on" />
      <div style={{ padding: "16px 16px 0" }}>

      {/* Community Photos */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        <img src={STUDIO_IMAGES.communityBenefit1} alt="CDA Power Yoga community" loading="lazy" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12 }} />
        <img src={STUDIO_IMAGES.communityBenefit2} alt="CDA Power Yoga community" loading="lazy" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 12 }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {COMMUNITY_FEED.map(item => {
          const myC = feedCelebrations[item.id] || 0;
          return (
            <div key={item.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                  {item.user[0]}
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: T.text }}>{item.user}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "1px 0 0" }}>{formatDateShort(item.date)}</p>
                </div>
                <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: T.successGhost, color: T.success }}>{item.milestone}</span>
              </div>
              <p style={{ fontSize: 14, color: "#4a5248", lineHeight: 1.5, margin: "0 0 12px" }}>{item.message}</p>
              <button onClick={() => celebrateFeed(item.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, border: `1px solid ${myC > 0 ? T.successBorder : T.border}`, background: myC > 0 ? T.successGhost : "transparent", cursor: "pointer" }}>
                <Heart size={16} color={T.success} fill={myC > 0 ? T.success : "none"} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.success }}>{item.celebrations + myC}</span>
              </button>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

// ——— TEACHERS PAGE ———
function TeachersPage() {
  const [expandedTeacher, setExpandedTeacher] = useState(null);

  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroTeachers} title="Teachers" subtitle="Meet the CDA Power Yoga team" />
      <div style={{ padding: "16px 16px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {TEACHERS.map(teacher => {
          const expanded = expandedTeacher === teacher.id;
          return (
            <div key={teacher.id} onClick={() => setExpandedTeacher(expanded ? null : teacher.id)} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px" }}>
                {teacher.photo ? (
                  <img src={teacher.photo} alt={teacher.firstName} loading="lazy" onError={e => { e.target.style.display = "none"; if (e.target.nextSibling) e.target.nextSibling.style.display = "flex"; }} style={{ width: 56, height: 56, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
                ) : null}
                <div style={{ width: 56, height: 56, borderRadius: 14, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: teacher.photo ? "none" : "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#fff", flexShrink: 0, fontWeight: 600 }}>
                  {teacher.firstName[0]}{teacher.lastName[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: T.text }}>
                    {teacher.firstName} {teacher.lastName}
                  </h3>
                  <p style={{ fontSize: 13, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{teacher.role}</p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>{teacher.yearsTeaching} years teaching</p>
                </div>
                <ChevronDown size={18} color={T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </div>
              {expanded && (
                <div style={{ padding: "0 18px 18px", borderTop: `1px solid ${T.borderLight}`, paddingTop: 14 }}>
                  <p style={{ fontSize: 13, color: "#5a6258", lineHeight: 1.6, margin: "0 0 12px" }}>{teacher.bio}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {teacher.specialties.map(s => (
                      <span key={s} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.accentGhost, color: T.accent }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {teacher.certs.map(c => (
                      <span key={c} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: T.bgDim, color: T.textMuted }}>{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

// ——— MEMBERSHIP PAGE ———
function MembershipPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroMembership} title="Membership" subtitle="Find your path to practice" />
      <div style={{ padding: "16px 16px 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: T.bgCard, border: `1px solid ${tier.popular ? T.accent : T.border}`, borderRadius: 14, padding: "20px 18px", position: "relative", overflow: "hidden" }}>
            {tier.popular && (
              <div style={{ position: "absolute", top: 12, right: -28, background: T.accent, color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 32px", transform: "rotate(45deg)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Popular
              </div>
            )}
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: "0 0 4px", color: T.text }}>{tier.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 12 }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, color: T.accent, fontWeight: 700 }}>${tier.price}</span>
              <span style={{ fontSize: 13, color: T.textMuted }}>{tier.period}</span>
            </div>
            {tier.monthToMonth && (
              <p style={{ fontSize: 12, color: T.success, fontWeight: 600, marginBottom: 12 }}>
                Month-to-month: ${tier.monthToMonth}/mo (no contract)
              </p>
            )}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 16px" }}>
              {tier.features.map((f, i) => (
                <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", fontSize: 13, color: "#5a6258" }}>
                  <CircleCheck size={14} color={T.accent} style={{ flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em", background: tier.popular ? T.accent : T.bg, color: "#fff" }}>
              Get Started
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

// ——— EVENTS PAGE ———
function EventsPage() {
  return (
    <div>
      <PageHero image={STUDIO_IMAGES.heroEvents} title="Events" subtitle="Workshops, trainings, and special offerings" />
      <div style={{ padding: "16px 16px 0" }}>
      {EVENTS.map(ev => (
        <div key={ev.id} style={{ background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 14, overflow: "hidden", marginBottom: 16 }}>
          <div style={{ background: `linear-gradient(135deg, ${T.bg}, hsl(138,14%,28%))`, padding: "20px 18px", color: "#fff", position: "relative", overflow: "hidden" }}>
            {ev.image && <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${ev.image})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.18 }} />}
            <div style={{ position: "relative" }}>
              <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: T.accent }}>{ev.type}</span>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: "6px 0 4px", fontWeight: 600 }}>{ev.name}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 13, color: "#9aaa9e" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar size={14} /> {formatDateShort(ev.date)}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={14} /> {fmtTime(ev.startTime)}</span>
              </div>
            </div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 13, color: "#5a6258", lineHeight: 1.6, margin: "0 0 14px" }}>{ev.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              <StatBox label="Price" value={`$${ev.fee}`} />
              <StatBox label="Spots" value={`${ev.registered}/${ev.maxParticipants}`} />
            </div>
            <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: "none", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.03em", background: T.accent, color: "#fff" }}>
              Register Now
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN PAGES
// ═══════════════════════════════════════════════════════════════

function AdminDashboard() {
  const metrics = [
    { label: "Active Members", value: ADMIN_METRICS.activeMembers, change: `+${ADMIN_METRICS.memberChange}`, positive: true, icon: Users, color: T.accent },
    { label: "Today's Check-ins", value: ADMIN_METRICS.todayCheckIns, change: `${ADMIN_METRICS.weekCheckIns} this week`, positive: true, icon: Calendar, color: T.success },
    { label: "Monthly Revenue", value: `$${ADMIN_METRICS.monthlyRevenue.toLocaleString()}`, change: `+${ADMIN_METRICS.revenueChange}%`, positive: true, icon: DollarSign, color: T.warning },
    { label: "Workshop Revenue", value: `$${ADMIN_METRICS.workshopRevenue.toLocaleString()}`, change: "+8 registrations", positive: true, icon: Award, color: "#7a8a6a" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Dashboard</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", margin: "4px 0 0" }}>Welcome back. Here's what's happening at {STUDIO_CONFIG.name}.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        {metrics.map((m, i) => (
          <div key={i} style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${m.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <m.icon size={18} color={m.color} />
              </div>
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, color: "#fff", fontWeight: 700 }}>{m.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <span style={{ display: "flex", alignItems: "center", fontSize: 12, fontWeight: 600, color: m.positive ? "#4ade80" : "#f87171" }}>
                {m.positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {m.change}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#9ca3af", margin: "6px 0 0" }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <AdminCard title="Weekly Attendance">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ADMIN_CHARTS.attendance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4a3e" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#252d27", border: "1px solid #2a3050", borderRadius: 8, color: "#fff" }} />
                <Bar dataKey="total" fill={T.accent} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
        <AdminCard title="Revenue Trend">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_CHARTS.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#3a4a3e" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={v => `$${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#252d27", border: "1px solid #2a3050", borderRadius: 8, color: "#fff" }} formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={T.accent} stopOpacity={0.3} />
                    <stop offset="100%" stopColor={T.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="revenue" stroke={T.accent} fill="url(#revGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </AdminCard>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <AdminCard title="Membership Breakdown">
          <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={ADMIN_CHARTS.membershipBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {ADMIN_CHARTS.membershipBreakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#252d27", border: "1px solid #2a3050", borderRadius: 8, color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {ADMIN_CHARTS.membershipBreakdown.map((entry, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: entry.color }} />
                <span style={{ fontSize: 11, color: "#9ca3af" }}>{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="Class Time Popularity">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {ADMIN_CHARTS.classPopularity.map((slot, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: "#9ca3af", minWidth: 60, textAlign: "right", fontFamily: "monospace" }}>{slot.name}</span>
                <div style={{ flex: 1, background: "#3a4a3e", borderRadius: 4, height: 16, overflow: "hidden" }}>
                  <div style={{ width: `${slot.pct}%`, height: "100%", borderRadius: 4, background: slot.pct > 90 ? T.warning : slot.pct > 75 ? T.success : T.accent, transition: "width 0.5s" }} />
                </div>
                <span style={{ fontSize: 12, color: "#d1d5db", fontWeight: 600, minWidth: 32 }}>{slot.pct}%</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}

function AdminMembersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = MEMBERS_DATA.filter(m => {
    if (filter !== "all" && m.status !== filter) return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Members</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          <UserPlus size={16} /> Add Member
        </button>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#6b7280" }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members..." style={{ width: "100%", padding: "10px 12px 10px 36px", background: "#252d27", border: "1px solid #2a3050", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {["all", "active", "frozen"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "8px 14px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: filter === f ? T.accent : "#252d27", color: filter === f ? "#fff" : "#9ca3af" }}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a3050" }}>
              {["Member", "Membership", "Status", "Classes", "Last Visit"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#9ca3af", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id} style={{ borderBottom: "1px solid #2a3050" }}>
                <td style={{ padding: "12px 16px" }}>
                  <p style={{ color: "#fff", fontWeight: 600, margin: 0 }}>{m.name}</p>
                  <p style={{ color: "#6b7280", fontSize: 12, margin: "2px 0 0" }}>{m.email}</p>
                </td>
                <td style={{ padding: "12px 16px", color: "#d1d5db" }}>{m.membership}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, textTransform: "capitalize", background: m.status === "active" ? `${T.accent}20` : `${T.warning}20`, color: m.status === "active" ? T.accent : T.warning }}>
                    {m.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: "#d1d5db", fontFamily: "monospace" }}>{m.checkIns}</td>
                <td style={{ padding: "12px 16px", color: "#9ca3af", fontSize: 12 }}>{formatDateShort(m.lastVisit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminSchedulePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Schedule Management</h1>
      <div style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #2a3050" }}>
              {["Time", "Class", "Teacher", "Capacity", "Registered", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#9ca3af", fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CLASSES_TODAY.map(c => (
              <tr key={c.id} style={{ borderBottom: "1px solid #2a3050" }}>
                <td style={{ padding: "12px 16px", color: "#fff", fontFamily: "monospace" }}>{fmtTime(c.time)}</td>
                <td style={{ padding: "12px 16px", color: "#d1d5db", fontWeight: 600 }}>{c.type}</td>
                <td style={{ padding: "12px 16px", color: "#d1d5db" }}>{c.coach}</td>
                <td style={{ padding: "12px 16px", color: "#9ca3af" }}>{c.capacity}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ fontFamily: "monospace", fontWeight: 600, color: c.registered >= c.capacity ? T.warning : T.accent }}>{c.registered}/{c.capacity}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, background: c.registered >= c.capacity ? `${T.warning}20` : `${T.accent}20`, color: c.registered >= c.capacity ? T.warning : T.accent }}>
                    {c.registered >= c.capacity ? "Full" : "Open"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminTeachersPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Teachers</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          <UserPlus size={16} /> Add Teacher
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
        {TEACHERS.map(teacher => (
          <div key={teacher.id} style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              {teacher.photo ? (
                <img src={teacher.photo} alt={teacher.firstName} onError={e => { e.target.style.display = "none"; if (e.target.nextSibling) e.target.nextSibling.style.display = "flex"; }} style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} />
              ) : null}
              <div style={{ width: 48, height: 48, borderRadius: 10, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: teacher.photo ? "none" : "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#fff", fontWeight: 600 }}>
                {teacher.firstName[0]}{teacher.lastName[0]}
              </div>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: 0 }}>{teacher.firstName} {teacher.lastName}</h3>
                <p style={{ fontSize: 12, color: T.accent, fontWeight: 600, margin: "2px 0 0" }}>{teacher.role}</p>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
              {teacher.certs.map(c => (
                <span key={c} style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "#3a4a3e", color: "#9ca3af" }}>{c}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #2a3050", background: "transparent", color: "#d1d5db", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
              <button style={{ flex: 1, padding: "8px 0", borderRadius: 6, border: "1px solid #2a3050", background: "transparent", color: "#d1d5db", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminEventsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Events & Workshops</h1>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          <Plus size={16} /> New Event
        </button>
      </div>
      {EVENTS.map(ev => (
        <div key={ev.id} style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${T.accent}20`, color: T.accent }}>{ev.status}</span>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: "8px 0 4px" }}>{ev.name}</h3>
              <p style={{ fontSize: 13, color: "#9ca3af" }}>{formatDateShort(ev.date)} · {ev.type} · ${ev.fee}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: T.accent, fontWeight: 700 }}>{ev.registered}</div>
              <p style={{ fontSize: 11, color: "#9ca3af" }}>of {ev.maxParticipants} spots</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPricingPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Pricing & Memberships</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
        {MEMBERSHIP_TIERS.map(tier => (
          <div key={tier.id} style={{ background: "#252d27", border: `1px solid ${tier.popular ? T.accent : "#3a4a3e"}`, borderRadius: 12, padding: 18 }}>
            {tier.popular && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: T.accentGhost, color: T.accent, marginBottom: 8, display: "inline-block" }}>MOST POPULAR</span>}
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "#fff", margin: "0 0 4px" }}>{tier.name}</h3>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 34, color: T.accent, fontWeight: 700 }}>${tier.price}<span style={{ fontSize: 14, color: "#9ca3af", fontWeight: 400 }}> {tier.period}</span></div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "8px 0" }}>{tier.features.length} features</p>
            <button style={{ width: "100%", padding: "8px 0", borderRadius: 6, border: "1px solid #2a3050", background: "transparent", color: "#d1d5db", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit Tier</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBroadcastPage() {
  const [message, setMessage] = useState("");
  const [audience, setAudience] = useState("all");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: "#fff", margin: 0 }}>Broadcast & Notifications</h1>
      <div style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, padding: 18 }}>
        <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>New Broadcast</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input placeholder="Title" style={{ padding: "10px 14px", background: "#1e2620", border: "1px solid #2a3050", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none" }} />
          <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Message..." rows={4} style={{ padding: "10px 14px", background: "#1e2620", border: "1px solid #2a3050", borderRadius: 8, color: "#fff", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
          <div style={{ display: "flex", gap: 6 }}>
            {["all", "members", "class packs", "teachers"].map(a => (
              <button key={a} onClick={() => setAudience(a)} style={{ padding: "6px 12px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize", background: audience === a ? T.accent : "#3a4a3e", color: audience === a ? "#fff" : "#9ca3af" }}>{a}</button>
            ))}
          </div>
          <button style={{ padding: "10px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Send size={16} /> Send Broadcast
          </button>
        </div>
      </div>
      <div>
        <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>Sent Broadcasts</h3>
        {ANNOUNCEMENTS.map(a => (
          <div key={a.id} style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 10, padding: 14, marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4 style={{ color: "#fff", margin: 0, fontSize: 14, fontWeight: 600 }}>{a.title}</h4>
              {a.pinned && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>PINNED</span>}
            </div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "4px 0 0" }}>{a.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function SectionHeader({ title, linkText, linkPage }) {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, margin: 0 }}>{title}</h2>
      {linkText && (
        <button onClick={() => setPage(linkPage)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: T.accent, background: "none", border: "none", cursor: "pointer" }}>
          {linkText} <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}

function PageHero({ image, title, subtitle }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: 160 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(36,44,38,0.35) 0%, rgba(36,44,38,0.65) 100%)" }} />
      </div>
      <div style={{ position: "relative", padding: "48px 20px 24px", color: "#fff" }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, margin: 0, fontWeight: 600 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13, color: "#d0d8d2", margin: "6px 0 0", maxWidth: 280, lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
    </div>
  );
}

function PageTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 34, margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: T.textMuted, margin: "4px 0 0" }}>{subtitle}</p>}
    </div>
  );
}

function QuickAction({ icon: Icon, label, page, color }) {
  const { setPage } = useContext(AppContext);
  return (
    <button onClick={() => setPage(page)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", background: T.bgCard, borderRadius: 12, border: "none", cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,.06)" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={20} color="#fff" />
      </div>
      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{label}</span>
    </button>
  );
}

function PracticeCardFull({ practice: p, variant, expanded, onToggle }) {
  const isToday = p.date === today;
  const isFuture = p.date > today;
  const isFeatured = variant === "featured";
  const clickable = !!onToggle;

  const typeColors = {
    "POWER FLOW": T.accent, "26/2": T.success, "SLOW FLOW": "#7a8a6a",
    "RESTORE": T.warning, "YIN": T.warning, "HEATED": T.accent, "SPECIAL": T.success,
  };
  const color = typeColors[p.type] || T.accent;

  return (
    <div onClick={clickable ? onToggle : undefined} style={{ background: isFeatured ? `linear-gradient(165deg, ${T.bg}, hsl(138,14%,28%))` : T.bgCard, border: `1px solid ${isFeatured ? "transparent" : T.border}`, borderRadius: 14, overflow: "hidden", cursor: clickable ? "pointer" : "default" }}>
      <div style={{ padding: isFeatured ? "20px 18px" : "16px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", padding: "2px 8px", borderRadius: 4, background: isFeatured ? `${color}30` : `${color}15`, color: isFeatured ? "#fff" : color }}>{p.type}</span>
              {isToday && <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "2px 6px", borderRadius: 4, background: T.successGhost, color: T.success }}>Today</span>}
              {isFuture && <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "2px 6px", borderRadius: 4, background: T.accentGhost, color: T.accent }}>Upcoming</span>}
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: isFeatured ? 26 : 20, margin: 0, fontWeight: 600, color: isFeatured ? "#fff" : T.text }}>{p.name}</h3>
          </div>
          {clickable && <ChevronDown size={18} color={isFeatured ? "#9aaa9e" : T.textFaint} style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginTop: 4 }} />}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: isFeatured ? "#9aaa9e" : T.textMuted, marginBottom: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Calendar size={12} /> {formatDateShort(p.date)}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock size={12} /> {p.duration} min</span>
          {p.temp && <span>{p.temp}</span>}
        </div>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: isFeatured ? "#d0d8d2" : "#5a6258", margin: 0 }}>{p.description}</p>
      </div>
      {(isFeatured || expanded) && (p.intention || p.teacherTip) && (
        <div style={{ padding: "14px 18px 18px", borderTop: `1px solid ${isFeatured ? "rgba(255,255,255,.08)" : T.borderLight}` }}>
          {p.intention && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: p.teacherTip ? 10 : 0 }}>
              <Heart size={14} color={isFeatured ? T.accent : T.success} style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 13, fontStyle: "italic", color: isFeatured ? "#e0e6e0" : "#6b7268", margin: 0, lineHeight: 1.5 }}>{p.intention}</p>
            </div>
          )}
          {p.teacherTip && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
              <Info size={14} color={isFeatured ? T.success : T.accent} style={{ marginTop: 2, flexShrink: 0 }} />
              <p style={{ fontSize: 12, color: isFeatured ? "#9aaa9e" : T.textMuted, margin: 0, lineHeight: 1.5 }}>{p.teacherTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, multiline }) {
  const style = { width: "100%", padding: "10px 12px", background: T.bgDim, border: `1px solid ${T.border}`, borderRadius: 8, fontSize: 14, color: T.text, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  return (
    <div>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.textMuted, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {multiline ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} style={{ ...style, resize: "vertical" }} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />
      )}
    </div>
  );
}

function EmptyState({ icon: Icon, message, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "32px 16px", background: T.bgCard, border: `1px solid ${T.border}`, borderRadius: 12 }}>
      <Icon size={36} color={T.textFaint} style={{ margin: "0 auto 8px" }} />
      <p style={{ color: T.textMuted, margin: 0 }}>{message}</p>
      {sub && <p style={{ fontSize: 13, color: T.accent, margin: "6px 0 0" }}>{sub}</p>}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div style={{ background: T.bgDim, borderRadius: 8, padding: "10px 12px", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 2px" }}>{label}</p>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: T.text, margin: 0, fontWeight: 700 }}>{value}</p>
    </div>
  );
}

function CTACard() {
  const { setPage } = useContext(AppContext);
  return (
    <div style={{ background: `linear-gradient(165deg, ${T.bg}, hsl(138,14%,28%))`, borderRadius: 16, padding: "24px 20px", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${STUDIO_IMAGES.heroCommunity})`, backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(165deg, rgba(36,44,38,0.78) 0%, rgba(36,44,38,0.6) 100%)" }} />
      <div style={{ position: "relative" }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, margin: "0 0 6px", fontWeight: 600 }}>New to CDA Power Yoga?</h3>
        <p style={{ fontSize: 13, color: "#9aaa9e", margin: "0 0 16px", lineHeight: 1.5 }}>3 weeks of unlimited yoga for just $59. Discover what makes this community extraordinary.</p>
        <button onClick={() => setPage("membership")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 15, cursor: "pointer" }}>
          View Memberships <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

function AdminCard({ title, children }) {
  return (
    <div style={{ background: "#252d27", border: "1px solid #2a3050", borderRadius: 12, padding: 18 }}>
      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#fff", margin: "0 0 14px" }}>{title}</h3>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MODALS
// ═══════════════════════════════════════════════════════════════
function useEscapeKey(onClose) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
}

function SettingsModal({ onClose }) {
  useEscapeKey(onClose);
  const [notifClass, setNotifClass] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(true);
  const [notifEvents, setNotifEvents] = useState(true);
  const [notifReminders, setNotifReminders] = useState(false);

  const ToggleButton = ({ active, onClick }) => (
    <button onClick={onClick} style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: active ? T.accent : T.border, position: "relative", transition: "background 0.2s" }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: active ? 23 : 3, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} />
    </button>
  );

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "85vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, margin: 0 }}>Settings</h2>
          <button aria-label="Close settings" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Profile</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.accentDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: "#fff", fontWeight: 700 }}>KM</div>
            <div>
              <p style={{ fontWeight: 700, margin: 0, fontSize: 15 }}>Kelsey Morgan</p>
              <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>Unlimited Monthly · Since Mar 2023</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "14px 0", borderBottom: `1px solid ${T.borderLight}` }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Notifications</h3>
          {[
            { label: "Class Reminders", active: notifClass, toggle: () => setNotifClass(!notifClass) },
            { label: "Community Milestones", active: notifCommunity, toggle: () => setNotifCommunity(!notifCommunity) },
            { label: "Events & Workshops", active: notifEvents, toggle: () => setNotifEvents(!notifEvents) },
            { label: "Practice Streak Reminders", active: notifReminders, toggle: () => setNotifReminders(!notifReminders) },
          ].map(n => (
            <div key={n.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
              <span style={{ fontSize: 14, color: T.text }}>{n.label}</span>
              <ToggleButton active={n.active} onClick={n.toggle} />
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 0" }}>
          <h3 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.textMuted, margin: "0 0 10px" }}>Studio</h3>
          <img src={STUDIO_IMAGES.studioExterior} alt="CDA Power Yoga at Village at Riverstone" loading="lazy" style={{ width: "100%", borderRadius: 10, marginBottom: 10, objectFit: "cover", maxHeight: 140 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <MapPin size={14} color={T.textMuted} />
            <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{STUDIO_CONFIG.address.street}, {STUDIO_CONFIG.address.city}</p>
          </div>
          <p style={{ fontSize: 13, color: T.textMuted, margin: "8px 0 0" }}>{STUDIO_CONFIG.name} {STUDIO_CONFIG.subtitle} App v1.0</p>
          <p style={{ fontSize: 12, color: T.textFaint, margin: "4px 0 0" }}>Powered by Studio Platform</p>
        </div>
        <button style={{ width: "100%", padding: "12px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.accent, fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8 }}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

const NOTIFICATIONS = [
  { id: "n1", title: "Class Reminder", message: "Power Flow at 4:00 PM today with Ashley", time: "2h ago", read: false },
  { id: "n2", title: "Milestone Unlocked!", message: "You've completed 90 classes! 10 more to 100!", time: "1d ago", read: false },
  { id: "n3", title: "New Workshop", message: "Handstands & Inversions — April 18th. Reserve your spot!", time: "2d ago", read: true },
  { id: "n4", title: "Community Love", message: "Jen S. celebrated your 30-Day Streak!", time: "3d ago", read: true },
];

function NotificationsModal({ onClose }) {
  useEscapeKey(onClose);
  const notifications = NOTIFICATIONS;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 390, maxHeight: "80vh", overflow: "auto", padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, margin: 0 }}>Notifications</h2>
          <button aria-label="Close notifications" onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={18} /></button>
        </div>
        {notifications.map(n => (
          <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: `1px solid ${T.borderLight}` }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.read ? "transparent" : T.accent, marginTop: 6, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: n.read ? 400 : 700, color: T.text, margin: 0 }}>{n.title}</p>
              <p style={{ fontSize: 13, color: T.textMuted, margin: "2px 0 0" }}>{n.message}</p>
              <p style={{ fontSize: 11, color: T.textFaint, margin: "4px 0 0" }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReservationModal({ classData, onConfirm, onClose }) {
  useEscapeKey(onClose);
  const [confirmed, setConfirmed] = useState(false);
  const isFull = classData.registered >= classData.capacity;

  const handleConfirm = () => {
    onConfirm(classData.id);
    setConfirmed(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.bgCard, borderRadius: 16, width: "100%", maxWidth: 340, padding: "24px 20px", textAlign: "center" }}>
        {confirmed ? (
          <>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.accentGhost, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Check size={28} color={T.accent} />
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, margin: "0 0 6px" }}>Reserved!</h3>
            <p style={{ fontSize: 13, color: T.textMuted }}>See you on the mat.</p>
          </>
        ) : (
          <>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, margin: "0 0 16px" }}>
              {isFull ? "Join Waitlist?" : "Reserve Your Spot"}
            </h3>
            <div style={{ textAlign: "left", background: T.bgDim, borderRadius: 10, padding: "14px 16px", marginBottom: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: T.text, margin: "0 0 4px" }}>{classData.type}</p>
              <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 2px" }}>{classData.coach}</p>
              <p style={{ fontSize: 13, color: T.textMuted, margin: 0 }}>{classData.dayLabel || formatDateShort(classData.date || today)} · {fmtTime(classData.time)}</p>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onClose} style={{ flex: 1, padding: "12px 0", borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", color: T.textMuted, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              <button onClick={handleConfirm} style={{ flex: 1, padding: "12px 0", borderRadius: 8, border: "none", background: T.accent, color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                {isFull ? "Join Waitlist" : "Confirm"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  APP ROOT
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("home");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showAdminToggle, setShowAdminToggle] = useState(true);
  const [adminTapCount, setAdminTapCount] = useState(0);
  const [classRegistrations, setClassRegistrations] = useState({});
  const [reservationClass, setReservationClass] = useState(null);
  const [feedCelebrations, setFeedCelebrations] = useState({});
  const contentRef = useRef(null);
  const [logoError, setLogoError] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (contentRef.current) contentRef.current.scrollTo(0, 0);
  }, [page]);

  const registerForClass = useCallback((classId) => {
    setClassRegistrations(prev => ({ ...prev, [classId]: (prev[classId] || 0) + 1 }));
  }, []);

  const openReservation = useCallback((classData) => {
    setReservationClass(classData);
  }, []);

  const celebrateFeed = useCallback((feedId) => {
    setFeedCelebrations(prev => ({ ...prev, [feedId]: (prev[feedId] || 0) + 1 }));
  }, []);

  const handleLogoClick = () => {
    if (isAdmin) return;
    const newCount = adminTapCount + 1;
    setAdminTapCount(newCount);
    if (newCount >= 5) { setShowAdminToggle(true); setAdminTapCount(0); }
    setTimeout(() => setAdminTapCount(0), 2000);
  };

  const mainTabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "classes", label: "Classes", icon: CalendarDays },
    { id: "schedule", label: "Schedule", icon: Calendar },
    { id: "practice", label: "Practice", icon: TrendingUp },
    { id: "more", label: "More", icon: Menu },
  ];

  const moreItems = [
    { id: "community", label: "Community", icon: Heart },
    { id: "teachers", label: "Teachers", icon: Users },
    { id: "events", label: "Events", icon: PartyPopper },
    { id: "membership", label: "Membership", icon: CreditCard },
  ];

  const adminTabs = [
    { id: "admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "admin-members", label: "Members", icon: Users },
    { id: "admin-schedule", label: "Schedule", icon: Calendar },
    { id: "admin-teachers", label: "Teachers", icon: UserCheck },
    { id: "admin-events", label: "Events", icon: PartyPopper },
    { id: "admin-pricing", label: "Pricing", icon: DollarSign },
    { id: "admin-broadcast", label: "Broadcast", icon: Megaphone },
  ];

  const isMoreActive = moreItems.some(item => item.id === page);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage />;
      case "classes": return <ClassesPage />;
      case "schedule": return <SchedulePage />;
      case "practice": return <PracticePage />;
      case "community": return <CommunityPage />;
      case "teachers": return <TeachersPage />;
      case "events": return <EventsPage />;
      case "membership": return <MembershipPage />;
      case "admin-dashboard": return <AdminDashboard />;
      case "admin-members": return <AdminMembersPage />;
      case "admin-schedule": return <AdminSchedulePage />;
      case "admin-teachers": return <AdminTeachersPage />;
      case "admin-events": return <AdminEventsPage />;
      case "admin-pricing": return <AdminPricingPage />;
      case "admin-broadcast": return <AdminBroadcastPage />;
      default: return <HomePage />;
    }
  };

  // ——— ADMIN LAYOUT ———
  if (isAdmin) {
    return (
      <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
        <div style={{ display: "flex", minHeight: "100vh", background: "#1e2620", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#d1d5db" }}>
          <aside style={{ width: 240, background: "#252d27", borderRight: "1px solid #2a3050", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0 }}>
            <div style={{ padding: "16px 14px", borderBottom: "1px solid #2a3050", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                <img src={STUDIO_IMAGES.logo} alt={STUDIO_CONFIG.logoMark} onError={e => { e.target.style.display = "none"; }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <span style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600 }}>{STUDIO_CONFIG.name}</span>
                <span style={{ display: "block", fontSize: 9, color: "#7a8a7e", textTransform: "uppercase", letterSpacing: "0.15em" }}>Admin Panel</span>
              </div>
            </div>
            <nav style={{ flex: 1, padding: "12px 8px", overflow: "auto" }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "#7a8a7e", padding: "0 10px", margin: "0 0 8px" }}>Management</p>
              {adminTabs.map(tab => {
                const active = page === tab.id;
                return (
                  <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: active ? T.accent : "transparent", color: active ? "#fff" : "#a1a1aa", fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
                    <tab.icon size={18} />
                    <span>{tab.label}</span>
                    {active && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />}
                  </button>
                );
              })}
            </nav>
            <div style={{ borderTop: "1px solid #2a3050", padding: "10px 8px" }}>
              <button onClick={() => { setIsAdmin(false); setPage("home"); }} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: "transparent", color: "#a1a1aa", fontSize: 13, cursor: "pointer", textAlign: "left" }}>
                <LogOut size={18} />
                <span>Exit Admin</span>
              </button>
            </div>
          </aside>
          <main style={{ flex: 1, marginLeft: 240, padding: 24, overflow: "auto" }}>
            {renderPage()}
          </main>
        </div>
      </AppContext.Provider>
    );
  }

  // ——— SALES WRAPPER FEATURES ———
  const salesFeatures = [
    { icon: Calendar, label: "Class Scheduling", desc: "Weekly schedule with real-time reservations" },
    { icon: TrendingUp, label: "Practice Tracking", desc: "Reflections, streaks, and milestone badges" },
    { icon: Heart, label: "Community Feed", desc: "Member milestones and celebrations" },
    { icon: Users, label: "Teacher Profiles", desc: "Bios, certifications, and specialties" },
    { icon: CreditCard, label: "Membership Tiers", desc: "6 plans from intro to annual unlimited" },
    { icon: PartyPopper, label: "Events & Workshops", desc: "Special sessions and teacher training" },
    { icon: Bell, label: "Smart Notifications", desc: "Class reminders and streak alerts" },
    { icon: LayoutDashboard, label: "Admin Dashboard", desc: "Full analytics, CRM, and broadcast tools" },
  ];

  const salesCards = [
    { icon: Shield, title: "Admin Dashboard", desc: "Tap the shield icon in the app header to access the full admin suite — analytics, member CRM, scheduling, and broadcast tools." },
    { icon: Sparkles, title: "Built for CDA Power Yoga", desc: "Custom-designed around your brand, class types, teachers, and the powerful community your members already love." },
    { icon: Zap, title: "MindBody Integration", desc: "Connects directly with your existing MindBody setup for booking, payments, and member management — no workflow changes needed." },
  ];

  // ——— PHONE FRAME (shared between wrapper and standalone) ———
  const phoneContent = (
    <>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 30, background: T.bg, color: "#fff", padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={handleLogoClick} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: "#fff" }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            {logoError ? (
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: "#fff", fontWeight: 700 }}>{STUDIO_CONFIG.logoMark}</span>
            ) : (
              <img src={STUDIO_IMAGES.logo} alt={STUDIO_CONFIG.logoMark} onError={() => setLogoError(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, lineHeight: 1, letterSpacing: "0.02em" }}>{STUDIO_CONFIG.name}</span>
            <span style={{ fontSize: 9, color: "#7a8a7e", textTransform: "uppercase", letterSpacing: "0.15em" }}>{STUDIO_CONFIG.subtitle}</span>
          </div>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {showAdminToggle && (
            <button aria-label="Admin Mode" onClick={() => { setIsAdmin(true); setPage("admin-dashboard"); }} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: T.accent }}>
              <Shield size={20} />
            </button>
          )}
          <button aria-label="Notifications" onClick={() => setShowNotifications(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff", position: "relative" }}>
            <Bell size={20} />
            {unreadCount > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 14, height: 14, borderRadius: "50%", background: T.accent, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>{unreadCount}</span>}
          </button>
          <button aria-label="Settings" onClick={() => setShowSettings(true)} style={{ padding: 8, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", color: "#fff" }}>
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <main ref={contentRef} style={{ paddingBottom: 80 }}>
        {renderPage()}
      </main>

      {/* More Menu */}
      {showMore && (
        <div onClick={() => setShowMore(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)", zIndex: 40 }}>
          <div onClick={e => e.stopPropagation()} style={{ position: "absolute", bottom: 68, left: 16, right: 16, maxWidth: 358, margin: "0 auto", background: T.bgCard, borderRadius: 16, padding: "14px 12px", boxShadow: "0 8px 32px rgba(0,0,0,.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 6px 8px" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>More</span>
              <button onClick={() => setShowMore(false)} style={{ padding: 4, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer" }}><X size={18} color={T.textMuted} /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {moreItems.map(item => {
                const active = page === item.id;
                return (
                  <button key={item.id} onClick={() => { setPage(item.id); setShowMore(false); }} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 8px", borderRadius: 10, border: "none", cursor: "pointer", background: active ? T.accentGhost : T.bgDim, color: active ? T.accent : T.textMuted }}>
                    <item.icon size={22} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <nav style={{ position: "sticky", bottom: 0, zIndex: 30, background: T.bgCard, borderTop: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-around", padding: "6px 4px 10px" }}>
          {mainTabs.map(tab => {
            const active = tab.id === "more" ? (isMoreActive || showMore) : page === tab.id;
            if (tab.id === "more") {
              return (
                <button key={tab.id} onClick={() => setShowMore(true)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                  <tab.icon size={20} strokeWidth={active ? 2.5 : 2} />
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
                </button>
              );
            }
            return (
              <button key={tab.id} onClick={() => setPage(tab.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 12px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", color: active ? T.accent : T.textFaint }}>
                <tab.icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span style={{ fontSize: 10, fontWeight: active ? 700 : 500 }}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Modals */}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showNotifications && <NotificationsModal onClose={() => setShowNotifications(false)} />}
      {reservationClass && <ReservationModal classData={reservationClass} onConfirm={registerForClass} onClose={() => setReservationClass(null)} />}
    </>
  );

  // ——— CONSUMER LAYOUT WITH SALES WRAPPER ———
  return (
    <AppContext.Provider value={{ page, setPage, classRegistrations, registerForClass, openReservation, feedCelebrations, celebrateFeed }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 48, minHeight: "100vh", background: "#f4f1ec", fontFamily: "'DM Sans', system-ui, sans-serif", padding: "40px 32px" }}>

        {/* LEFT SIDEBAR — Sales Info */}
        <div className="sales-sidebar" style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", color: T.accent, marginBottom: 16 }}>Prototype Demo</p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
              <img src={STUDIO_IMAGES.logo} alt="CDA" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, margin: 0, fontWeight: 600, color: "#2c2f2c" }}>{STUDIO_CONFIG.name}</h1>
              <p style={{ fontSize: 13, color: "#8a9488", margin: 0 }}>Yoga Studio App</p>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {salesFeatures.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <f.icon size={18} color="#8a9488" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, color: "#2c2f2c", margin: 0 }}>{f.label}</p>
                  <p style={{ fontSize: 13, color: "#8a9488", margin: "2px 0 0" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", color: "#b0b8b2", marginTop: 40 }}>Built by Nimbus Theory</p>
        </div>

        {/* CENTER — Phone Frame */}
        <div style={{ width: 390, flexShrink: 0, borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,.12), 0 2px 12px rgba(0,0,0,.08)", background: T.bgDim, position: "relative", maxHeight: "88vh", display: "flex", flexDirection: "column", border: "1px solid #e0ddd8" }}>
          <div style={{ flex: 1, overflow: "auto" }}>
            {phoneContent}
          </div>
        </div>

        {/* RIGHT SIDEBAR — Feature Cards */}
        <div className="sales-sidebar" style={{ width: 280, flexShrink: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
          {salesCards.map((card, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #e0ddd8", borderRadius: 16, padding: 24 }}>
              <card.icon size={24} color={T.accent} style={{ marginBottom: 12 }} />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "#2c2f2c", margin: "0 0 8px", fontWeight: 600 }}>{card.title}</h3>
              <p style={{ fontSize: 13, color: "#6a7268", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .sales-sidebar { display: none !important; }
        }
      `}</style>
    </AppContext.Provider>
  );
}
