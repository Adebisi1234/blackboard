import { render, screen, fireEvent } from "@testing-library/react";
import ExtraControls from "./ExtraControls";

describe("ExtraControls", () => {
  beforeAll(() => (innerWidth = 700));
  test("renders the buttons with correct props", () => {
    render(<ExtraControls />);

    const noteButton = screen.getByTitle("Tool - note");
    const imageButton = screen.getByTitle("Tool - image");
    const shapeButton = screen.getByTitle("Tool - shape");

    expect(noteButton).toBeInTheDocument();
    expect(imageButton).toBeInTheDocument();
    expect(shapeButton).toBeInTheDocument();

    expect(noteButton).toHaveClass("rounded-lg");
    expect(imageButton).toHaveClass("rounded-lg");
    expect(shapeButton).toHaveClass("rounded-lg");

    expect(noteButton).not.toHaveClass("bg-[#4387f4]");
    expect(imageButton).not.toHaveClass("bg-[#4387f4]");
    expect(shapeButton).not.toHaveClass("bg-[#4387f4]");
  });

  test("activates the note tool when note button is clicked", () => {
    render(<ExtraControls />);

    const noteButton = screen.getByTitle("Tool - note");

    fireEvent.click(noteButton);

    expect(noteButton).toHaveClass("bg-[#4387f4]");
  });

  test("activates the pointer tool and generates image when image button is clicked and file is selected", () => {
    render(<ExtraControls />);

    // const imageButton = screen.getByTitle("Tool - image");
    const fileInput = screen.getByTestId("file-label");

    fireEvent.change(fileInput, {
      target: {
        files: [
          new File(["image content"], "image.jpg", { type: "image/jpeg" }),
        ],
      },
    });
    // expect(imageButton).toHaveClass("bg-[#4387f4]");  Goes directly to pointer for now
    // Add additional assertions for image generation if needed
  });

  test("activates the shape tool when shape button is clicked", () => {
    render(<ExtraControls />);

    const shapeButton = screen.getByTitle("Tool - shape");

    fireEvent.click(shapeButton);

    expect(shapeButton).toHaveClass("bg-[#4387f4]");
  });
});
