import type { MemosData } from "../../@types/memo";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithAllProviders } from "../../helpers";
import BottomControls from "./BottomControls";
import { FilterType, STATUS } from "../../helpers";
import { theme } from "../../styles";

const buttonsText = ["All", "Active", "Completed", "Delete Completed"];

const mockMemos: MemosData[] = [
  {
    id: 1,
    user_id: 1,
    title: "title",
    due_on: "2020-01-01",
    status: STATUS.PENDING,
  },
  {
    id: 1,
    user_id: 1,
    title: "title",
    due_on: "2020-01-01",
    status: STATUS.COMPLETED,
  },
];

describe("BottomControls Component", () => {
  it("should render", () => {
    renderWithAllProviders(
      <BottomControls
        memos={[]}
        filterByStatus={FilterType.All}
        setFilterByStatus={jest.fn()}
      />
    );

    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];

    buttons.forEach((button, index) => {
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(buttonsText[index]);
    });
    expect(buttons.length).toBe(4);

    expect(buttons[0]).toHaveStyle(`
        background-color: ${theme.palette.primary.main};
    `);
    buttons.slice(1).forEach((button) => {
      expect(button).toHaveAttribute("disabled");
    });
  });

  it("should render with memos", () => {
    const mockFun = jest.fn();
    renderWithAllProviders(
      <BottomControls
        memos={mockMemos}
        filterByStatus={FilterType.All}
        setFilterByStatus={mockFun}
      />
    );
    const buttons = screen.getAllByRole("button") as HTMLButtonElement[];

    buttons.forEach((button) => {
      expect(button).not.toHaveAttribute("disabled");
    });

    expect(buttons[0]).toHaveStyle(`
    background-color: ${theme.palette.primary.main};
`);
    expect(buttons[3]).toHaveStyle(`
background-color: ${theme.palette.error.main};
`);

    fireEvent.click(buttons[1]);
    expect(mockFun).toHaveBeenCalledWith(FilterType.Active);
    fireEvent.click(buttons[2]);
    expect(mockFun).toHaveBeenCalledWith(FilterType.Completed);
    fireEvent.click(buttons[3]);
    expect(mockFun).toHaveBeenCalled();
  });
});
