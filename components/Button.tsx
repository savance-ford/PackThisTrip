import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary: "bg-slate-950 text-white hover:bg-slate-800 focus:ring-slate-950",
  secondary: "bg-white text-slate-950 border border-slate-200 hover:bg-slate-50 focus:ring-slate-500",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-500"
};

export function Button({ href, children, variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
