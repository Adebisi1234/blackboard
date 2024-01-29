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

export default function Panel() {
  return (
    <div className="w-[148px] max-w-[148px] relative mr-2 mb-[7px] border-black border bg-[#232529]  mt-2 rounded-lg">
      <div className="grid grid-cols-4 overflow-hidden">
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="white"
          title="Color - white"
        >
          <Icon className="rounded-full bg-white"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="grey"
          title="Color - grey"
        >
          <Icon className="rounded-full bg-[#9398b0]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="light-violet"
          title="Color - light violet"
        >
          <Icon className="rounded-full bg-[#e599f7]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="Violet"
          title="Color - Violet"
        >
          <Icon className="rounded-full bg-[#ae3ec9]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="blue"
          title="Color - Blue"
        >
          <Icon className="rounded-full bg-[#4263eb]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="light-blue"
          title="Color - light blue"
        >
          <Icon className="rounded-full bg-[#4dabf7]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="yellow"
          title="Color - Yellow"
        >
          <Icon className="rounded-full bg-[#ffc034]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="orange"
          title="Color - Orange"
        >
          <Icon className="rounded-full bg-[#f76707]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="green"
          title="Color - Green"
        >
          <Icon className="rounded-full bg-[#099268]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="light-green"
          title="Color - light Green"
        >
          <Icon className="rounded-full bg-[#40c057]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="light-red"
          title="Color - light Red"
        >
          <Icon className="rounded-full bg-[#ff8787]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="red"
          title="Color - Red"
        >
          <Icon className="rounded-full bg-[#e03131]"></Icon>
        </Button>
      </div>
      <Button className="w-full slider !justify-start px-2">
        <span className="slider-range"></span>
        <span className="slider-ball"></span>
      </Button>

      <div className="grid grid-cols-4 overflow-hidden">
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="">
            <FillNone />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <FillSemi />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <FillSolid />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <FillPattern />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <DashDraw />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <DashDashed />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <DashDotted />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <DashSolid />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <SizeS />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <SizeM />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <SizeL />
          </Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full">
            <SizeXL />
          </Icon>
        </Button>
      </div>
    </div>
  );
}
