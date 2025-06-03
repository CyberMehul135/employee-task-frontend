import { motion } from "framer-motion";

const StateCard = ({ name, value }) => {
  return (
    <motion.div
      className="px-10 py-7 max-[480px]:px-5 text-lg max-md:text-[17px] bg-gray-800 rounded-md"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
    >
      <div>{value}</div>
      <div>{name}</div>
    </motion.div>
  );
};

export default StateCard;
