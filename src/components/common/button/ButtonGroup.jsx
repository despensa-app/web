import clsx from "clsx";

const ButtonGroup = ({children, className}) => {
    return (
        <div className={clsx("btn-group", className)}>
            {children}
        </div>
    );
};

export default ButtonGroup;