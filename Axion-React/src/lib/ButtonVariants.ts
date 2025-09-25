import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-[14px] leading-[13.7px] bg-white border border-black text-black font-blacknorthdemo shadow hover:bg-white/90",
        yellow: "text-[14px] leading-[19.2px] bg-secondary border border-black text-black font-bold shadow hover:bg-secondary/90",
        blue: "text-[14px] leading-[19.2px] bg-primary border border-black text-black font-bold shadow hover:bg-primary/90",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[46px] w-[112px]",
        yellow: "h-[51px] w-[139px]",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);