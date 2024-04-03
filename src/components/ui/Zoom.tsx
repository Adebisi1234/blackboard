import { useState } from "react";
import Button from "./Button";
import { ChevronNe } from "./Svg";
import Minimap from "./Minimap";
import useWindowSize from "../../hooks/useWindowSize";
import ZoomDialog from "./dialog/ZoomDialog";
import { useOpenDialog } from "../../store/Store";

export default function Zoom() {
  const [miniActive, setMiniActive] = useState(false);
  const windowWidth = useWindowSize();
  const { dialog, setDialog, reset } = useOpenDialog();
  return (
    <>
      {windowWidth >= 768 && (
        <div id="zoom" className="w-fit h-fit">
          <div className="absolute bottom-[calc(100%_-_40px)]">
            <div
              className="flex justify-center items-center bg-[#1f1e21] px-1 ml-1 mb-1 rounded-lg"
              onClick={() => {
                if (windowWidth < 1000) {
                  dialog !== "zoom" ? setDialog("zoom") : reset();
                }
              }}
            >
              {windowWidth > 1000 && (
                <Button className="rounded-md">
                  <p>100%</p>
                </Button>
              )}
              <Button
                className="rounded-md"
                onClick={() => setMiniActive((prev) => !prev)}
              >
                <ChevronNe />
              </Button>
            </div>
            <div
              id="minimap"
              className={`${!miniActive && "invisible size-0"}`}
            >
              {/* <Minimap /> */}
            </div>
          </div>
          {windowWidth >= 768 && (
            <dialog
              open={dialog === "zoom"}
              className="bottom-full ml-0 text-sm font-light m-1"
            >
              <ZoomDialog />
            </dialog>
          )}
        </div>
      )}
    </>
  );
}
