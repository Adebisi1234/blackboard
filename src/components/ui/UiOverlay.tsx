import Button from "./Button";
import Controls from "./Controls";
import Help from "./Help";
import Icon from "./Icon";
import Pages from "./Pages";
import Panel from "./Panel";
import Zoom from "./Zoom";
export default function Overlay() {
  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="flex justify-between items-start mt-1">
        <Pages />
        <div className="flex flex-col items-end mr-1">
          <div className="flex gap-2">
            <Button>
              <Icon className="rounded-full bg-pink-700"></Icon>
            </Button>
            <Button className="min-w-[40px] w-fit bg-blue-600 px-4 rounded-lg ">
              <span>Share</span>
            </Button>
          </div>
          <Panel />
        </div>
      </div>
      <div className="flex h-10 justify-between items-center relative">
        <Button>
          <Zoom />
        </Button>
        <Controls />
        <Button>
          <Help />
        </Button>
      </div>
    </div>
  );
}
