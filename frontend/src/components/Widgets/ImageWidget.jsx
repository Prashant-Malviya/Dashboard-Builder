import { ImageOff } from "lucide-react";

export default function ImageWidget({ content }) {
  if (!content.url) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-400 text-sm">
        <ImageOff size={28} />
        No image uploaded
      </div>
    );
  }

  return (
    <img
      src={content.url}
      alt="widget"
      className="w-full h-full object-cover pointer-events-none select-none"
      draggable={false}
    />
  );
}
