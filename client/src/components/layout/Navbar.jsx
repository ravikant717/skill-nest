export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold text-indigo-600">EduPlatform</h1>
        <div className="hidden md:flex gap-6">
          <a className="hover:text-indigo-600">Courses</a>
          <a className="hover:text-indigo-600">Educators</a>
          <a className="hover:text-indigo-600">Pricing</a>
        </div>
      </div>
    </nav>
  );
}
