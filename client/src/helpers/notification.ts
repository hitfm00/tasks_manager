import { notifications } from "@mantine/notifications";

import { NOTIFICATION_TYPES, NotificationTypes } from "./errorTypes";


type ShowNotificationType = {
  type: NotificationTypes;
  message?: string;
};

const notificationMessages = {
  [NOTIFICATION_TYPES.ERROR]: {
    title: "Помилка",
    message: "Щось пішло не так",
    color: "red",
  },
  [NOTIFICATION_TYPES.WARNING]: {
    title: "Попередження",
    message: "Будь ласка, зверніть увагу на це",
    color: "yellow",
  },
  [NOTIFICATION_TYPES.INFO]: {
    title: "Інформація",
    message: "Це важлива інформація",
    color: "blue",
  },
  [NOTIFICATION_TYPES.SUCCESS]: {
    title: "Успіх",
    message: "Операція виконана успішно",
    color: "green",
  },
};

export const showNotification = ({ type, message }: ShowNotificationType) => {
  const {
    title,
    message: defaultMessage,
    color,
  } = notificationMessages[type] ||
  notificationMessages[NOTIFICATION_TYPES.INFO];
  notifications.show({
    title,
    message: message || defaultMessage,
    color,
  });
};
