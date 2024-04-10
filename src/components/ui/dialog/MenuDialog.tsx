import { useState } from "react";
import { useActiveTool, useImage } from "../../../store/Store";
import { generateImage } from "../../../utils/drawings";
import Links from "../Links";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";
import { CaretRight } from "../Svg";
import ZoomDialog from "./ZoomDialog";

export default function MenuDialog() {
  const setImage = useImage((state) => state.setImage);
  const setActiveTool = useActiveTool((state) => state.setActiveTool);
  const [popup, setPopup] = useState<
    "file" | "edit" | "view" | "export" | null
  >(null);
  return (
    <DialogContainer className="w-[150px] gap-4">
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("file")}
        onPointerDown={() => setPopup("file")}
        onPointerLeave={() => setPopup(null)}
      >
        <p>File</p>
        <CaretRight />
      </DialogItem>
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("edit")}
        onPointerDown={() => setPopup("edit")}
        onPointerLeave={() => setPopup(null)}
      >
        <p>Edit</p>
        {popup === "edit" ? (
          <div className="absolute left-full w-fit h-fit top-1">
            <ZoomDialog />
          </div>
        ) : (
          <></>
        )}
        <CaretRight />
      </DialogItem>
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("view")}
        onPointerDown={() => setPopup("view")}
        onPointerLeave={() => setPopup(null)}
      >
        <p>View</p>
        <CaretRight />
      </DialogItem>
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("export")}
        onPointerDown={() => setPopup("export")}
        onPointerLeave={() => setPopup(null)}
      >
        <p>Export</p>
        <CaretRight />
      </DialogItem>
      <DialogItem>
        <label htmlFor="image" className="cursor-pointer">
          <p>Upload media</p>
        </label>
        <input
          type="file"
          name="file"
          id="image"
          className="absolute inset-0 invisible size-full z-10 "
          tabIndex={-1}
          multiple={false}
          accept=".jpg,.png"
          onChange={(e) => {
            setActiveTool("pointer");
            if (!e.target.files || !e.target.files[0]) return;
            const file = e.target.files[0];
            generateImage(file, setImage);
          }}
        />
      </DialogItem>
      <hr />
      <Links />
    </DialogContainer>
  );
}
