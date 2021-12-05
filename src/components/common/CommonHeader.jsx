import clsx from "clsx";

const CommonHeader = ({children, title, className}) => {
    return (
        <div className={clsx("d-flex justify-content-between", className)}>
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
};

export default CommonHeader;