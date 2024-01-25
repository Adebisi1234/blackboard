import Button from "./Button";
import Icon from "./Icon";

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
          id="blue"
          title="Color - blue"
        >
          <Icon className="rounded-full bg-black"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-[#e599f7]"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-[#ae3ec9]"></Icon>
        </Button>
        <Button
          className="rounded-lg hover:bg-[#333438]"
          id="blue"
          title="Color - Blue"
        >
          <Icon className="rounded-full bg-[#4263eb]"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-slate-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-orange-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-cyan-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-indigo-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-violet-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-purple-700"></Icon>
        </Button>
      </div>
      <Button className="w-full">
        <span className="bg-green-500 h-1 w-4/5 after:content-normal after:w-full after:h-1 after:bg-blue-600"></span>
        <span className=" absolute size-4 rounded-full border-2 bg-green-500 left-0"></span>
      </Button>

      <div className="grid grid-cols-4 overflow-hidden">
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-pink-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-red-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-yellow-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-blue-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-green-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-slate-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-orange-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-cyan-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-indigo-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-violet-700"></Icon>
        </Button>
        <Button className="rounded-lg hover:bg-[#333438]">
          <Icon className="rounded-full bg-purple-700"></Icon>
        </Button>
      </div>
    </div>
  );
}
