import useWindowSize from "../../hooks/useWindowSize";
import { useOpenDialog } from "../../store/Store";
import Button from "./Button";
import HelpDialog from "./dialog/HelpDialog";
import { QuestionMark } from "./Svg";

export default function Help() {
  const { dialog, setDialog, reset } = useOpenDialog();
  const [windowWidth, windowHeight] = useWindowSize();
  return (
    <>
      {windowWidth >= 768 && (
        <Button
          className="rounded-full bg-[#1f1e21] p-2 mb-1 size-10"
          onClick={() => (dialog !== "help" ? setDialog("help") : reset())}
        >
          <QuestionMark />
          <dialog open={dialog === "help"} className="bottom-full -left-full">
            <HelpDialog />
          </dialog>
        </Button>
      )}
    </>
  );
}
