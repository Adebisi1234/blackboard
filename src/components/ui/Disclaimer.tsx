import { useRef } from "react";

export default function Disclaimer() {
  const containerRef = useRef<HTMLElement>(null);
  return (
    <aside
      className="text-center absolute w-full h-fit p-2 top-0"
      ref={containerRef}
    >
      <p className="text-red-600">
        This project is inspired by{" "}
        <a href="http://tldraw.com" className="underline">
          tldraw.com
        </a>{" "}
        please use the real thing. This is just a fun project |{" "}
        <span
          className="text-white cursor-pointer"
          onClick={() => {
            if (!containerRef.current) return;
            containerRef.current.style.display = "none";
          }}
        >
          x
        </span>
      </p>
    </aside>
  );
}
