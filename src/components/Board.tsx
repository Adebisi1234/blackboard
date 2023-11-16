import { useEffect, useRef } from "react";

const Board = () => {
  const svgRef = useRef<SVGSVGElement>(null!);
  const boardRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    svgRef.current.viewBox.baseVal.height = boardRef.current.offsetHeight;
    svgRef.current.viewBox.baseVal.width = boardRef.current.offsetWidth;
    console.log(svgRef.current.viewBox);
  });
  return (
    <div className="board" ref={boardRef}>
      <svg className="drawingBoard" ref={svgRef}></svg>
    </div>
  );
};

export default Board;
