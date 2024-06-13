import { Fragment } from "react";
import "./Modal.scss";

interface IModalProps {
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  triggerModal: () => void;
}

const Modal = ({ modal, setModal, triggerModal }: IModalProps) => {
  return (
    <Fragment>
      <br />
      {modal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={triggerModal}>
                &times;
              </span>
              <p>Modal Header</p>
            </div>
            <div className="modal-body">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                perferendis numquam quidem porro reprehenderit, magnam, officia
                modi voluptates cum labore incidunt quo. Optio neque harum nobis
                vero, ex in vel.
              </p>
            </div>
            <div className="modal-footer">
              <p>Modal Footer</p>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Modal;
