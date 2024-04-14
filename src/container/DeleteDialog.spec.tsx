import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { DeleteDialog } from "./DeleteDialog";

describe('DeleteDialog Component', () => {
  const handleClose = jest.fn();
  const handleConfirm = jest.fn();

  beforeEach(() => {
    render(
      <DeleteDialog
        data={{ id: "1", title: "Example", upvotes: 100, date: "2023-01-01" }}
        onClose={handleClose}
        onConfirm={handleConfirm}
        open={true}
      />
    );
  });

  it('should display the dialog', () => {
    expect(screen.getByText(/delete confirm/i)).toBeInTheDocument();
    expect(screen.getByText(/you sure you want to delete ?/i)).toBeInTheDocument();
  });

  it('should call onClose when No button is clicked', () => {
    const noButton = screen.getByText('No');
    fireEvent.click(noButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onConfirm when Yes button is clicked', () => {
    const yesButton = screen.getByText('Yes');
    fireEvent.click(yesButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
