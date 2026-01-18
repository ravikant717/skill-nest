export default function Divider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-textMuted">OR</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
