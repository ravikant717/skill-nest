export default function AIHighlights() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold mb-12">AI-Powered Learning</h2>
      <div className="grid md:grid-cols-4 gap-6">
        {[
          "AI Recommendations",
          "Smart Syllabus",
          "Live Insights",
          "AI Study Assistant",
        ].map((item) => (
          <div key={item} className="bg-white shadow-md rounded-xl p-6">
            <p className="font-semibold">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
