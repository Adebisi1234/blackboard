import Button from "./Button";

export default function BackToContent({
  canvasRef,
  posRef,
}: {
  canvasRef: HTMLDivElement;
  posRef: { x: number; y: number };
}) {
  return (
    <Button
      className="!absolute px-2 py-1 mt-2 rounded-md top-full left-2 w-fit bg-[#333438] z-20"
      onMouseDown={() => {
        if (!canvasRef) return;
        canvasRef.style.transform = "translate(0,0)";
        posRef = { x: 0, y: 0 };
      }}
    >
      <p>Back to Content</p>
    </Button>
  );
}
