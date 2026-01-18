export default function AuthInput({ label, type = "text", register }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-textMuted">{label}</label>
      <input
        type={type}
        {...register}
        className="
          w-full px-4 py-3
          rounded-lg
          bg-bg border border-border
          text-textPrimary
          focus:outline-none focus:border-glow
          transition
        "
      />
    </div>
  );
}
