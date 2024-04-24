import { useCanvas } from "../../store/Store";
import Button from "./Button";

export default function BackToContent() {
  const { canvasRef, canvasPos, setCanvasPos } = useCanvas();
  return (
    <>
      {(Math.abs(canvasPos.x) > 300 || Math.abs(canvasPos.y) > 300) && (
        <Button
          className="!absolute px-2 py-1 mt-2 rounded-md top-full left-2 w-fit bg-[#333438] z-20"
          onPointerDown={() => {
            if (!canvasRef) return;
            canvasRef.style.transform = "translate(0,0)";
            setCanvasPos({ x: 0, y: 0 });
          }}
        >
          <p>Back to Content</p>
        </Button>
      )}
    </>
  );
}
