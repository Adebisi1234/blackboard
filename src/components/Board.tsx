import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
type Paths = {
  type: "pencil" | "eraser" | "pointer" | "text" | "shape";
  path: string;
  x?: number;
  y?: number;
  y2?: number;
  x2?: number;
  content?: string;
  shape?: string;
};
/* 
    Once a user drag the Pointer a line should be draw following it
    When ctrl + z is pressed delete the most recent line
    The eraser deletes path of the line its on
    The pointer can be used to move the line to other place
    Ctrl + c / x can be used to copy / cut lines and ctrl + v pastes
    Text is used to create text at any place
  

    Idea - Only one state will hold all paths with a structure like this
    {
      pathType: Eraser | text | pencil | shape;
      path: string
    }
  */
const Board = ({
  toolName,
  shape,
}: {
  toolName: string;
  shape: string | undefined;
}) => {
  const [toolActive, setToolActive] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [activeEl, setActiveEl] = useState<HTMLElement>(null!);
  const [viewBox, setViewBox] = useState([0, 0]);
  const svgRef = useRef<SVGSVGElement>(null!);
  const boardRef = useRef<HTMLDivElement>(null!);
  const pathId = useRef(0);
  const [paths, setPaths] = useState<Paths[]>([]);
  const inputsRef = useRef<Map<number, HTMLTextAreaElement>>(null!);
  const [inputs, setInputs] = useState<number[]>([]);
  const [deletedPaths, setDeletedPaths] = useState<
    { id: number; pathDetails: Paths }[]
  >([]);

  // So as to support multiple screen sizes, Getting hella messy I'll do this later
  // useEffect(() => {
  //   const updateView = () => {
  //     const tempPaths = [...paths]
  //     const numberRegEx = tempPaths.map((pathDetails) => {
  //       let path = pathDetails.path.match(/[M,L]+\s+\d+\s+\d+\s/g);
  //       if(!path) return []
  //       path = [...path].map((string) => {
  //         const func = string.split(" ")[0]
  //         const x = string.split(" ")[1]
  //         const y = string.split(" ")[2]
  //         return `${func} ${x} ${y}`
  //       })
  //       console.log(path);
  //       return path;
  //     });
  //     console.log(numberRegEx);
  //   };
  //   updateView();
  // }, [paths]);

  const getInputMap = () => {
    if (!inputsRef.current) {
      inputsRef.current = new Map();
      return inputsRef.current;
    } else {
      return inputsRef.current;
    }
  };

  const inputEl = inputs.map((id, key) => {
    return (
      <textarea
        id={`${key}`}
        ref={(node) => {
          const inputMap = getInputMap();
          inputMap.set(id, node!);
        }}
        key={key}
        onFocus={() => {
          console.log("ready");
        }}
        onInput={(ev) => {
          const tempPath = [...paths];
          if (!(tempPath[id] && tempPath[id].type === "text")) return;
          tempPath[id].content = (ev.target as HTMLInputElement).value;
          setPaths(tempPath);
        }}
      ></textarea>
    );
  });

  const handleKeydown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.key === "z") {
      const tempPaths = [...paths];

      const deletedPath = {
        id: pathId.current - (deletedPaths.length + 1),
        pathDetails: tempPaths[pathId.current - (deletedPaths.length + 1)],
      };

      if (deletedPath) {
        setDeletedPaths([...deletedPaths, deletedPath]);
        tempPaths.splice(pathId.current - (deletedPaths.length + 1), 1);
      }

      setPaths(tempPaths);
    } else if (ev.ctrlKey && ev.key === "y") {
      const tempPaths = [...paths];
      const restoredPath = deletedPaths[deletedPaths.length - 1];
      if (restoredPath) {
        tempPaths[restoredPath.id] = restoredPath.pathDetails;
        setDeletedPaths((currentDeletedPaths) => {
          const tempDeletedPath = [...currentDeletedPaths];
          tempDeletedPath.pop();
          return tempDeletedPath;
        });

        setPaths(tempPaths);
      }
    } else if (ev.key === "Delete") {
      const tempPath = [...paths];
      tempPath.splice(+activeEl.id, 1);
      setPaths(tempPath);
      setActiveEl(null!);
    }
  };
  const getY = (num: number) => num - boardRef.current.offsetTop;
  const handlePointerDown = (ev: React.PointerEvent<SVGSVGElement>) => {
    ev.preventDefault();
    setToolActive(true);
    if ((toolName = "shape")) {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        tempPath[pathId.current] = {
          type: "shape",
          path: "",
          content: "",
          x: ev.clientX,
          y: getY(ev.clientY),
          x2: ev.clientX + 20,
          y2: getY(ev.clientY) + 20,
        };
        return tempPath;
      });
    }
    if (toolName === "pointer") {
      console.log(ev.target);
      if ((ev.target as SVGSVGElement).tagName === "svg") return;
      setActiveEl((prevEl) => {
        if (prevEl) {
          prevEl.style.outline = "inherit";
        }
        if ((ev.target as HTMLElement).tagName === "tspan") {
          (ev.target as HTMLElement).parentElement!.style.outline = "dashed";
          return (ev.target as HTMLElement).parentElement!;
        }
        (ev.target as HTMLElement).style.outline = "dashed";
        return ev.target as HTMLElement;
      });
    } else {
      setActiveEl((prevEl) => {
        if (prevEl) {
          prevEl.style.outline = "inherit";
        }
        return null!;
      });
    }
    if (toolName === "text") {
      if (
        (ev.target as SVGTextElement).tagName === "text" ||
        (ev.target as SVGTextElement).tagName === "tspan"
      ) {
        console.log(ev.target);
        (ev.target as SVGTextElement).focus();
        return;
      }
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        tempPath[pathId.current] = {
          type: "text",
          path: "",
          x: ev.clientX,
          y: getY(ev.clientY),
          content: "",
        };
        return tempPath;
      });
      setInputs((currentInputs) => {
        currentInputs.push(pathId.current);
        return currentInputs;
      });
    }
    if (toolName === "eraser") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        if (tempPath[pathId.current]) {
          tempPath[pathId.current].type = "eraser";
          tempPath[pathId.current].path += `M ${ev.clientX} ${getY(
            ev.clientY
          )}`;
        } else {
          tempPath[pathId.current] = {
            type: "eraser",
            path: `M ${ev.clientX} ${getY(ev.clientY)}`,
          };
        }
        return tempPath;
      });
    }
    if (toolName === "pencil") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        if (tempPath[pathId.current]) {
          tempPath[pathId.current].type = "pencil";
          tempPath[pathId.current].path += `M ${ev.clientX} ${getY(
            ev.clientY
          )}`;
        } else {
          tempPath[pathId.current] = {
            type: "pencil",
            path: `M ${ev.clientX} ${getY(ev.clientY)}`,
          };
        }
        return tempPath;
      });
    }
  };
  const handlePointerMove = (ev: React.PointerEvent<SVGSVGElement>) => {
    if (toolActive) {
      if (deletedPaths.length > 0) {
        setDeletedPaths([]);
      }
      if (toolName === "eraser") {
        setPaths((currentPath) => {
          const tempPath = [...currentPath];
          if (tempPath[pathId.current]) {
            tempPath[pathId.current].path += ` L ${ev.clientX} ${getY(
              ev.clientY
            )} M ${ev.clientX} ${getY(ev.clientY)}`;
          }

          return tempPath;
        });
      }
      if (toolName === "pencil") {
        setPaths((currentPath) => {
          const tempPath = [...currentPath];
          if (tempPath[pathId.current]) {
            tempPath[pathId.current].path += ` L ${ev.clientX} ${getY(
              ev.clientY
            )} M ${ev.clientX} ${getY(ev.clientY)}`;
          }

          return tempPath;
        });
      }
    }
  };
  const handlePointerUp = () => {
    setToolActive(false);
    pathId.current += 1;

    if (toolName === "eraser") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        if (tempPath[pathId.current]) {
          tempPath[pathId.current].path += "z";
        }

        return tempPath;
      });
    }

    if (toolName !== "pencil") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        if (tempPath[pathId.current]) {
          tempPath[pathId.current].path += "z";
        }

        return tempPath;
      });
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [paths]);
  useEffect(() => {
    svgRef.current.viewBox.baseVal.height = boardRef.current.offsetHeight;
    svgRef.current.viewBox.baseVal.width = boardRef.current.offsetWidth;
    if (!(viewBox[0] === 0 && viewBox[1] === 0)) return;
    setViewBox([
      svgRef.current.viewBox.baseVal.width,
      svgRef.current.viewBox.baseVal.height,
    ]);
  }, [windowWidth, windowHeight]);

  const pathElements = paths.map((details, key) => {
    if (!details) return;
    const type = details.type;
    const path = details.path;
    switch (type) {
      case "pencil":
        return (
          <path
            d={path}
            focusable={true}
            tabIndex={0}
            stroke="white"
            id={`${key}`}
            strokeWidth={2}
            key={key}
          ></path>
        );
      case "eraser":
        return (
          <path
            focusable={true}
            tabIndex={0}
            d={path}
            stroke="#363434"
            id={`${key}`}
            strokeWidth={50}
            strokeLinecap="round"
            key={key}
          ></path>
        );
      case "pointer":
        return;
      case "shape":
        return (
          <g key={key}>
            <rect
              id={`${key}`}
              x={details.x}
              y={details.y}
              x2={details.x2}
              y2={details.y2}
            ></rect>
          </g>
        );
      case "text":
        return (
          <g key={key}>
            <text
              x={details.x}
              y={details.y}
              height={20}
              id={`${key}`}
              style={{
                minWidth: "30px",
                fontSize: "24px",
                opacity: details.content === "" ? 0.5 : 1,
              }}
              fill="white"
              tabIndex={0}
              onFocus={(ev) => {
                ev.target.style.opacity = "1";

                inputsRef.current.get(+ev.target.id)?.focus();
              }}
            >
              {details.content
                ? details.content.split(/\n/).map((value, i) => (
                    <tspan
                      tabIndex={0}
                      focusable={true}
                      key={i}
                      x={details.x}
                      y={details.y! + i * 24}
                      onFocus={(ev) => {
                        ev.target.style.opacity = "1";
                        inputsRef.current
                          .get(+ev.target.parentElement!.id)
                          ?.focus();
                      }}
                    >
                      {value}
                    </tspan>
                  ))
                : "Click here to edit"}
            </text>
          </g>
        );
      default:
        break;
    }
  });
  console.log(paths);

  return (
    <div className="board" ref={boardRef}>
      {inputEl}
      <svg
        className="drawingBoard"
        ref={svgRef}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {pathElements}
      </svg>
    </div>
  );
};

export default Board;
