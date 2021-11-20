const CommonHeader = ({children, title}) => {
    return (
        <div className="d-flex justify-content-between">
            {title && <h1>{title}</h1>}
            {children}
        </div>
    );
};

export default CommonHeader;