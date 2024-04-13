import { useCanvas } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";
import { toPng } from "html-to-image";

export default function ShareDialog() {
  const canvasRef = useCanvas((state) => state.canvasRef);
  const room = new URL(location.toString()).searchParams.get("room") ?? "";
  return (
    <DialogContainer className="cursor-pointer w-fit">
      <DialogItem
        className="flex-col items-start p-1 w-fit"
        onClick={async () => {
          if (room) {
            navigator.clipboard.writeText(location.toString());
            // Alert user: Do better
            alert("Link copied to clipboard, Please share.");
            return;
          }
          const redirectURL = new URL(location.toString());
          redirectURL.searchParams.append("room", crypto.randomUUID());

          await navigator.clipboard.writeText(redirectURL.toString());
          // Alert user: Do better
          alert("Link copied to clipboard, redirecting once you close this.");
          const newWindow = window.open(redirectURL, "_blank");
          newWindow?.focus();
        }}
      >
        <p className="text-left w-max">Collaborate with others</p>
        <small className="font-light w-max">Share collaboration link</small>
      </DialogItem>
      <DialogItem
        className="flex-col items-start p-1 w-fit"
        onClick={async () => {
          if (room) {
            if (
              new URL(location.toString()).searchParams.get("viewonly") ===
              "true"
            ) {
              navigator.clipboard.writeText(location.toString());
            } else {
              const redirectURL = new URL(location.toString());
              redirectURL.searchParams.append("viewonly", "true");
              await navigator.clipboard.writeText(redirectURL.toString());
            }
            // Alert user
            alert("Link copied to clipboard, Please share.");
            return;
          }
          const redirectURL = new URL(location.toString());
          redirectURL.searchParams.append("room", crypto.randomUUID());
          redirectURL.searchParams.append("viewonly", "true");
          await navigator.clipboard.writeText(redirectURL.toString());
          // Alert user
          alert("Link copied to clipboard, redirecting once you close this.");
          const newWindow = window.open(redirectURL, "_blank");
          newWindow?.focus();
        }}
      >
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
