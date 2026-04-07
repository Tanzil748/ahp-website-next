import type { UserRole, JobType } from "./types.ts";

export const POST_CATEGORIES = [
  "Fragrance Trends",
  "Guides & Tips",
  "Behind the Scenes",
  "Events",
];

export const ROLE_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  "super-admin": {
    label: "Super Admin",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  admin: {
    label: "Admin",
    color: "hsl(200,70%,65%)",
    bg: "hsla(200,70%,65%,0.12)",
    border: "hsla(200,70%,65%,0.3)",
  },
  blogger: {
    label: "Blogger",
    color: "hsl(270,60%,70%)",
    bg: "hsla(270,60%,70%,0.12)",
    border: "hsla(270,60%,70%,0.3)",
  },
  none: {
    label: "Unset",
    color: "hsla(0,0%,55%,1)",
    bg: "hsla(0,0%,55%,0.1)",
    border: "hsla(0,0%,55%,0.25)",
  },
};

export const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "admin", label: "Admin" },
  { value: "blogger", label: "Blogger" },
  { value: "none", label: "Unset" },
];

export const STATUS_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  pending: {
    label: "Pending",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  approved: {
    label: "Approved",
    color: "hsl(142,50%,62%)",
    bg: "hsla(142,50%,50%,0.12)",
    border: "hsla(142,50%,50%,0.3)",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(0,65%,65%)",
    bg: "hsla(0,65%,50%,0.12)",
    border: "hsla(0,65%,50%,0.3)",
  },
};

export const JOB_TYPE_STYLES: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  "full-time": {
    label: "Full-Time",
    color: "hsl(142,50%,62%)",
    bg: "hsla(142,50%,50%,0.12)",
    border: "hsla(142,50%,50%,0.3)",
  },
  "part-time": {
    label: "Part-Time",
    color: "hsl(200,70%,65%)",
    bg: "hsla(200,70%,65%,0.12)",
    border: "hsla(200,70%,65%,0.3)",
  },
  contract: {
    label: "Contract",
    color: "hsl(38,61%,73%)",
    bg: "hsla(38,61%,73%,0.12)",
    border: "hsla(38,61%,73%,0.3)",
  },
  internship: {
    label: "Internship",
    color: "hsl(270,60%,70%)",
    bg: "hsla(270,60%,70%,0.12)",
    border: "hsla(270,60%,70%,0.3)",
  },
};

export const EMPTY_CAREER_FORM = {
  title: "",
  department: "",
  location: "",
  type: "full-time" as JobType,
  description: "",
  requirements: [""],
  salaryMin: "",
  salaryMax: "",
  isActive: true,
};

export const TABS: { key: import("./types.ts").Tab; label: string }[] = [
  { key: "posts", label: "Posts" },
  { key: "careers", label: "Careers" },
  { key: "users", label: "Users" },
];
