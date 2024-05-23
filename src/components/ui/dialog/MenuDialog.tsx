import { useState } from "react";
import { useActiveTool, useImage } from "../../../store/Store";
import { generateImage } from "../../../utils/drawings";
import Links from "../Links";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";
import { CaretRight } from "../Svg";
import ZoomDialog from "./ZoomDialog";
import EditPopup from "./EditPopup";
import ExportPopup from "./ExportPopup";
import FilePopup from "./FilePopup";
import useWindowSize from "../../../hooks/useWindowSize";
export default function MenuDialog() {
  const setImage = useImage((state) => state.setImage);
  const setActiveTool = useActiveTool((state) => state.setActiveTool);
  const [popup, setPopup] = useState<
    "file" | "edit" | "view" | "export" | null
  >(null);
  const [windowWidth] = useWindowSize();

  return (
    <DialogContainer
      className="w-[150px] gap-4"
      data-testid="menu-dialog"
      onPointerOut={() => windowWidth > 1000 && setPopup(null)} //large screen only
    >
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("file")}
        onPointerDown={() => setPopup("file")}
      >
        <p>File</p>
        {popup === "file" ? (
          <div className="absolute cursor-pointer left-full w-fit h-fit top-1">
            <FilePopup />
          </div>
        ) : (
          <></>
        )}
        <CaretRight />
      </DialogItem>
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("edit")}
        onPointerDown={() => setPopup("edit")}
      >
        <p>Edit</p>
        {popup === "edit" ? (
          <div className="absolute cursor-pointer left-full w-fit h-fit top-1">
            <EditPopup />
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
      >
        <p>View</p>
        {popup === "view" ? (
          <div className="absolute cursor-pointer left-full w-fit h-fit top-1">
            <ZoomDialog />
          </div>
        ) : (
          <></>
        )}
        <CaretRight />
      </DialogItem>
      <DialogItem
        className="relative"
        onPointerOver={() => setPopup("export")}
        onPointerDown={() => setPopup("export")}
      >
        <p>Export</p>
        {popup === "export" ? (
          <div className="absolute cursor-pointer left-full w-fit h-fit top-1">
            <ExportPopup />
          </div>
        ) : (
          <></>
        )}
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
          className="absolute inset-0 z-10 invisible size-full "
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
