import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const Modal = ({
  showModal,
  className,
  fullScreen = false,
  title,
  content,
  cancelHandler,
  hideCloseButton = false,
  hideTitle = false,
}: any) => {
  return (
    <Dialog
      fullScreen={fullScreen}
      className="modal"
      open={showModal}
      onClose={cancelHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className={`container ${className}`}>
        <div className="body">
          <DialogTitle
            className={`${
              hideTitle ? "hidden" : ""
            } title bg-transparent" id="alert-dialog-title`}
          >
            {title}
          </DialogTitle>
          <DialogContent
            className="content"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <DialogContentText id="alert-dialog-description" className="w-full">
              {content}
            </DialogContentText>
          </DialogContent>
          {!hideCloseButton && (
            <DialogActions className="action !px-4">
              <Button
                variant="contained"
                className="primary-button"
                onClick={cancelHandler}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
