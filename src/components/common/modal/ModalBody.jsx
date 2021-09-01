import clsx from "clsx";

const ModalBody = ({children, className}) => {
    return (
        <div className={clsx("modal-body", className)}>
            {children}
        </div>
    );
};

export default ModalBody;