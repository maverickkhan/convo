import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material"
import { format } from "date-fns"
import { FC } from "react"
import { Data } from "../App"

export const ViewDialog: FC<DialogProps & { data?: Data; onClose: () => void }> = ({ data, onClose, ...rest }) => {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...rest}>
      <DialogTitle className="!font-semibold">View</DialogTitle>
      <DialogContent>
        <table className="w-full text-center">
          <thead>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </thead>
          <tbody>
            <td>{data?.title}</td>
            <td>{data?.upvotes}</td>
            <td>{data?.date ? format(new Date(data?.date), "yyyy-MM-dd") : "-"}</td>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
