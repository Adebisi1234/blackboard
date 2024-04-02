import { useState } from "react";
import Button from "./Button";
import { ChevronNe } from "./Svg";
import Minimap from "./Minimap";
import useWindowSize from "../../hooks/useWindowSize";

export default function Zoom() {
  const [miniActive, setMiniActive] = useState(false);
  const windowWidth = useWindowSize();
  return (
    <>
      {windowWidth > 768 && (
        <div id="zoom" className="w-fit h-fit">
          <div className="absolute bottom-[calc(100%_-_40px)]">
            <div className="flex justify-center items-center bg-[#1f1e21] px-1 ml-1 mb-1 rounded-lg">
              <Button className="rounded-md">
                <p>100%</p>
              </Button>
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
        </div>
      )}
    </>
  );
}
