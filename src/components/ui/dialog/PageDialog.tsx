import { useDrawing } from "../../../store/Store";
import DialogContainer from "./DialogContainer";
import DialogItem from "./DialogItem";

export default function PageDialog() {
  const { setPage, getNumOfPages, page, deletePage } = useDrawing();
  const num = getNumOfPages();

  const pages: JSX.Element[] = [];
  for (let i = 1; i < num + 1; i++) {
    pages[i] = (
      <DialogItem key={`page:${i}`}>
        <div
          className="flex gap-3 ml-1 w-full text-left"
          onClick={() => {
            page !== i - 1 && setPage(i - 1);
          }}
        >
          <p>{page === i - 1 ? "•" : ""}</p>
          <p className="w-full">Page {i}</p>
        </div>
        {i !== 1 ? (
          <p onClick={() => i !== 1 && deletePage(i - 1)}>X</p>
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
        <span className="text-xl" onClick={() => setPage(num)}>
          +
        </span>
      </DialogItem>
      <hr />
      <>{pages}</>
    </DialogContainer>
  );
}
