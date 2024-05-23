import { describe, test } from "vitest";
import Text from "./Text";
import { render, renderHook, screen, act } from "@testing-library/react";
import { useDrawing, useGeneral, useLocation } from "../../store/Store";
import { Drawings } from "../../types/general";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe(Text, () => {
  test("Text component renders", async () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;

    const newTextComp = {
      id: 0,
      ...general,
      prop: {
        type: "text",
        value: "",
      },
      pos: {
        x: 10,
        y: 10,
      },
    } satisfies Drawings<"text">[0];
    act(() => {
      setDrawing!(newTextComp);
    });
    const { rerender } = render(
      <Text {...(getDrawing()[0] as Drawings<"text">[0])} />
    );
    const comp = screen.getByTestId(0);
    expect(comp).toBeInTheDocument();
    act(() => {
      updateDrawing(0, { ...newTextComp, opacity: 0 });
    });
    rerender(<Text {...(getDrawing()[0] as Drawings<"text">[0])} />);
    expect(await screen.findByTestId(0)).not.toBeVisible();
  });
  test("Text component can be hidden by opacity", async () => {
    const { setDrawing, getDrawing, updateDrawing } = renderHook(() =>
      useDrawing()
    ).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;

    const newTextComp = {
      id: 0,
      ...general,
      prop: {
        type: "text",
        value: "",
      },
      pos: {
        x: 10,
        y: 10,
      },
    } satisfies Drawings<"text">[0];
    act(() => {
      setDrawing!(newTextComp);
    });
    const { rerender } = render(
      <Text {...(getDrawing()[0] as Drawings<"text">[0])} />
    );
    act(() => {
      updateDrawing(0, { ...newTextComp, opacity: 0 });
    });
    rerender(<Text {...(getDrawing()[0] as Drawings<"text">[0])} />);
    expect(await screen.findByTestId(0)).not.toBeVisible();
  });
  test("Text overlay is properly render", () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;

    const { general } = renderHook(() => useGeneral()).result.current;
    const newTextComp = {
      ...general,
      highlight: true,
      opacity: 1,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "text",
        value: "",
      },
    } satisfies Drawings<"text">[0];
    act(() => {
      setDrawing(newTextComp);
      setLocation({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        id: 0,
      });
    });
    render(<Text {...(getDrawing()[0] as Drawings<"text">[0])} />);
    expect(screen.getByTestId("overlay-0")).toBeInTheDocument();
  });
  test("Text is editable", async () => {
    const { setDrawing, getDrawing } = renderHook(() => useDrawing()).result
      .current;
    const { setLocation } = renderHook(() => useLocation()).result.current;
    const { general } = renderHook(() => useGeneral()).result.current;
    const newTextComp = {
      ...general,
      highlight: true,
      opacity: 1,
      id: 0,
      pos: {
        x: 0,
        y: 0,
      },
      prop: {
        type: "text",
        value: "",
      },
    } satisfies Drawings<"text">[0];
    act(() => {
      setDrawing(newTextComp);
      setLocation({
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        id: 0,
      });
    });
    render(<Text {...(getDrawing()[0] as Drawings<"text">[0])} />);
    const input =
      screen.getByPlaceholderText<HTMLInputElement>("Enter your text");
    await user.type(input, "Hi there");
    expect(input.value).toBe("Hi there");
  });
});
