import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalHeaderTitle from "./ModalHeaderTitle";
import ModalFooter from "./ModalFooter";

const Modal = ({children, id}) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
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