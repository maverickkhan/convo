import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material"
import { FC } from "react"
import { Data } from "../App"

export const DeleteDialog: FC<DialogProps & { data?: Data; onClose: () => void; onConfirm: () => void }> = ({
  data,
  onClose,
  onConfirm,
  ...rest
}) => {
  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...rest}>
      <DialogTitle className="!font-semibold">Delete Confirm</DialogTitle>
      <DialogContent>You sure you want to delete ?</DialogContent>
      <DialogActions>
        <Button className="!min-w-20" color="inherit" onClick={onClose}>No</Button>
        <Button className="!min-w-20" onClick={onConfirm} variant="contained" color="error" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
}
