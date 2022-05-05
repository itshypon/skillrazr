import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const Modal = ({ showModal, title, content, cancelHandler }: any) => {
  return (
    <Dialog
      className="modal"
      open={showModal}
      onClose={cancelHandler}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="container">
        <div className="body">
          <DialogTitle className="title" id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent
            className="content"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
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
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
