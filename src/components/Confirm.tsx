import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

/**
 * 
 * @param open boolean - whether the confirm window is open or not
 * @param next function() {} - function to be triggered after clicking the OK button
 * @param closeFunc function() {} - specify what should happen when the confirm window is closed
 * @param title string - Title for the confirm
 * @param message string - Message for the confirm
 * @returns React.Component - A confirm window
 * @example
 * <Confirm
 *  open={open}
 *  next={() => setOpen(false)}
 *  closeFunc={() => setOpen(false)}
 *  title="Confirm Title"
 *  message="Confirm Message"
 * />
 * @see
 * https://mui.com/components/dialogs/#confirm-dialogs
 */
function Confirm(
  open: boolean,
  next: () => void,
  closeFunc: () => void,
  title: string,
  message: string
) {
  return (
    <Dialog open={open} onClose={closeFunc}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeFunc}>Disagree</Button>
        <Button onClick={next} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;
