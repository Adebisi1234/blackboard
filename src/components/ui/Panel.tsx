import Button from "./Button";
import Icon from "./Icon";
import {
  DashDashed,
  DashDotted,
  DashDraw,
  DashSolid,
  FillNone,
  FillPattern,
  FillSemi,
  FillSolid,
  SizeL,
  SizeM,
  SizeS,
  SizeXL,
} from "./Svg";
import { useActiveTool, useGeneral } from "../../store/Store";

export default function Panel() {
  const { general, setGeneral } = useGeneral();
  const activeTool = useActiveTool((s) => s.activeTool);
  return (
    <>
      {!(activeTool === "eraser" || activeTool === "hand") && (
        <div className="w-[148px] max-w-[148px] relative mr-2 mb-[7px] border-black border bg-[#232529]  mt-2 rounded-lg">
          <div className="grid grid-cols-4 overflow-hidden">
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#ffffff" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#ffffff") {
                  return;
                }
                setGeneral({
                  color: "#ffffff",
                });
              }}
              id="white"
              title="Color - white"
            >
              <Icon className="bg-white rounded-full"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#9398b0" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#9398b0") {
                  return;
                }
                setGeneral({
                  color: "#9398b0",
                });
              }}
              id="grey"
              title="Color - grey"
            >
              <Icon className="rounded-full bg-[#9398b0]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#e599f7" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#e599f7") {
                  return;
                }
                setGeneral({
                  color: "#e599f7",
                });
              }}
              id="light-violet"
              title="Color - light violet"
            >
              <Icon className="rounded-full bg-[#e599f7]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#ae3ec9" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#ae3ec9") {
                  return;
                }
                setGeneral({
                  color: "#ae3ec9",
                });
              }}
              id="Violet"
              title="Color - Violet"
            >
              <Icon className="rounded-full bg-[#ae3ec9]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#4263eb" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#4263eb") {
                  return;
                }
                setGeneral({
                  color: "#4263eb",
                });
              }}
              id="blue"
              title="Color - Blue"
            >
              <Icon className="rounded-full bg-[#4263eb]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#4dabf7" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#4dabf7") {
                  return;
                }
                setGeneral({
                  color: "#4dabf7",
                });
              }}
              id="light-blue"
              title="Color - light blue"
            >
              <Icon className="rounded-full bg-[#4dabf7]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#ffc034" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#ffc034") {
                  return;
                }
                setGeneral({
                  color: "#ffc034",
                });
              }}
              id="yellow"
              title="Color - Yellow"
            >
              <Icon className="rounded-full bg-[#ffc034]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#f76707" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#f76707") {
                  return;
                }
                setGeneral({
                  color: "#f76707",
                });
              }}
              id="orange"
              title="Color - Orange"
            >
              <Icon className="rounded-full bg-[#f76707]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#099268" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#099268") {
                  return;
                }
                setGeneral({
                  color: "#099268",
                });
              }}
              id="green"
              title="Color - Green"
            >
              <Icon className="rounded-full bg-[#099268]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#40c057" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#40c057") {
                  return;
                }
                setGeneral({
                  color: "#40c057",
                });
              }}
              id="light-green"
              title="Color - light Green"
            >
              <Icon className="rounded-full bg-[#40c057]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#ff8787" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#ff8787") {
                  return;
                }
                setGeneral({
                  color: "#ff8787",
                });
              }}
              id="light-red"
              title="Color - light Red"
            >
              <Icon className="rounded-full bg-[#ff8787]"></Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.color === "#e03131" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.color === "#e03131") {
                  return;
                }
                setGeneral({
                  color: "#e03131",
                });
              }}
              id="red"
              title="Color - Red"
            >
              <Icon className="rounded-full bg-[#e03131]"></Icon>
            </Button>
          </div>
          <Button
            className="w-full slider !justify-start px-2"
            title="Visibility Slider"
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              onInput={(e) =>
                setGeneral({
                  opacity: +(e.target as HTMLInputElement).value,
                })
              }
            ></input>
          </Button>
          <div className="grid grid-cols-4 overflow-hidden">
            <Button
              title="fill - None"
              className={`rounded-lg hover:bg-[#333438] ${
                general.fill === 0 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.fill === 0) {
                  return;
                }
                setGeneral({
                  fill: 0,
                });
              }}
            >
              <Icon className="">
                <FillNone />
              </Icon>
            </Button>
            <Button
              title="fill - Semi"
              className={`rounded-lg hover:bg-[#333438] ${
                general.fill === 0.5 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.fill === 0.5) {
                  return;
                }
                setGeneral({
                  fill: 0.5,
                });
              }}
            >
              <Icon className="rounded-full">
                <FillSemi />
              </Icon>
            </Button>
            <Button
              title="fill - Solid"
              className={`rounded-lg hover:bg-[#333438] ${
                general.fill === 1 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.fill === 1) {
                  return;
                }
                setGeneral({
                  fill: 1,
                });
              }}
            >
              <Icon className="rounded-full">
                <FillSolid />
              </Icon>
            </Button>
            <Button
              title="fill - Pattern"
              className={`rounded-lg hover:bg-[#333438] ${
                general.fill === "pattern" && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.fill === "pattern") {
                  return;
                }
                setGeneral({
                  fill: "pattern",
                });
              }}
            >
              <Icon className="rounded-full">
                <FillPattern />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.dash === "draw" && "bg-[#333438]"
              }`}
              title="dash - Draw"
              onClick={() => {
                if (general.dash === "draw") {
                  return;
                }
                setGeneral({
                  dash: "draw",
                });
              }}
            >
              <Icon className="rounded-full">
                <DashDraw />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.dash === 10 && "bg-[#333438]"
              }`}
              title="dash - Dashed"
              onClick={() => {
                if (general.dash === 10) {
                  return;
                }
                setGeneral({
                  dash: 10,
                });
              }}
            >
              <Icon className="rounded-full">
                <DashDashed />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.dash === 2 && "bg-[#333438]"
              }`}
              title="dash - Dotted"
              onClick={() => {
                if (general.dash === 2) {
                  return;
                }
                setGeneral({
                  dash: 2,
                });
              }}
            >
              <Icon className="rounded-full">
                <DashDotted />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.dash === 0 && "bg-[#333438]"
              }`}
              title="dash - Solid"
              onClick={() => {
                if (general.dash === 0) {
                  return;
                }
                setGeneral({
                  dash: 0,
                });
              }}
            >
              <Icon className="rounded-full">
                <DashSolid />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.font === 18 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.font === 18 && general.strokeWidth === 2) {
                  return;
                }
                setGeneral({
                  font: 18,
                  strokeWidth: 2,
                });
              }}
            >
              <Icon className="rounded-full">
                <SizeS />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.font === 24 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.font === 24 && general.strokeWidth === 3.5) {
                  return;
                }
                setGeneral({
                  font: 24,
                  strokeWidth: 3.5,
                });
              }}
            >
              <Icon className="rounded-full">
                <SizeM />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.font === 36 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.font === 36 && general.strokeWidth === 5) {
                  return;
                }
                setGeneral({
                  font: 36,
                  strokeWidth: 5,
                });
              }}
            >
              <Icon className="rounded-full">
                <SizeL />
              </Icon>
            </Button>
            <Button
              className={`rounded-lg hover:bg-[#333438] ${
                general.font === 44 && "bg-[#333438]"
              }`}
              onClick={() => {
                if (general.font === 44 && general.strokeWidth === 10) {
                  return;
                }
                setGeneral({
                  font: 44,
                  strokeWidth: 10,
                });
              }}
            >
              <Icon className="rounded-full">
                <SizeXL />
              </Icon>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
