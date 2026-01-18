export default function Button({ children, ...props }) {
  return (
    <button {...props} className="px-6 py-3 rounded-xl">
      {children}
    </button>
  );
}
