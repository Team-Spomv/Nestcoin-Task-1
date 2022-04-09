 import { notification } from "antd";
 
 const OpenNotification = (type, description) => {
    notification[type]({
      message: type === "warning" ? "LOADING..." : type.toUpperCase(),
      description,
    });
  };

export default OpenNotification;