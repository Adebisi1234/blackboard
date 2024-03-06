import { useCanvas } from "../../store/Store";
import Button from "./Button";

export default function BackToContent() {
  const { canvasRef, canvasPos, setCanvasPos } = useCanvas();
  return (
    <>
      {(canvasPos.x > 300 || canvasPos.y > 300) && (
        <Button //Magic number habibi
          className="!absolute px-2 py-1 mt-2 rounded-md top-full left-2 w-fit bg-[#333438] z-20"
          onMouseDown={() => {
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
