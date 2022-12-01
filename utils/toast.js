import { toast } from 'react-toastify';

const ToastMessage = {
  success: (message, options) =>
    toast.success(message, {
      hideProgressBar: true,
      autoClose: 200,
      ...options
    })
};

export default ToastMessage;
