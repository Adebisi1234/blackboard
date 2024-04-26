import { render, screen, act } from "@testing-library/react";
import { vi, describe, test } from "vitest";
import MenuDialog from "./MenuDialog";

describe(MenuDialog, () => {
  test("should render properly", async () => {
    render(<MenuDialog />);
    const menuDialog = screen.getByTestId("menu-dialog");
    const fileButton = screen.getByText("File");
    const editButton = screen.getByText("Edit");
    const viewButton = screen.getByText("View");
    const exportButton = screen.getByText("Export");
    const mediaButton = screen.getByText("Upload media");

    expect(menuDialog).toBeInTheDocument();
    expect(fileButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();
    expect(viewButton).toBeInTheDocument();
    expect(exportButton).toBeInTheDocument();
    expect(mediaButton).toBeInTheDocument();
  });
});
