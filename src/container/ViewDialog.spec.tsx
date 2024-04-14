import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { ViewDialog } from "./ViewDialog";
import { Data } from "../App"; 

describe('ViewDialog Component', () => {
  const mockData: Data = {
    id: "1",
    title: "Sample Post",
    upvotes: 42,
    date: "2022-04-15"
  };

  const handleClose = jest.fn();

  beforeEach(() => {
    render(<ViewDialog data={mockData} onClose={handleClose} open={true} />);
  });

  it('should display the dialog with correct data', () => {
    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Sample Post")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("2022-04-15")).toBeInTheDocument();  // Assumes format function works correctly
  });

  it('should call onClose when Close button is clicked', () => {
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
