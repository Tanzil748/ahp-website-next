export function getDisplayName(user: {
  firstName?: string;
  lastName?: string;
  email: string;
}) {
  if (user.firstName || user.lastName)
    return [user.firstName, user.lastName].filter(Boolean).join(" ");
  return user.email.split("@")[0];
}

export function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatSalary(min?: number, max?: number) {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}
