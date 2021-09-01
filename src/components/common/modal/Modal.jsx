import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";

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
    Header: ModalHeader,
    Body: ModalBody
});