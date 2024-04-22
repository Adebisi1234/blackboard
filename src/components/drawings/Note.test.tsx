import {
  render,
  screen,
  renderHook,
  act,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { describe, test } from "vitest";
import Note from "./Note";
import { Drawings } from "../../types/general";
import {
  useActiveTool,
  useDrawing,
  useGeneral,
  useLocation,
} from "../../store/Store";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe(Note, () => {
  test("Note component properly rendered", () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });
    render(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
    expect(screen.getByTestId(0)).toBeInTheDocument();
  });
  test("Note textarea is rendered on doubleClick", async () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newNoteComp = {
      ...general,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "note",
        value: "",
      },
    } satisfies Drawings<"note">[0];
    act(() => {
      setDrawing(newNoteComp);
      setLocation({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        id: 0,
      });
    });

    const { rerender, baseElement } = render(
      <Note {...(getDrawing()[0] as Drawings<"note">[0])} />
    );
    await user.dblClick(baseElement);
    const textarea: HTMLTextAreaElement = await screen.findByTestId(
      "textarea-0"
    );
    const text = "Hi there";
    for (let i = 0; i < text.length; i++) {
      await user.type(textarea, text[i]);
      rerender(<Note {...(getDrawing()[0] as Drawings<"note">[0])} />);
    }

    expect(textarea.value).toBe("Hi there");
  });
});
