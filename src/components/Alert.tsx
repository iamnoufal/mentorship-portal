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
 * @param open boolean - whether the alert window is open or not
 * @param next function() {} - function to be triggered after clicking the OK button
 * @param title string - Title for the alert
 * @param message string - Message for the alert
 * @returns React.Component - An alert window
 * @example
 * <Alert
 *  open={open}
 *  next={() => setOpen(false)}
 *  title="Alert Title"
 *  message="Alert Message"
 * />
 * @see
 * https://mui.com/components/dialogs/#alert-dialogs
 * https://mui.com/components/dialogs/#accessibility
 */
function Alert({
  open,
  next,
  title,
  children,
  message,
}: {
  open: boolean;
  next: () => void;
  title: string;
  children?: React.ReactNode;
  message?: string;
}) {
  return (
    <Dialog open={open} onClose={next}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message || children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={next} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Alert;
