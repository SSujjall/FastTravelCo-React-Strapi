import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  return (
    <ToastContainer
      position="top-right"  // Position of the toast (can be adjusted)
      autoClose={5000}       // Auto close after 5 seconds
      hideProgressBar={false} // Show progress bar
      newestOnTop={false}    // Toasts appear at the bottom (if true, newest on top)
      closeOnClick={true}    // Close the toast on click
      rtl={false}            // Set true if you need right-to-left support
      pauseOnFocusLoss={false} // Do not pause on focus loss
      draggable={false}      // Disable drag
      pauseOnHover={true}    // Pause when hovering over
    />
  );
};

export default Toast;
