import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import RoleSwitch from "../components/home/RoleSwitch";
import FeaturedCourses from "../components/home/FeaturedCourses";
import AIHighlights from "../components/home/AIHighLights";
import EducatorCTA from "../components/home/EducatorsCTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <RoleSwitch />
      <FeaturedCourses />
      <AIHighlights />
      <EducatorCTA />
      <Footer />
    </>
  );
}
