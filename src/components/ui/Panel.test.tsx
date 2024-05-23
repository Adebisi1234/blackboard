import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import Panel from "./Panel";
import { useGeneral } from "../../store/Store";

describe("Panel", () => {
  test("renders the panel with buttons and slider", () => {
    render(<Panel />);

    // Check if all buttons are rendered
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(25);

    // Check if the slider is rendered
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
  });

  test("updates general state on button click", () => {
    render(<Panel />);

    // Get the first button
    const button = screen.getByTitle("Color - white");

    // Click the button
    fireEvent.click(button);
    const general = renderHook(() => useGeneral()).result.current.general;

    expect(general.color).toBe("#ffffff");
  });

  test("updates general state on slider input", () => {
    render(<Panel />);

    // Get the slider
    const slider = screen.getByRole("slider");

    // Change the slider value
    fireEvent.input(slider, { target: { value: "0.5" } });

    const general = renderHook(() => useGeneral()).result.current.general;

    expect(general.opacity).toBe(0.5);
  });
});
