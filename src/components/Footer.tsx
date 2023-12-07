import { useEffect, useRef } from "react";
import { type Tools } from "../types/ActiveTools";

type ToolName = "pencil" | "eraser" | "pointer" | "shape" | "text";
const Footer = ({
  setTool,
  tool,
}: {
  setTool: React.Dispatch<React.SetStateAction<Tools>>;
  tool: Tools;
}) => {
  const shapeDialogRef = useRef<HTMLDialogElement>(null!);
  const pencilRef = useRef<HTMLDivElement>(null!);
  const toolsRef = useRef<Map<ToolName, SVGSVGElement>>(null!);
  const handleChangeTool = (
    ev: React.MouseEvent<SVGSVGElement | HTMLDivElement, MouseEvent>
  ) => {
    shapeDialogRef.current.open && (shapeDialogRef.current.open = false);
    const target = ev.target as HTMLDivElement;
    const toolName = target.classList[0];
    if (
      !(
        toolName === "pencil" ||
        toolName === "eraser" ||
        toolName === "pointer" ||
        toolName === "shape" ||
        toolName === "text"
      )
    ) {
      return console.error("Error with Tool Selected");
    }
    tool.toolElement?.classList.remove("active");
    if (target.classList.contains("shape")) {
      const shape = target.classList[1];
      setTool({
        toolName,
        toolElement: target.parentElement!.parentElement!
          .parentElement as HTMLDivElement,
        shape,
      });
    } else {
      setTool({ toolName, toolElement: target });
    }
  };
  // useEffect(() => {
  //   handleChangeTool({ target: pencilRef.current });
  // }, []);
  return (
    <footer>
      <div className="menu"></div>
      <input
        className="title"
        placeholder="Enter a title"
        type="text"
        name="title"
      />
      <div className="tools">
        <svg
          className="pointer tool"
          onClick={(ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        >
          <use xlinkHref="#ic-pointer"></use>
        </svg>
        <svg
          className="pencil tool"
          onClick={(ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        >
          <use xlinkHref="#ic-pencil"></use>
        </svg>
        <svg
          className="eraser tool"
          onClick={(ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        >
          <use xlinkHref="#ic-eraser"></use>
        </svg>
        <svg
          className="text tool"
          onClick={(ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        >
          <use xlinkHref="#ic-text"></use>
        </svg>
        <div>
          <svg
            className="shapes tool"
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
            <div className="dialog_container">
              <div
                className="shape rect"
                onClick={(ev) => {
                  shapeDialogRef.current.open = false;
                  handleChangeTool(ev);
                }}
              ></div>
              <div
                className="shape circle"
                onClick={(ev) => {
                  shapeDialogRef.current.open = false;
                  handleChangeTool(ev);
                }}
              ></div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="colors">
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
      </div>
    </footer>
  );
};

export default Footer;
