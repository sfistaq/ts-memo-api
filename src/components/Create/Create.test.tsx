import { screen, fireEvent } from "@testing-library/react";
import { renderWithAllProviders } from "../../helpers";
import Create from "./Create";
import { theme } from "../../styles";

describe("Create Component", () => {
  it("should render", () => {
    renderWithAllProviders(<Create open setOpen={jest.fn()} />);
    const dialog = screen.getByRole("dialog") as HTMLDialogElement;
    const button = screen.getByRole("button", {
      name: "Submit",
    }) as HTMLButtonElement;
    const input = screen.getByRole("textbox") as HTMLTextAreaElement;
    const backdrop = screen.getByTestId("backdrop") as HTMLDivElement;

    const elements = [dialog, button, input, backdrop];
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    expect(button).toHaveAttribute("disabled");

    fireEvent.change(input, { target: { value: "test" } });

    expect(button).not.toHaveAttribute("disabled");
    expect(button).toHaveStyle(
      `background-color: ${theme.palette.primary.main}`
    );
    expect(input).toHaveValue("test");
  });
});
