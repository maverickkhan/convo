import '@testing-library/jest-dom';
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "./Table";  // Adjust the import path as needed

const mockData = [
  { id: "1", title: "First Post", upvotes: 10, date: new Date(2021, 0, 1).toISOString() },
  { id: "2", title: "Second Post", upvotes: 5, date: new Date(2022, 1, 1).toISOString() }
];

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();
const mockOnView = jest.fn();


describe("Table Component", () => {
    beforeEach(() => {
      render(
        <Table
          data={mockData}
          onDelete={mockOnDelete}
          onEdit={mockOnEdit}
          onView={mockOnView}
        />
      );
    });
  
    it("renders data correctly", () => {
      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.getByText("Second Post")).toBeInTheDocument();
    });
  
    it("allows user to search for a record", () => {
      const searchInput = screen.getByPlaceholderText("Search the record");
      fireEvent.change(searchInput, { target: { value: "First" } });
      expect(screen.getByText("First Post")).toBeInTheDocument();
      expect(screen.queryByText("Second Post")).toBeNull();
    });
  
    it("calls onView when View button is clicked", () => {
      const viewButtons = screen.getAllByText("View");
      fireEvent.click(viewButtons[0]);
      expect(mockOnView).toHaveBeenCalledWith(mockData[0]);
    });
  
    it("calls onEdit when Edit button is clicked", () => {
      const editButtons = screen.getAllByText("Edit");
      fireEvent.click(editButtons[0]);
      expect(mockOnEdit).toHaveBeenCalledWith(mockData[0]);
    });
  
    it("calls onDelete when Delete button is clicked", () => {
      const deleteButtons = screen.getAllByText("Delete");
      fireEvent.click(deleteButtons[0]);
      expect(mockOnDelete).toHaveBeenCalledWith(mockData[0]);
    });
  });
  