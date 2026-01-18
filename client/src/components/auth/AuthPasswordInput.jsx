import { forwardRef, useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const AuthPasswordInput = forwardRef(
  ({ label, error, ...props }, ref) => {
    const [show, setShow] = useState(false);
    const inputId = useId(); // 🔑 unique, SSR-safe

    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={inputId}                 // ✅ linked
            className="text-sm text-textMuted"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}                      // ✅ linked
            ref={ref}
            type={show ? "text" : "password"}
            className={`
              w-full px-4 py-3 rounded-lg
              bg-bg border
              ${error ? "border-danger" : "border-border"}
              text-textPrimary
              focus:outline-none focus:border-glow
              transition
            `}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-3 text-textMuted hover:text-textPrimary"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && (
          <p className="text-danger text-xs mt-1">
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

export default AuthPasswordInput;
