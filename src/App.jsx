export default function App() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 bg-background text-textPrimary">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center w-[400px]">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">
          Tailwind v4 Test 🎨
        </h1>

        <p className="text-textSecondary mb-6">
          If you can see colors, spacing, rounded corners, and hover effects —
          Tailwind is working perfectly!
        </p>

        <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition duration-300">
          Hover Me ✨
        </button>
      </div>

      <footer className="text-textSecondary text-sm">
        Built with <span className="text-indigo-500 font-semibold">Tailwind v4</span>
      </footer>
    </div>
  );
}
