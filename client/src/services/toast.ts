import { toast } from "react-toastify";

const success = (message: string) => {
  toast.success(message);
};

const failure = (message: string) => {
  toast.error(message);
};

const info = (message: string) => {
  toast.info(message);
};

export { success, failure, info };
