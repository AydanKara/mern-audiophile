// src/utils/toastNotifications.js
import { toast } from "react-toastify";

// Custom error toast notification
export const notifyError = (message) => {
  toast.error(message, {
    className: "custom-toast", // Custom class for the toast
    bodyClassName: "custom-toast-body", // Custom class for the body
    progressClassName: "custom-toast-progress-bar", // Custom class for the progress bar
  });
};

export const notifySuccess = (message) => {
  toast.success(message, {
    className: "custom-toast",
  });
};

export const notifyInfo = (message) => {
  toast.info(message, {
    className: "custom-toast",
  });
};

export const notifyWarning = (message) => {
  toast.warning(message, {
    className: "custom-toast",
  });
};
