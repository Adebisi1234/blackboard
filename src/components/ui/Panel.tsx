import { useRef } from "react";
import { General } from "../../types/general";
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

type Prop = {
  general: General;
  setGeneral: React.Dispatch<React.SetStateAction<General>>;
};
export default function Panel({ general, setGeneral }: Prop) {
  return (
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#ffffff",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#9398b0",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#e599f7",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#ae3ec9",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#4263eb",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#4dabf7",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#ffc034",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#f76707",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#099268",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#40c057",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#ff8787",
              };
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
            setGeneral((prev) => {
              return {
                ...prev,
                color: "#e03131",
              };
            });
          }}
          id="red"
          title="Color - Red"
        >
          <Icon className="rounded-full bg-[#e03131]"></Icon>
        </Button>
      </div>
      <Button className="w-full slider !justify-start px-2">
        <input
          type="range"
          min={0}
          max={1}
          step={0.1}
          onInput={(e) =>
            setGeneral((prev) => ({
              ...prev,
              opacity: +(e.target as HTMLInputElement).value,
            }))
          }
        ></input>
      </Button>
      <div className="grid grid-cols-4 overflow-hidden">
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.fill === "none" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.fill === "none") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                fill: "none",
              };
            });
          }}
        >
          <Icon className="">
            <FillNone />
          </Icon>
        </Button>
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.fill === "semi" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.fill === "semi") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                fill: "semi",
              };
            });
          }}
        >
          <Icon className="rounded-full">
            <FillSemi />
          </Icon>
        </Button>
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.fill === "solid" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.fill === "solid") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                fill: "solid",
              };
            });
          }}
        >
          <Icon className="rounded-full">
            <FillSolid />
          </Icon>
        </Button>
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.fill === "pattern" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.fill === "pattern") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                fill: "pattern",
              };
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
          onClick={() => {
            if (general.dash === "draw") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                dash: "draw",
              };
            });
          }}
        >
          <Icon className="rounded-full">
            <DashDraw />
          </Icon>
        </Button>
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.dash === "dashed" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.dash === "dashed") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                dash: "dashed",
              };
            });
          }}
        >
          <Icon className="rounded-full">
            <DashDashed />
          </Icon>
        </Button>
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.dash === "dotted" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.dash === "dotted") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                dash: "dotted",
              };
            });
          }}
        >
          <Icon className="rounded-full">
            <DashDotted />
          </Icon>
        </Button>
        <Button
          className={`rounded-lg hover:bg-[#333438] ${
            general.dash === "solid" && "bg-[#333438]"
          }`}
          onClick={() => {
            if (general.dash === "solid") {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                dash: "solid",
              };
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
            if (general.font === 18) {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                font: 18,
              };
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
            if (general.font === 24) {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                font: 24,
              };
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
            if (general.font === 36) {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                font: 36,
              };
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
            if (general.font === 44) {
              return;
            }
            setGeneral((prev) => {
              return {
                ...prev,
                font: 44,
              };
            });
          }}
        >
          <Icon className="rounded-full">
            <SizeXL />
          </Icon>
        </Button>
      </div>
    </div>
  );
}
