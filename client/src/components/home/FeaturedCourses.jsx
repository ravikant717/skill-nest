import { motion } from "framer-motion";

export default function FeaturedCourses() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10">Featured Courses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((id) => (
            <motion.div
              key={id}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl shadow-md"
            >
              <div className="h-40 bg-indigo-500 rounded-t-2xl"></div>
              <div className="p-6">
                <h4 className="font-semibold text-black text-lg">Web Development</h4>
                <p className="text-indigo-600 font-bold mt-2">₹1,999</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
