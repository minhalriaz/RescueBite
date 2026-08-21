import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { getStoredUser, isAuthenticated } from "../lib/auth";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshNotifications = useCallback(async () => {
    const user = getStoredUser();

    if (!isAuthenticated() || user?.role !== "ngo") {
      setNotifications([]);
      setUnreadCount(0);
      setError("");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = await api.getNotifications();
      setNotifications(Array.isArray(payload.data) ? payload.data : []);
      setUnreadCount(Number(payload.unread_count || 0));
    } catch (requestError) {
      setError(requestError.message || "Could not load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    const current = notifications.find((notification) => notification.id === notificationId);
    if (!current || current.read_at) return;

    setError("");
    try {
      const payload = await api.markNotificationRead(notificationId);
      const updated = payload.notification;

      setNotifications((items) => items.map((item) => (
        item.id === notificationId ? updated : item
      )));
      setUnreadCount((count) => Math.max(0, count - 1));
    } catch (requestError) {
      setError(requestError.message || "Could not mark the notification as read.");
    }
  }, [notifications]);

  const markAllAsRead = useCallback(async () => {
    if (unreadCount === 0) return;

    setError("");
    try {
      await api.markAllNotificationsRead();
      const timestamp = new Date().toISOString();

      setNotifications((items) => items.map((item) => (
        item.read_at ? item : { ...item, read_at: timestamp }
      )));
      setUnreadCount(0);
    } catch (requestError) {
      setError(requestError.message || "Could not mark all notifications as read.");
    }
  }, [unreadCount]);

  useEffect(() => {
    refreshNotifications();

    const handleAuthChange = () => refreshNotifications();
    window.addEventListener("rescuebite:auth-changed", handleAuthChange);

    const handleFocus = () => {
    const user = getStoredUser();

     if (isAuthenticated() && user?.role === "ngo") {
     refreshNotifications();
    }
   };

    const interval = window.setInterval(() => {
      const user = getStoredUser();

       if (
        document.visibilityState === "visible" &&
        isAuthenticated() &&
        user?.role === "ngo"
      ) {
        refreshNotifications();
       }
     }, 30000);


    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("rescuebite:auth-changed", handleAuthChange);
      window.removeEventListener("focus", handleFocus);
      window.clearInterval(interval);
    };
  }, [refreshNotifications]);

  const value = useMemo(() => ({
    notifications,
    unreadCount,
    loading,
    error,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
  }), [notifications, unreadCount, loading, error, refreshNotifications, markAsRead, markAllAsRead]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider.");
  }

  return context;
}
