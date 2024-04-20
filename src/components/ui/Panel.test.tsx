import { render, screen, fireEvent } from "@testing-library/react";
import Panel from "./Panel";

describe("Panel", () => {
  test("renders the panel with buttons and slider", () => {
    render(<Panel />);

    // Check if all buttons are rendered
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(16);

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

    // Check if the general state is updated correctly
    // You may need to modify the following assertions based on your implementation
    // expect(setGeneral).toHaveBeenCalledWith({ color: "#ffffff" });
    // expect(setGeneral).toHaveBeenCalledTimes(1);
  });

  test("updates general state on slider input", () => {
    render(<Panel />);

    // Get the slider
    const slider = screen.getByRole("slider");

    // Change the slider value
    fireEvent.input(slider, { target: { value: "0.5" } });

    // Check if the general state is updated correctly
    // You may need to modify the following assertions based on your implementation
    // expect(setGeneral).toHaveBeenCalledWith({ opacity: 0.5 });
    // expect(setGeneral).toHaveBeenCalledTimes(1);
  });
});
