import type { ButtonProps } from "../models/types";

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border-2 rounded-2xl font-bold bg-blue-200 px-4 py-2"
    >
      {children}
    </button>
  );
}
