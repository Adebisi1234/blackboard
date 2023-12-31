import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { ToolName } from "../types/ActiveTools";
type Paths = {
  type: "pencil" | "eraser" | "pointer" | "text" | "shape";
  path: pathObj;
  x?: number;
  y?: number;
  x1?: number;
  y1?: number;
  width?: number;
  height?: number;
  content?: string;
  shape?: string;
  r?: number;
  rx?: number;
  ry?: number;
  cx?: number;
  cy?: number;
  color?: string;
  triPath?: [
    { x?: number; y?: number },
    { x?: number; y?: number },
    { x?: number; y?: number }
  ];
};
type pathObj = { func: "M" | "L" | "T"; x: number; y: number }[] | null;
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

/* 
    How to handle multi-screen
      each Path will have the viewBox value
 */
const Board = ({
  toolName,
  shape,
  color,
  setTitle,
}: {
  toolName: ToolName;
  shape: string | undefined;
  color: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [toolActive, setToolActive] = useState(false);
  const [windowWidth, windowHeight] = useWindowSize();
  const [activeEl, setActiveEl] = useState<HTMLElement>(null!);
  // const [viewBox, setViewBox] = useState([0, 0]);
  const STROKE_WIDTH = 3;
  const BASE_COLOR = "#fff";
  const svgRef = useRef<SVGSVGElement>(null!);
  const boardRef = useRef<HTMLDivElement>(null!);
  const clearRef = useRef<HTMLDivElement>(null!);
  const pathId = useRef(0);
  const [paths, setPaths] = useState<Paths[]>(() => {
    const tempPaths: Paths[] = localStorage.getItem("paths")
      ? JSON.parse(localStorage.getItem("paths")!)
      : [];
    pathId.current = tempPaths.length;

    return tempPaths;
  });
  const inputsRef = useRef<Map<number, HTMLTextAreaElement>>(null!);
  const [inputs, setInputs] = useState<number[]>([]);
  const [deletedPaths, setDeletedPaths] = useState<
    { id: number; pathDetails: Paths }[]
  >([]);

  const pythag = (x: number, y: number) => {
    return Math.floor(Math.hypot(x, y));
  };

  const scalePath = (path: pathObj) => {
    let newPath = "";
    if (!path?.length) return;
    path.forEach((value, i) => {
      if (!value) return;
      newPath += `${value.func} ${value.x} ${value.y} ${
        i === path.length - 1 ? "z" : ""
      }`;
    });
    return newPath;
  };
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

  //       return path;
  //     });

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
        value={paths[id] ? paths[id].content : ""}
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
    if (
      (ev.target as HTMLElement).tagName !== "TEXTAREA" &&
      ev.ctrlKey &&
      (ev.key === "z" || ev.key === "y")
    ) {
      ev.preventDefault();
    }
    if (ev.ctrlKey && ev.key === "z") {
      const tempPaths = [...paths];

      const deletedPath = {
        id: pathId.current - (deletedPaths.length + 1),
        pathDetails: tempPaths[pathId.current - (deletedPaths.length + 1)],
      };

      if (deletedPath) {
        setDeletedPaths([...deletedPaths, deletedPath]);
        tempPaths.splice(pathId.current - (deletedPaths.length + 1), 1);
        deletedPath.pathDetails?.type === "text" &&
          setInputs((prevInputs) => {
            prevInputs.splice(prevInputs.length - 1);
            return prevInputs;
          });
      }

      setPaths(tempPaths);
    } else if (ev.ctrlKey && ev.key === "y") {
      const tempPaths = [...paths];
      const restoredPath = deletedPaths[deletedPaths.length - 1];

      if (restoredPath && Object.keys(restoredPath).length > 0) {
        tempPaths[restoredPath.id] = restoredPath.pathDetails;
        if (restoredPath.pathDetails?.type === "text") {
          setInputs((currentInputs) => {
            currentInputs.push(restoredPath.id);
            return currentInputs;
          });
        }
      }
      setDeletedPaths((currentDeletedPaths) => {
        const tempDeletedPath = [...currentDeletedPaths];
        tempDeletedPath.pop();
        return tempDeletedPath;
      });
      setPaths(tempPaths);
    } else if (ev.key === "Delete") {
      setActiveEl((prevEl) => {
        if (!prevEl) return null!;
        if (paths[+prevEl.id]) {
          const tempPath = [...paths];
          tempPath.splice(+prevEl.id, 1);
          setPaths(tempPath);
        }
        prevEl.style.outline = "initial";
        return null!;
      });
    }
  };
  const getY = (num: number) => num - boardRef.current.offsetTop;
  const handlePointerDown = (ev: React.PointerEvent<SVGSVGElement>) => {
    ev.preventDefault();
    setToolActive(true);
    if (toolName !== "pointer" && activeEl) {
      setActiveEl((prevEl) => {
        if (prevEl) {
          prevEl.style.outline = "inherit";
        }
        return null!;
      });
    }
    if (toolName === "shapes") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        tempPath[pathId.current] = {
          type: "shape",
          shape,
          path: null,
          content: "",
          color,
        };
        return tempPath;
      });
    } else if (toolName === "pointer") {
      if (
        (ev.target as SVGSVGElement).tagName === "svg" ||
        (ev.target as SVGPathElement).classList.contains("eraser")
      ) {
        setActiveEl((prevEl) => {
          if (prevEl) {
            prevEl.style.outline = "inherit";
          }
          return null!;
        });
      } else {
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
      }
    } else if (toolName === "text") {
      if (
        (ev.target as SVGTextElement).tagName === "text" ||
        (ev.target as SVGTextElement).tagName === "tspan"
      ) {
        (ev.target as SVGTextElement).focus();
        return;
      }
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        tempPath[pathId.current] = {
          type: "text",
          path: null,
          x: ev.clientX,
          y: getY(ev.clientY),
          content: "",
          color,
        };
        return tempPath;
      });
      setInputs((currentInputs) => {
        currentInputs.push(pathId.current);
        return currentInputs;
      });
    } else if (toolName === "eraser") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        if (tempPath[pathId.current]) {
          tempPath[pathId.current].type = "eraser";
          tempPath[pathId.current].path?.push({
            func: "M",
            x: ev.clientX,
            y: getY(ev.clientY),
          });
        } else {
          tempPath[pathId.current] = {
            type: "eraser",
            path: [{ func: "M", x: ev.clientX, y: getY(ev.clientY) }],
          };
        }
        return tempPath;
      });
    } else if (toolName === "pencil") {
      setPaths((currentPath) => {
        const tempPath = [...currentPath];
        if (tempPath[pathId.current]) {
          tempPath[pathId.current].type = "pencil";
          tempPath[pathId.current].path?.push({
            func: "M",
            x: ev.clientX,
            y: getY(ev.clientY),
          });
        } else {
          tempPath[pathId.current] = {
            type: "pencil",
            path: [{ func: "M", x: ev.clientX, y: getY(ev.clientY) }],
            color,
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
      if (toolName === "shapes") {
        if (shape === "rect") {
          setPaths((currentPath) => {
            const tempPath = [...currentPath];
            if (tempPath[pathId.current]) {
              if (!(tempPath[pathId.current].x && tempPath[pathId.current].y)) {
                tempPath[pathId.current].x = ev.clientX;
                tempPath[pathId.current].x1 = ev.clientX;
                tempPath[pathId.current].y = getY(ev.clientY);
                tempPath[pathId.current].y1 = getY(ev.clientY);
              }
              if (ev.clientX < tempPath[pathId.current].x1!) {
                let diff = Math.abs(ev.clientX - tempPath[pathId.current].x1!);
                tempPath[pathId.current].x! =
                  tempPath[pathId.current].x1! - diff;
                tempPath[pathId.current].width = diff;
              } else {
                tempPath[pathId.current].width =
                  ev.clientX - tempPath[pathId.current].x!;
              }
              if (getY(ev.clientY) < tempPath[pathId.current].y1!) {
                let diff = Math.abs(
                  getY(ev.clientY) - tempPath[pathId.current].y1!
                );
                tempPath[pathId.current].y! =
                  tempPath[pathId.current].y1! - diff;
                tempPath[pathId.current].height = diff;
              } else {
                tempPath[pathId.current].height =
                  getY(ev.clientY) - tempPath[pathId.current].y!;
              }
            }

            return tempPath;
          });
        } else if (shape === "circle") {
          setPaths((currentPath) => {
            const tempPath = [...currentPath];
            if (tempPath[pathId.current]) {
              if (!(tempPath[pathId.current].x && tempPath[pathId.current].y)) {
                tempPath[pathId.current].x = ev.clientX;
                tempPath[pathId.current].y = getY(ev.clientY);
              }
              tempPath[pathId.current].r = pythag(
                ev.clientX - tempPath[pathId.current].x!,
                getY(ev.clientY) - tempPath[pathId.current].y!
              );
            }

            return tempPath;
          });
        } else if (shape === "oval") {
          const tempPath = [...paths];

          if (!(tempPath[pathId.current].x && tempPath[pathId.current].y)) {
            tempPath[pathId.current].x = ev.clientX;
            tempPath[pathId.current].y = getY(ev.clientY);
          }
          tempPath[pathId.current].cx =
            tempPath[pathId.current].x ?? ev.clientX;
          tempPath[pathId.current].cy =
            tempPath[pathId.current].y ?? getY(ev.clientY);
          tempPath[pathId.current].rx =
            Math.abs(ev.clientX - tempPath[pathId.current].x!) ?? 0;
          tempPath[pathId.current].ry =
            Math.abs(getY(ev.clientY) - tempPath[pathId.current].y!) ?? 0;

          setPaths(tempPath);
        } else if (shape === "triangle") {
          const tempPath = [...paths];

          if (tempPath[pathId.current]) {
            if (!(tempPath[pathId.current].x1 && tempPath[pathId.current].y1)) {
              tempPath[pathId.current].x1 = ev.clientX;
              tempPath[pathId.current].y1 = getY(ev.clientY);
            }
            tempPath[pathId.current].x = ev.clientX;
            tempPath[pathId.current].y = getY(ev.clientY);
            tempPath[pathId.current].width = Math.abs(
              ev.clientX - tempPath[pathId.current].x1!
            );
          }
          tempPath[pathId.current].triPath = createTrianglePath(
            tempPath[pathId.current].x1,
            tempPath[pathId.current].y1,
            tempPath[pathId.current].x,
            tempPath[pathId.current].y,
            tempPath[pathId.current].width
          );

          setPaths(tempPath);
        }
      } else if (toolName === "pointer" && activeEl) {
        activeEl.style.transform = `translate(calc(${
          ev.clientX % innerWidth
        }px - 50%), calc(${ev.clientY % innerHeight}px - 50%))  `;
      } else if (toolName === "eraser") {
        setPaths((currentPath) => {
          const tempPath = [...currentPath];
          if (tempPath[pathId.current]) {
            tempPath[pathId.current].path?.push(
              { func: "L", x: ev.clientX, y: getY(ev.clientY) },
              { func: "M", x: ev.clientX, y: getY(ev.clientY) }
            );
          }

          return tempPath;
        });
      } else if (toolName === "pencil") {
        setPaths((currentPath) => {
          const tempPath = [...currentPath];
          if (tempPath[pathId.current]) {
            tempPath[pathId.current].path?.push(
              { func: "L", x: ev.clientX, y: getY(ev.clientY) },
              { func: "M", x: ev.clientX, y: getY(ev.clientY) }
            );
          }

          return tempPath;
        });
      }
    }
  };
  const handlePointerUp = () => {
    setToolActive(false);
    if (toolName === "pointer") return;
    pathId.current += 1;
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    localStorage.setItem("paths", JSON.stringify(paths));
    if (paths.length === 0) {
      clearRef.current.classList.add("hidden");
    } else if (
      paths.length !== 0 &&
      clearRef.current.classList.contains("hidden")
    ) {
      clearRef.current.classList.remove("hidden");
    }
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [paths]);
  useEffect(() => {
    svgRef.current.viewBox.baseVal.height = boardRef.current.offsetHeight;
    svgRef.current.viewBox.baseVal.width = boardRef.current.offsetWidth;

    // setViewBox([
    //   svgRef.current.viewBox.baseVal.width,
    //   svgRef.current.viewBox.baseVal.height,
    // ]);
    // document.body.style.setProperty("--svg-w", `${viewBox[0]}px`);
    // document.body.style.setProperty("--svg-h", `${viewBox[1]}px`);
  }, [windowWidth, windowHeight]);

  const pathElements = paths.map((details, key) => {
    if (!details) return;
    const type = details.type;
    const path = details.path;
    switch (type) {
      case "pencil":
        return (
          <path
            d={scalePath(path)}
            focusable={true}
            tabIndex={0}
            stroke={details.color || BASE_COLOR}
            id={`${key}`}
            strokeWidth={STROKE_WIDTH}
            key={key}
          ></path>
        );
      case "eraser":
        return (
          <path
            focusable={true}
            tabIndex={0}
            d={scalePath(path)}
            stroke="#222"
            id={`${key}`}
            className="eraser"
            strokeWidth={50}
            strokeLinecap="round"
            key={key}
          ></path>
        );
      case "pointer":
        return;
      case "shape":
        if (details.shape === "rect") {
          return (
            <g key={key}>
              <rect
                id={`${key}`}
                x={details.x}
                y={details.y}
                fill="none"
                stroke={details.color || BASE_COLOR}
                strokeWidth={STROKE_WIDTH}
                width={details.width}
                height={details.height}
              ></rect>
            </g>
          );
        } else if (details.shape === "circle") {
          return (
            <g key={key}>
              <circle
                cx={details.x}
                cy={details.y}
                r={details.r}
                id={`${key}`}
                fill="none"
                stroke={details.color || BASE_COLOR}
                strokeWidth={STROKE_WIDTH}
              ></circle>
            </g>
          );
        } else if (details.shape === "oval") {
          return (
            <g key={key}>
              <ellipse
                rx={details.rx}
                ry={details.ry}
                x={details.x}
                y={details.y}
                id={`${key}`}
                cx={details.cx}
                cy={details.cy}
                fill="none"
                stroke={details.color || BASE_COLOR}
                strokeWidth={STROKE_WIDTH}
              ></ellipse>
            </g>
          );
        } else if (details.shape === "triangle") {
          return (
            <g key={key}>
              <polygon
                points={joinTrianglePath(details.triPath)}
                id={`${key}`}
                fill="none"
                stroke={details.color || BASE_COLOR}
                strokeWidth={STROKE_WIDTH}
              ></polygon>
            </g>
          );
        }
        return null;

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
                color: details.color,
              }}
              fill={details.color}
              tabIndex={0}
              onFocus={(ev) => {
                ev.target.style.opacity = "1";

                inputsRef.current.get(+ev.target.id)?.focus();
              }}
              onClick={(ev) => {
                inputsRef.current.get(+(ev.target as HTMLElement).id)?.focus();
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
                      onClick={(ev) => {
                        inputsRef.current
                          .get(+(ev.target as HTMLElement).parentElement!.id)
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

  return (
    <div className="board" ref={boardRef} data-tool={toolName}>
      <div
        className="clear"
        ref={clearRef}
        onClick={() => {
          setPaths([]);
          localStorage.setItem("title", "");
          setTitle("");
        }}
      >
        clear
      </div>
      {inputEl}
      <svg
        className="drawingBoard"
        ref={svgRef}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {pathElements}
        {/* <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/> // ellipse guide  */}
        {/* <polygon points="100,100 150,50 200,100"></polygon> //triangle guide */}
      </svg>
    </div>
  );
};

const joinTrianglePath = (path: Paths["triPath"]) => {
  const trianglePath = path
    ?.map(({ x, y }) => {
      return `${x}, ${y} `;
    })
    .join("");

  return trianglePath;
};

const createTrianglePath = (
  x1: number | undefined,
  y1: number | undefined,
  x: number | undefined,
  y: number | undefined,
  width: number | undefined
) => {
  if (x && y && y1 && x1 && width) {
    let top = { x: x1, y: y1 };
    let leftBottom = { x: 0, y: y };
    let rightBottom = { x: 0, y: y };
    if (x > x1) {
      leftBottom = { x: x1 - width, y };
      rightBottom = { x, y };
    } else if (x < x1) {
      leftBottom = { x, y };
      rightBottom = { x: x1 + width, y };
    }
    return [leftBottom, top, rightBottom] as Paths["triPath"];
  }
  return [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ] as Paths["triPath"];
};

export default Board;
