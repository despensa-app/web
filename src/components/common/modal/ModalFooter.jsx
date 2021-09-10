import clsx from "clsx";

const ModalFooter = ({children, className}) => {
    return (
        <div className={clsx("modal-footer", className)}>
            {children}
        </div>
    );
};

export default ModalFooter;