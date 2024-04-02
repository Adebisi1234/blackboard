import useWindowSize from "../../hooks/useWindowSize";
import { useOpenDialog } from "../../store/Store";
import Button from "./Button";
import { QuestionMark } from "./Svg";

export default function Help() {
  const { dialog, setDialog } = useOpenDialog();
  const windowWidth = useWindowSize();
  return (
    <>
      {windowWidth > 768 && (
        <Button
          className="rounded-full bg-[#1f1e21] p-2 mb-1 size-10"
          onClick={() => setDialog("help")}
        >
          <QuestionMark />
          <dialog open={dialog === "help"}></dialog>
        </Button>
      )}
    </>
  );
}
