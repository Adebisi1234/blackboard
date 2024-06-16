import Button from "./Button";
import { Circle, GeoRect, ImageIcon, Note, Triangle } from "./Svg";
import { useActiveTool, useImage } from "../../store/Store";
import useWindowSize from "../../hooks/useWindowSize";
import { generateImage } from "../../utils/drawings";

export default function ExtraControls() {
  const setImage = useImage((state) => state.setImage);
  const { activeTool, setActiveTool, shape } = useActiveTool();
  const [windowWidth] = useWindowSize();
  return (
    <div className="flex gap-1 flex-wrap">
      {windowWidth < 768 && (
        <>
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
              data-testid="file-label"
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
        </>
      )}
      <Button
        className={`rounded-lg  hover:bg-[#2e3034] ${
          activeTool === "shape" && shape === "rect" && "bg-[#4387f4]"
        }`}
        tool="shape"
        title="Tool - shape (Rect)"
        onClick={() => setActiveTool("shape", "rect")}
      >
        <GeoRect />
      </Button>
      <Button
        className={`rounded-lg  relative hover:bg-[#2e3034] ${
          activeTool === "shape" && shape === "oval" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        title="Tool - shape (Circle)"
        onClick={() => setActiveTool("shape", "oval")}
      >
        <Circle />
      </Button>

      <Button
        className={`rounded-lg  relative hover:bg-[#2e3034] ${
          activeTool === "shape" && shape === "tri" && "bg-[#4387f4]"
        }`}
        tool="pointer"
        title="Tool - shape (Circle)"
        onClick={() => setActiveTool("shape", "tri")}
      >
        <Triangle />
      </Button>
    </div>
  );
}
