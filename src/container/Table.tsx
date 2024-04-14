import { Button, Card, TextField } from "@mui/material";
import { DataGrid, GridColDef, useGridApiRef } from "@mui/x-data-grid";
import { format } from "date-fns";
import { FC, useMemo, useState } from "react";
import { Data } from "../App";

export const Table: FC<{
  onEdit: (row: Data) => void;
  onDelete: (row: Data) => void;
  onView: (row: Data) => void;
  data: Data[];
}> = ({ data, onDelete, onEdit, onView }) => {
  const [search, setSearch] = useState("");
  const api = useGridApiRef();

  const dataToDisplay = useMemo(
    () => (search ? data.filter((row) => row.title.toLowerCase().includes(search.toLowerCase())) : data),
    [data, search]
  );

  const columns: GridColDef<Data>[] = [
    {
      flex: 1,
      field: "title",
      headerName: "Title",
    },
    {
      flex: 1,
      field: "upvotes",
      headerName: "Upvotes",
    },
    {
      flex: 1,
      field: "date",
      headerName: "Date",
      valueGetter: (_, row) => new Date(row.date),
      type: "date",
      renderCell: ({ value }) => format(value, "yyyy-MM-dd"),
    },
    {
      type: "actions",
      width: 220,
      field: "id",
      headerName: "",
      renderCell: ({ row }) => (
        <div className="flex space-x-2">
          <Button onClick={() => onView(row)} variant="contained">
            View
          </Button>
          <Button onClick={() => onEdit(row)} variant="contained" color="info">
            Edit
          </Button>
          <Button onClick={() => onDelete(row)} variant="contained" color="error">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-screen-sm rounded-lg bg-white">
        <TextField
          fullWidth
          placeholder="Search the record"
          onChange={({ target: { value } }) => setSearch(value)}
          type="search" />
      </div>
      <div className="flex items-center justify-center space-x-2">
        <div className="text-sm font-semibold text-gray-600">SORT BY</div>
        <Button variant="contained" onClick={() => api.current.sortColumn("upvotes", "desc")}>
          Most Upvoted
        </Button>
        <Button variant="contained" onClick={() => api.current.sortColumn("date", "desc")}>
          Most Recent
        </Button>
      </div>
      <Card>
        <DataGrid
          apiRef={api}
          className="!border-none"
          columns={columns}
          rows={dataToDisplay ?? []}
          rowSelection={false}
          editMode="row"
          getRowHeight={() => "auto"}
          getRowId={(row) => row.id}
          hideFooter
          pageSizeOptions={[5, 10, 20, 50, 100]}
          autoHeight
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }} />
      </Card>
    </>
  );
};
