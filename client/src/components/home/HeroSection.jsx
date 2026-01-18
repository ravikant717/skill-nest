import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 max-w-7xl mx-auto px-6">
      <h2 className="text-5xl font-extrabold">
        Learn Smarter. <span className="text-indigo-600">Teach Better.</span>
      </h2>

      <div className="mt-10 flex gap-4">
        {/* STUDENT ENTRY */}
        <Button onClick={() => navigate("/signup?role=student")}>
          Explore Courses
        </Button>

        {/* EDUCATOR ENTRY */}
        <Button
          variant="outline"
          onClick={() => navigate("/signup?role=educator")}
        >
          Become an Educator
        </Button>
      </div>

      {/* LOGIN LINKS */}
      <div className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login?role=student")}
          className="text-indigo-600 cursor-pointer hover:underline"
        >
          Student Login
        </span>{" "}
        |{" "}
        <span
          onClick={() => navigate("/login?role=educator")}
          className="text-indigo-600 cursor-pointer hover:underline"
        >
          Educator Login
        </span>
      </div>
    </section>
  );
}
