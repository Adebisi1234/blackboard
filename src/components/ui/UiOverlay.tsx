import useWindowSize from "../../hooks/useWindowSize";
import Button from "./Button";
import Controls from "./Controls";
import Help from "./Help";
import Icon from "./Icon";
import Pages from "./Pages";
import Panel from "./Panel";
import Share from "./Share";
import Zoom from "./Zoom";

export default function Overlay() {
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <div className="flex flex-col justify-between w-full h-full z-[99]">
      <div className="flex items-start justify-between mt-1">
        <Pages />
        <div className="flex flex-col items-end mr-1">
          <div className="flex items-center gap-2">
            {/* <Button>
              <Icon className="bg-pink-700 rounded-full"></Icon>
            </Button> */
            /** Show active users in multi-users mode */}
            <Share />
          </div>
          {windowWidth >= 768 && <Panel />}
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
