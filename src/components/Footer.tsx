import { useEffect, useRef } from "react";
import { type Tools } from "../types/ActiveTools";

const Footer = ({
  setTool,
  tool,
}: {
  setTool: React.Dispatch<React.SetStateAction<Tools>>;
  tool: Tools;
}) => {
  const shapeDialogRef = useRef<HTMLDialogElement>(null!);
  const pencilRef = useRef<HTMLDivElement>(null!);
  const handleChangeTool = (
    ev:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | { target: HTMLDivElement }
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
        toolElement: target.parentElement!.parentElement as HTMLDivElement,
        shape,
      });
    } else {
      setTool({ toolName, toolElement: target });
    }
  };
  useEffect(() => {
    handleChangeTool({ target: pencilRef.current });
  }, []);
  return (
    <footer>
      <div className="tools">
        <div
          className="pointer"
          onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        ></div>
        <div
          className="pencil"
          onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
          ref={pencilRef}
        ></div>
        <div
          className="eraser"
          onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        ></div>
        <div
          className="text"
          onClick={(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            handleChangeTool(ev);
          }}
        ></div>
        <div
          className="shapes"
          onClick={() => {
            shapeDialogRef.current.open
              ? (shapeDialogRef.current.open = false)
              : (shapeDialogRef.current.open = true);
          }}
        >
          <dialog
            className="shape-dialog"
            ref={shapeDialogRef}
            onPointerLeave={() => {
              shapeDialogRef.current.open = false;
            }}
          >
            <div
              className="shape rect"
              onClick={(ev) => {
                handleChangeTool(ev);
              }}
            ></div>
          </dialog>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
