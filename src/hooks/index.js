import { notification } from "antd";

export const useNotification = () => (type = "success", message, description) =>
  notification[type]({
    message,
    description
  });
