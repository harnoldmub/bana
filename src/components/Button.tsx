import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bana disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-bana text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#114d7f]",
        secondary: "border border-bana/15 bg-white/80 text-forest backdrop-blur hover:-translate-y-0.5 hover:bg-white",
        blue: "bg-logoRed text-white shadow-soft hover:-translate-y-0.5 hover:bg-[#b93628]"
      }
    },
    defaultVariants: {
      variant: "primary"
    }
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    showArrow?: boolean;
  };

export function Button({ className, variant, showArrow = true, children, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
      {showArrow ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /> : null}
    </button>
  );
}
