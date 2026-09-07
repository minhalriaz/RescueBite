export function timeUntil(deadline) {
  if (!deadline) return "No deadline";

  const now = Date.now();
  const end = new Date(deadline).getTime();
  const diffMs = end - now;

  if (diffMs <= 0) return "Expired";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const suffix = days > 1 ? "s" : "";
    return "Within " + days + " day" + suffix;
  }
  if (hours > 0) {
    const suffix = hours > 1 ? "s" : "";
    return "Within " + hours + " hr" + suffix;
  }
  if (minutes > 30) return "Within " + minutes + " min";
  return "Less than 30 min";
}
