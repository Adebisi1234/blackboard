import Button from "./Button";
import { GeoRect, ImageIcon, Note } from "./Svg";
import { useActiveTool, useImage } from "../../store/Store";
import useWindowSize from "../../hooks/useWindowSize";
import { generateImage } from "../../utils/drawings";

export default function ExtraControls() {
  const setImage = useImage((state) => state.setImage);
  const { activeTool, setActiveTool } = useActiveTool();
  const windowWidth = useWindowSize();
  return (
    <>
      {windowWidth < 768 && (
        <div className="flex gap-1 flex-wrap">
          <Button
            className={`rounded-lg  hover:bg-[#2e3034] ${
              activeTool === "note" && "bg-[#4387f4]"
            }`}
            tool="note"
            title="Tool - note"
            onClick={() => setActiveTool("note")}
          >
            <Note />
          </Button>
          <Button
            className={`rounded-lg  relative hover:bg-[#2e3034] ${
              activeTool === "image" && "bg-[#4387f4]"
            }`}
            tool="pointer"
            title="Tool - image"
          >
            <label
              htmlFor="image"
              className="size-full flex justify-center items-center cursor-pointer"
            >
              <ImageIcon />
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
          </Button>
          <Button
            className={`rounded-lg  hover:bg-[#2e3034] ${
              activeTool === "shape" && "bg-[#4387f4]"
            }`}
            tool="shape"
            title="Tool - shape"
            onClick={() => setActiveTool("shape")}
          >
            <GeoRect />
          </Button>
        </div>
      )}
    </>
  );
}
