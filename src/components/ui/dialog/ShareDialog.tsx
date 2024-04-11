import { useCanvas } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";
import { toPng } from "html-to-image";

export default function ShareDialog() {
  const canvasRef = useCanvas((state) => state.canvasRef);
  return (
    <DialogContainer className="cursor-pointer w-fit">
      <DialogItem className="flex-col items-start p-1 w-fit">
        <p className="text-left w-max">Collaborate with others</p>
        <small className="font-light w-max">Share collaboration link</small>
      </DialogItem>
      <DialogItem className="flex-col items-start p-1 w-fit">
        <p className="text-left w-max">Share with others</p>
        <small className="font-light w-max">Share as readonly</small>
      </DialogItem>
      <hr />
      <DialogItem
        onClick={async () => {
          if (!canvasRef) return;
          const dataUrl = await toPng(canvasRef, {
            cacheBust: true,
            backgroundColor: "#131315",
          });
          const link = document.createElement("a");
          link.download = "drawings.png";
          link.href = dataUrl;
          link.click();
        }}
      >
        <p>Save project as Image</p>
      </DialogItem>
    </DialogContainer>
  );
}
