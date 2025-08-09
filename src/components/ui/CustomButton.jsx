// components/CustomButton.jsx
import { Button } from "./button";
import { cn } from "../../lib/utils"; // or wherever your `cn` helper is

const colorClasses = {
  'btn-warning': 'bg-yellow-500 hover:bg-yellow-600',
  'btn-primary': 'bg-blue-600 hover:bg-blue-700',
};

const sizeClasses = {
  'btn-sm': 'text-sm px-3 py-1',
  'btn-lg': 'text-lg px-6 py-3',
};

const textColorClasses = {
  white: 'text-white',
  black: 'text-black',
};

export default function CustomButton({
  text,
  color,
  size,
  textcolor,
  className,
  ...props
}) {
  return (
    <Button
      className={cn(
        colorClasses[color],
        sizeClasses[size],
        textColorClasses[textcolor],
        className
      )}
      {...props}
    >
      {text}
    </Button>
  );
}
