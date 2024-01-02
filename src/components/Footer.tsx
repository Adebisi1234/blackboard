import { useEffect, useRef } from "react";
import { type Tools, type ToolName, type Colors } from "../types/ActiveTools";

const Footer = ({
  setTool,
  tool,
  color,
  setColor,
  title,
  setTitle,
}: {
  setTool: React.Dispatch<React.SetStateAction<Tools>>;
  tool: Tools;
  color: Colors;
  setColor: React.Dispatch<React.SetStateAction<Colors>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const shapeDialogRef = useRef<HTMLDialogElement>(null!);
  const colorDialogRef = useRef<HTMLDialogElement>(null!);
  const colorsRef = useRef<Colors[]>([
    "#f35353",
    "#ff9b3c",
    "#ffd335",
    "#26c281",
    "#2b90ef",
    "#6a46fa",
    "#b05dd9",
    "#fff",
  ]);
  const toolsRef = useRef<Map<ToolName, SVGSVGElement>>(null!);

  const handleChangeTool = (
    target: SVGSVGElement | HTMLDivElement | undefined,
    toolName: ToolName
  ) => {
    shapeDialogRef.current.open && (shapeDialogRef.current.open = false);
    if (!target) return;
    if (
      !(
        toolName === "pencil" ||
        toolName === "eraser" ||
        toolName === "pointer" ||
        toolName === "shapes" ||
        toolName === "text"
      )
    ) {
      return console.error("Error with Tool Selected");
    }
    tool.toolElement?.classList.remove("active");
    if (target.classList.contains("shape")) {
      const shape = target.classList[1];
      console.log(shape);
      setTool({
        toolName,
        toolElement: toolsRef.current.get(toolName)!,
        shape,
      });
    } else {
      setTool({ toolName, toolElement: toolsRef.current.get(toolName)! });
    }
  };
  useEffect(() => {
    handleChangeTool(toolsRef.current.get("pencil"), "pencil");
  }, []);

  const getToolsMap = () => {
    if (!toolsRef.current) {
      toolsRef.current = new Map<ToolName, SVGSVGElement>();
      return toolsRef.current;
    } else {
      return toolsRef.current;
    }
  };
  return (
    <footer>
      <div className="menu">
        <svg>
          <use xlinkHref="#ic-logo"></use>
        </svg>
      </div>
      <input
        className="title"
        placeholder="Enter a title"
        type="text"
        name="title"
        value={title}
        onInput={(ev) => {
          setTitle((ev.target as HTMLInputElement).value);
        }}
      />
      <div className="tools">
        <svg
          className="pointer tool"
          ref={(node) => {
            const toolsMap = getToolsMap();
            toolsMap.set("pointer", node!);
          }}
          onClick={() => {
            handleChangeTool(toolsRef.current.get("pointer"), "pointer");
          }}
        >
          <use xlinkHref="#ic-pointer"></use>
        </svg>
        <svg
          className="pencil tool"
          ref={(node) => {
            const toolsMap = getToolsMap();
            toolsMap.set("pencil", node!);
          }}
          onClick={() => {
            handleChangeTool(toolsRef.current.get("pencil"), "pencil");
          }}
        >
          <use xlinkHref="#ic-pencil"></use>
        </svg>
        <svg
          className="eraser tool"
          ref={(node) => {
            const toolsMap = getToolsMap();
            toolsMap.set("eraser", node!);
          }}
          onClick={() => {
            handleChangeTool(toolsRef.current.get("eraser"), "eraser");
          }}
        >
          <use xlinkHref="#ic-eraser"></use>
        </svg>
        <svg
          className="text tool"
          ref={(node) => {
            const toolsMap = getToolsMap();
            toolsMap.set("text", node!);
          }}
          onClick={() => {
            handleChangeTool(toolsRef.current.get("text"), "text");
          }}
        >
          <use xlinkHref="#ic-text"></use>
        </svg>
        <div>
          <svg
            className="shapes tool"
            ref={(node) => {
              const toolsMap = getToolsMap();
              toolsMap.set("shapes", node!);
            }}
            onClick={() => {
              shapeDialogRef.current.open
                ? (shapeDialogRef.current.open = false)
                : (shapeDialogRef.current.open = true);
            }}
          >
            <use xlinkHref="#ic-shapes"></use>
          </svg>
          <dialog
            className="shape-dialog"
            ref={shapeDialogRef}
            onPointerLeave={() => {
              shapeDialogRef.current.open = false;
            }}
          >
            <div className="shapes_container">
              <div
                className="shape rect"
                onClick={(ev) => {
                  handleChangeTool(
                    ev.currentTarget as HTMLDivElement,
                    "shapes"
                  );
                  shapeDialogRef.current.open = false;
                }}
              ></div>
              <div
                className="shape oval svg_shape"
                onClick={(ev) => {
                  handleChangeTool(
                    ev.currentTarget as HTMLDivElement,
                    "shapes"
                  );
                  shapeDialogRef.current.open = false;
                }}
              >
                <svg viewBox="0 0 40 40" className="shape oval svg_shape">
                  <ellipse
                    cx="20"
                    cy="20"
                    ry={10}
                    rx={18}
                    width={40}
                    height={20}
                    stroke="white"
                    fill="transparent"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div
                className="shape triangle svg_shape"
                onClick={(ev) => {
                  handleChangeTool(
                    ev.currentTarget as HTMLDivElement,
                    "shapes"
                  );
                  shapeDialogRef.current.open = false;
                }}
              >
                <svg viewBox="0 0 40 40" className="shape triangle svg_shape">
                  <polygon
                    points="0,40 20,0 40,40"
                    fill="transparent"
                    stroke="white"
                    strokeWidth={2}
                  ></polygon>
                </svg>
              </div>
              <div
                className="shape circle"
                onClick={(ev) => {
                  handleChangeTool(
                    ev.currentTarget as HTMLDivElement,
                    "shapes"
                  );
                  shapeDialogRef.current.open = false;
                }}
              ></div>
            </div>
          </dialog>
        </div>
      </div>
      <div
        className="colors"
        onClick={() => {
          colorDialogRef.current.open
            ? (colorDialogRef.current.open = false)
            : (colorDialogRef.current.open = true);
        }}
      >
        <div className="color" style={{ backgroundColor: color }}></div>
        <dialog className="colors_dialog" ref={colorDialogRef}>
          <div className="colors_container">
            {colorsRef.current.map((color, i) => {
              return (
                <div
                  key={i}
                  className="color"
                  data-color={`${color}`}
                  style={{ backgroundColor: color }}
                  onClick={(ev) => {
                    setColor(
                      (ev.target as HTMLDivElement).getAttribute(
                        "data-color"
                      ) as Colors
                    );
                  }}
                ></div>
              );
            })}
          </div>
        </dialog>
      </div>

      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <defs>
          <symbol id="ic-pointer" viewBox="0 0 1024 1024">
            <path d="M532.8 1024c-30.4 0-56-17.6-68.8-43.2L9.6 115.2C-8 86.4 0 48 22.4 22.4 48 0 86.4-8 115.2 9.6l865.6 452.8c30.4 12.8 43.2 43.2 43.2 72 0 30.4-20.8 59.2-51.2 68.8L708.8 704l-102.4 264c-12.8 30.4-38.4 48-73.6 56zM94.4 94.4l435.2 835.2 107.2-268.8c4.8-12.8 12.8-20.8 25.6-25.6L931.2 528 94.4 94.4z" />
          </symbol>
          <symbol id="ic-pencil" viewBox="0 0 1024 1024">
            <path
              d="M883.626667 300.373333c16.64-16.64 16.64-44.373333 0-60.16l-99.84-99.84c-15.786667-16.64-43.52-16.64-60.16 0l-78.506667 78.08 160 160M128 736V896h160L759.893333 423.68l-160-160L128 736z"
              fill=""
            />
          </symbol>
          <symbol id="ic-eraser" viewBox="0 0 1024 1024">
            <path d="M889.6 403.2 620.8 134.4 563.2 192 537.6 166.4 179.2 531.2l25.6 25.6L166.4 582.4c-51.2 51.2-51.2 128 0 179.2l89.6 89.6c51.2 51.2 128 51.2 179.2 0l32-32 25.6 25.6 364.8-364.8L832 460.8 889.6 403.2zM620.8 179.2l224 224-38.4 38.4L582.4 211.2 620.8 179.2zM428.8 819.2c-44.8 44.8-115.2 44.8-160 0l-70.4-70.4c-44.8-44.8-44.8-115.2 0-160L224 576 448 800 428.8 819.2z" />
            <path d="M883.2 511c0 11 9 20 19.8 20 11 0 20-9 20-20s-9-20-20-20c-10.8 0.2-19.8 9-19.8 20z" />
          </symbol>
          <symbol id="ic-text" viewBox="0 0 1024 1024">
            <path d="M853.333333 170.666667H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v128a42.666667 42.666667 0 0 0 85.333333 0V256h256v554.666667H384a42.666667 42.666667 0 0 0 0 85.333333h256a42.666667 42.666667 0 0 0 0-85.333333h-85.333333V256h256v85.333333a42.666667 42.666667 0 0 0 85.333333 0V213.333333a42.666667 42.666667 0 0 0-42.666667-42.666666z" />
          </symbol>
          <symbol id="ic-shapes" viewBox="0 0 1024 1024">
            <path d="M832 337.6 832 106.688C832 83.072 812.864 64 789.376 64L106.688 64C83.072 64 64 83.072 64 106.688l0 682.688C64 812.928 83.072 832 106.688 832l251.456 0c62.912 96.192 171.328 160 294.592 160 194.112 0 352-157.952 352-352C1004.736 511.424 935.232 399.04 832 337.6zM128 768 128 128l640 0 0 179.776C731.776 295.168 693.12 288 652.736 288 458.688 288 300.8 445.952 300.8 640c0 45.184 8.896 88.256 24.448 128L128 768zM652.736 928C494.016 928 364.8 798.784 364.8 640s129.216-288 287.936-288 288 129.216 288 288S811.52 928 652.736 928z" />
          </symbol>
          <symbol id="ic-logo" viewBox="0 0 1024 1024">
            <path d="M465.454545 0l0 93.090909L26.949818 93.090909C26.949818 93.090909 0 93.090909 0 116.363636 0 139.636364 26.949818 139.636364 26.949818 139.636364l970.100364 0C997.050182 139.636364 1024 139.636364 1024 116.363636 1024 93.090909 997.050182 93.090909 997.050182 93.090909L558.545455 93.090909 558.545455 0 465.454545 0z" />
            <path d="M156.066909 186.181818C156.066909 186.181818 46.545455 186.181818 46.545455 292.584727l0 531.968C46.545455 930.909091 156.066909 930.909091 156.066909 930.909091l711.866182 0c0 0 109.521455 0 109.521455-106.402909L977.454545 292.584727C977.454545 186.181818 867.933091 186.181818 867.933091 186.181818L156.066909 186.181818z" />
            <path d="M26.949818 1024l970.100364 0c0 0 26.949818 0 26.949818-23.272727 0-23.272727-26.949818-23.272727-26.949818-23.272727L26.949818 977.454545C26.949818 977.454545 0 977.454545 0 1000.727273 0 1024 26.949818 1024 26.949818 1024z" />
          </symbol>
        </defs>
      </svg>
    </footer>
  );
};

export default Footer;
