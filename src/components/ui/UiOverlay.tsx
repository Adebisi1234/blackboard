import { ActiveTool, General } from "../../App";
import Button from "./Button";
import Controls from "./Controls";
import Help from "./Help";
import Icon from "./Icon";
import Pages from "./Pages";
import Panel from "./Panel";
import Zoom from "./Zoom";
type Prop = {
  activeTool: ActiveTool;
  setActiveTool: React.Dispatch<React.SetStateAction<ActiveTool>>;
  general: General;
  setGeneral: React.Dispatch<React.SetStateAction<General>>;
  shape: string;
  setShape: React.Dispatch<React.SetStateAction<string>>;
};
export default function Overlay({
  activeTool,
  setActiveTool,
  general,
  setGeneral,
  shape,
  setShape,
}: Prop) {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex items-start justify-between mt-1">
        <Pages />
        <div className="flex flex-col items-end mr-1">
          <div className="flex gap-2">
            <Button>
              <Icon className="bg-pink-700 rounded-full"></Icon>
            </Button>
            <Button className="min-w-[40px] w-fit bg-blue-600 px-4 rounded-lg ">
              <span>Share</span>
            </Button>
          </div>
          <Panel />
        </div>
      </div>
      <div className="relative flex items-center justify-between h-10">
        <Zoom />

        <Controls activeTool={activeTool} setActiveTool={setActiveTool} />

        <Help />
      </div>
    </div>
  );
}
