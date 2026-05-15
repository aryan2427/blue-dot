"use client";

interface Props {
  onClick: () => void;
}

export default function FloatingAIButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        bg-blue-600 text-white
        w-16 h-16 rounded-full
        shadow-lg text-lg font-bold
      "
    >
      AI
    </button>
  );
}