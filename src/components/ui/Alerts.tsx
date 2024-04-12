import { useRef } from "react";
import { useCallback, useEffect } from "react";
import { useDrawing } from "../../store/Store";
export default function Alerts() {
  const disclaimerRef = useRef<HTMLParagraphElement>(null);
  const room = new URL(location.toString()).searchParams.get("room") ?? "";
  const { userOffline, readOnly } = useDrawing((s) => ({
    userOffline: s.userOffline,
    readOnly: s.readOnly,
  }));
  const handleOffline = useCallback((e: Event) => {
    if (room) {
      userOffline(true);
    }
  }, []);
  const handleOnline = useCallback((e: Event) => {
    if (room) {
      userOffline(false);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <aside className="absolute top-0 flex justify-center w-full p-2 text-xs text-center pointer-events-none h-fit">
      <p className="text-red-500" ref={disclaimerRef}>
        This project is inspired by{" "}
        <a href="http://tldraw.com" className="underline">
          tldraw.com
        </a>{" "}
        please use the real thing. This is just a fun project |{" "}
        <span
          className="text-white cursor-pointer pointer-events-auto"
          onClick={() => {
            if (!disclaimerRef.current) return;
            disclaimerRef.current.style.display = "none";
          }}
        >
          x
        </span>
      </p>
      {readOnly && (
        <p className="absolute p-2 mt-5 border rounded-md">Offline</p>
      )}
    </aside>
  );
}
