import { useState } from "react";
import { useCanvas } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";
import { toPng, toJpeg, toSvg } from "html-to-image";

export default function ExportPopup() {
  const canvasRef = useCanvas((s) => s.canvasRef);
  const [transparent, setTransparent] = useState(false);
  return (
    <DialogContainer className="w-fit">
      <DialogItem
        onClick={async () => {
          if (!canvasRef) return;
          const dataUrl = await toPng(canvasRef, {
            cacheBust: true,
            backgroundColor: transparent ? "#00000000" : "#131315",
          });
          const link = document.createElement("a");
          link.download = "drawings.png";
          link.href = dataUrl;
          link.click();
        }}
      >
        <p>PNG</p>
      </DialogItem>
      <DialogItem
        onClick={async () => {
          if (!canvasRef) return;
          const dataUrl = await toJpeg(canvasRef, {
            cacheBust: true,
            quality: 0.92,
            backgroundColor: transparent ? "#00000000" : "#131315",
          });
          const link = document.createElement("a");
          link.download = "drawings.jpg";
          link.href = dataUrl;
          link.click();
        }}
      >
        <p>JPG</p>
      </DialogItem>
      <DialogItem
        onClick={async () => {
          if (!canvasRef) return;
          const dataUrl = await toSvg(canvasRef, {
            cacheBust: true,
            backgroundColor: transparent ? "#00000000" : "#131315",
          });
          const link = document.createElement("a");
          link.download = "drawings.svg";
          link.href = dataUrl;
          link.click();
        }}
      >
        <p>SVG</p>
      </DialogItem>
      <hr />
      <DialogItem className="gap-2">
        <div
          className={`checkBox size-4 border bg-transparent ${
            transparent ? "bg-green-500" : ""
          }`}
          onClick={() => setTransparent(!transparent)}
        ></div>
        <p className="w-max">Transparent</p>
      </DialogItem>
    </DialogContainer>
  );
}
