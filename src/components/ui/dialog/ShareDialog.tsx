import { useCanvas } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";
import { toPng } from "html-to-image";

export default function ShareDialog() {
  const canvasRef = useCanvas((state) => state.canvasRef);
  return (
    <DialogContainer className="w-fit">
      <DialogItem className="w-fit flex-col items-start p-1">
        <p className="w-max text-left">Collaborate with others</p>
        <small className="w-max font-light">Share collaboration link</small>
      </DialogItem>
      <hr />
      <DialogItem
        onClick={async () => {
          if (!canvasRef) return;
          const dataUrl = await toPng(canvasRef, { cacheBust: true });
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
