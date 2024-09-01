export const NOTIFICATION_TYPES = {
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
  SUCCESS: "success",
} as const;

export type NotificationTypes =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];
