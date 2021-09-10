import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalHeaderTitle from "./ModalHeaderTitle";
import ModalFooter from "./ModalFooter";

const Modal = ({children, id, backdrop = true, keyboard = true}) => {

    return (
        <div
            className="modal fade"
            id={id}
            tabIndex="-1"
            aria-hidden="true"
            data-backdrop={backdrop}
            data-keyboard={keyboard}>
            <div className="modal-dialog">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Object.assign(Modal, {
    Header: Object.assign(ModalHeader, {
        Title: ModalHeaderTitle
    }),
    Body: ModalBody,
    Footer: ModalFooter
});