import { useDrawing } from "../../../store/Store";
import { Minus, Plus } from "../Svg";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function PageDialog() {
  const { setPage, getPages, page, deletePage } = useDrawing();
  const num = getPages();

  const pages: JSX.Element[] = [];
  for (let i = 0; i < num.length; i++) {
    pages[i] = (
      <DialogItem key={`page:${num[i]}`}>
        <div className="flex gap-3 ml-1 w-full text-left">
          <p>{page === num[i] ? "•" : ""}</p>
          <p
            className="w-full"
            onClick={() => {
              page !== num[i] && setPage(num[i]);
            }}
          >
            Page {num[i]}
          </p>
        </div>
        {num.length !== 1 ? (
          <div
            onClick={() => {
              num.length !== 1 && deletePage(num[i]);
            }}
          >
            <Minus />
          </div>
        ) : (
          <p></p>
        )}
      </DialogItem>
    );
  }
  return (
    <DialogContainer>
      <DialogItem>
        <p>Pages</p>
        <span onClick={() => setPage(num[num.length - 1] + 1)}>
          <Plus />
        </span>
      </DialogItem>
      <hr />
      <>{pages}</>
    </DialogContainer>
  );
}
