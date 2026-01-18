import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          w-full max-w-md
          bg-surface border border-border
          rounded-2xl p-8
          shadow-soft
        "
      >
        <h1 className="text-2xl font-semibold text-textPrimary">
          {title}
        </h1>
        <p className="text-textSecondary mt-1 mb-6 text-sm">
          {subtitle}
        </p>

        {children}
      </motion.div>
    </div>
  );
}
