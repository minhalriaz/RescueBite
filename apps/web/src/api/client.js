const API_BASE_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status = 0, errors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem("rescuebite_token");
  const headers = {
    Accept: "application/json",
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError("Unable to reach the RescueBite API. Check that the Laravel server is running.");
  }

  const text = await response.text();
  let payload = {};

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }
  }

  if (!response.ok) {
    const firstValidationError = payload.errors
      ? Object.values(payload.errors).flat().find(Boolean)
      : null;

    throw new ApiError(
      firstValidationError || payload.message || `Request failed with status ${response.status}.`,
      response.status,
      payload.errors || null,
    );
  }

  return payload;
}

export const api = {
  login: (credentials) => request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  }),

  register: (user) => request("/register", {
    method: "POST",
    body: JSON.stringify(user),
  }),

  logout: () => request("/logout", { method: "POST" }),

  createDonation: (donation) => request("/donations", {
    method: "POST",
    body: JSON.stringify(donation),
  }),

  getNotifications: () => request("/notifications"),

  markNotificationRead: (notificationId) => request(`/notifications/${notificationId}/read`, {
    method: "PATCH",
  }),

  markAllNotificationsRead: () => request("/notifications/read-all", {
    method: "PATCH",
  }),
};
