import { useState } from "react";
import Button from "./Button";
import { ChevronNe, Minus, Plus } from "./Svg";
import Minimap from "./Minimap";
import useWindowSize from "../../hooks/useWindowSize";
import ZoomDialog from "./dialog/ZoomDialog";
import { useOpenDialog } from "../../store/Store";

export default function Zoom() {
  const [miniActive, setMiniActive] = useState(false);
  const [windowWidth] = useWindowSize();
  const { dialog, setDialog, reset } = useOpenDialog();
  return (
    <>
      {windowWidth >= 768 && (
        <div id="zoom" className="w-fit h-fit" data-testid="zoom">
          <div className="absolute bottom-[calc(100%_-_40px)]">
            <div className="flex justify-center items-center bg-[#1f1e21] px-1 ml-1 mb-1 rounded-lg">
              {windowWidth > 1000 && (
                <>
                  {dialog === "zoom" && (
                    <Button
                      className="rounded-md cursor-not-allowed"
                      title="Not implemented yet"
                      data-testid="minus-button"
                    >
                      <Minus />
                    </Button>
                  )}
                  <Button
                    className="rounded-md"
                    data-testid="hundred-percent-button"
                  >
                    <p>100%</p>
                  </Button>
                  {dialog === "zoom" && (
                    <Button
                      className="rounded-md cursor-not-allowed"
                      title="Not implemented yet"
                      data-testid="plus-button"
                    >
                      <Plus />
                    </Button>
                  )}
                </>
              )}
              <Button
                className="rounded-md"
                data-testid="chevron-button"
                onClick={() => {
                  dialog !== "zoom" ? setDialog("zoom") : reset();
                  setMiniActive((prev) => !prev);
                }}
              >
                <ChevronNe />
              </Button>
            </div>
            {windowWidth > 1000 && (
              <div
                data-testid="minimap"
                id="minimap"
                className={`${!miniActive && "invisible size-0"}`}
              >
                <Minimap />
              </div>
            )}
          </div>
          {windowWidth >= 768 && windowWidth <= 1000 && (
            <dialog
              open={dialog === "zoom"}
              className="m-1 ml-0 bottom-full"
              data-testid="zoom-dialog"
            >
              <ZoomDialog />
            </dialog>
          )}
        </div>
      )}
    </>
  );
}
