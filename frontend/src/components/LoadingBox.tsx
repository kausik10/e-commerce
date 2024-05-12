import { motion } from "framer-motion";
const LoadingBox = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      style={{
        width: "50px",
        height: "50px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #3498db",
        borderRadius: "50%",
        boxSizing: "border-box",
      }}
    ></motion.div>
  );
};

export default LoadingBox;
