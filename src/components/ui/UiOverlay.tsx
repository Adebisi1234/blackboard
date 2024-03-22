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
      <div className="flex items-start justify-between mt-1">
        <Pages />
        <div className="flex flex-col items-end mr-1">
          <div className="flex gap-2 items-center">
            <Button>
              <Icon className="bg-pink-700 rounded-full"></Icon>
            </Button>
            <Button className=" !size-fit bg-blue-600 px-4 py-2 rounded-lg ">
              <span>Share</span>
            </Button>
          </div>
          <Panel />
        </div>
      </div>
      <div className="relative flex items-center justify-between h-10">
        <Zoom />

        <Controls />

        <Help />
      </div>
    </div>
  );
}