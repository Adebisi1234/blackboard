import { useEffect, useRef, useState } from "react";

const Board = ({ toolName }: { toolName: string }) => {
  const [toolActive, setToolActive] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null!);
  const boardRef = useRef<HTMLDivElement>(null!);
  const pathId = useRef(0);
  const editRef = useRef<HTMLDivElement>(null!);
  const [text, setText] = useState<SVGTextElement>(null!);
  const [paths, setPaths] = useState<{ type: string; path: string }[]>([]);
  const [deletedPaths, setDeletedPaths] = useState<
    { pathId: number; pathDetails: { type: string; path: string } }[]
  >([]);
  console.log(text);
  const handleKeydown = (ev: KeyboardEvent) => {
    if (ev.ctrlKey && ev.key === "z") {
      const tempPaths = [...paths];

      const deletedPath = {
        pathId: pathId.current - (deletedPaths.length + 1),
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
        tempPaths[restoredPath.pathId] = restoredPath.pathDetails;
        setDeletedPaths((currentDeletedPaths) => {
          const tempDeletedPath = [...currentDeletedPaths];
          tempDeletedPath.pop();
          return tempDeletedPath;
        });

        setPaths(tempPaths);
      }
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [paths]);
  useEffect(() => {
    svgRef.current.viewBox.baseVal.height = boardRef.current.offsetHeight;
    svgRef.current.viewBox.baseVal.width = boardRef.current.offsetWidth;
  }, []);

  /* 
    Once a user drag the Pointer a line should be draw following it
    When ctrl + z is pressed delete the most recent line
    The eraser deletes path of the line its on
    The pointer can be used to move the line to other place
    Ctrl + c / x can be used to copy / cut lines and ctrl + v pastes
    Text is used to create text at any place
  

    Idea - Only one state will hold all paths with a structure like this
    {
      pathType: Eraser | text | pencil;
      path: string
    }
  */
  const pathElements = paths.map((pathDetails, key) => {
    if (!pathDetails) return;
    const type = pathDetails.type;
    const path = pathDetails.path;
    return type === "pencil" ? (
      <path d={path} stroke="white" strokeWidth={2} key={key}></path>
    ) : type === "eraser" ? (
      <path
        d={path}
        stroke="#363434"
        strokeWidth={50}
        strokeLinecap="round"
        key={key}
      ></path>
    ) : type === "text" ? (
      <text
        x={path.split(" ")[0]}
        y={path.split(" ")[1]}
        height={20}
        key={key}
        id={`${key}`}
        style={{ minWidth: "30px" }}
        fill="white"
        focusable={true}
        tabIndex={-1}
        onFocus={(ev) => {
          ev.target.classList.add("focused");
          console.log("focused");
          setText(ev.target);
          editRef.current.focus();
        }}
        onBlur={(ev) => {
          ev.target.classList.remove("focused");
        }}
      >
        Test
      </text>
    ) : (
      type === "shape"
    );
  });

  return (
    <div className="board" ref={boardRef}>
      <svg
        className="drawingBoard"
        ref={svgRef}
        onPointerUp={() => {
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
        }}
        onPointerDown={(ev) => {
          setToolActive(true);
          if (toolName === "text") {
            if ((ev.target as SVGTextElement).tagName === "text") {
              return;
            }
            setPaths((currentPath) => {
              const tempPath = [...currentPath];
              if (tempPath[pathId.current]) {
                tempPath[pathId.current].type = "text";
                tempPath[pathId.current].path += `${ev.clientX} ${
                  ev.clientY - boardRef.current.offsetTop
                }`;
              } else {
                tempPath[pathId.current] = {
                  type: "text",
                  path: `${ev.clientX} ${
                    ev.clientY - boardRef.current.offsetTop
                  }`,
                };
              }

              return tempPath;
            });
          }
          if (toolName === "eraser") {
            setPaths((currentPath) => {
              const tempPath = [...currentPath];
              if (tempPath[pathId.current]) {
                tempPath[pathId.current].type = "eraser";
                tempPath[pathId.current].path += `M ${ev.clientX} ${
                  ev.clientY - boardRef.current.offsetTop
                }`;
              } else {
                tempPath[pathId.current] = {
                  type: "eraser",
                  path: `M ${ev.clientX} ${
                    ev.clientY - boardRef.current.offsetTop
                  }`,
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
                tempPath[pathId.current].path += `M ${ev.clientX} ${
                  ev.clientY - boardRef.current.offsetTop
                }`;
              } else {
                tempPath[pathId.current] = {
                  type: "pencil",
                  path: `M ${ev.clientX} ${
                    ev.clientY - boardRef.current.offsetTop
                  }`,
                };
              }
              return tempPath;
            });
          }
        }}
        onPointerMove={(ev) => {
          if (toolActive) {
            if (deletedPaths.length > 0) {
              setDeletedPaths([]);
            }
            if (toolName === "eraser") {
              setPaths((currentPath) => {
                const tempPath = [...currentPath];
                if (tempPath[pathId.current]) {
                  tempPath[pathId.current].path += ` L ${ev.clientX} ${
                    ev.clientY - boardRef.current.offsetTop
                  } M ${ev.clientX} ${ev.clientY - boardRef.current.offsetTop}`;
                }

                return tempPath;
              });
            }
            if (toolName === "pencil") {
              setPaths((currentPath) => {
                const tempPath = [...currentPath];
                if (tempPath[pathId.current]) {
                  tempPath[pathId.current].path += ` L ${ev.clientX} ${
                    ev.clientY - boardRef.current.offsetTop
                  } M ${ev.clientX} ${ev.clientY - boardRef.current.offsetTop}`;
                }

                return tempPath;
              });
            }
          }
        }}
      >
        <foreignObject>
          <div
            contentEditable
            ref={editRef}
            tabIndex={-1}
            onFocus={() => {
              console.log("Focus");
            }}
            onInput={(ev) => {
              text.textContent = (ev.target as HTMLDivElement).textContent;
            }}
            onBlur={(ev) => {
              ev.target.textContent = "";
            }}
          ></div>
        </foreignObject>
        {pathElements}
      </svg>
    </div>
  );
};

export default Board;
