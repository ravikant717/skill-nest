import { motion } from "framer-motion";
import Card from "../ui/Cards";

export default function RoleSwitch() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
      {["Student", "Educator"].map((role) => (
        <motion.div key={role} whileHover={{ scale: 1.05 }}>
          <Card>
            <h3 className="text-2xl font-bold">I’m a {role}</h3>
            <p className="text-gray-600 mt-2">
              {role === "Student"
                ? "Browse and enroll in courses"
                : "Create and monetize your knowledge"}
            </p>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
