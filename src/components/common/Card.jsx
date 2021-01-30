const Card = ({children, footer, title}) => (
    <div className="card">
        {title && (
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
        )}
        <div className="card-body">
            {children}
        </div>
        {footer && (
            <div className="card-footer">
                {footer}
            </div>
        )}
    </div>
);

export default Card;