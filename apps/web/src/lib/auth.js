const TOKEN_KEY = "rescuebite_token";
const USER_KEY = "rescuebite_user";

export function getStoredUser() {
  try {
    const value = localStorage.getItem(USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function setSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event("rescuebite:auth-changed"));
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("rescuebite:auth-changed"));
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(TOKEN_KEY));
}
export function dashboardForRole(role) {
  if (role === "donor") return "/donor/dashboard";
  if (role === "ngo") return "/ngo/dashboard";
  if (role === "volunteer") return "/volunteer/dashboard";

  return "/";
}