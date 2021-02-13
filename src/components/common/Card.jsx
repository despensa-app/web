import clsx from "clsx";

const Card = ({children, footer, title, className}) => (
    <div className="card">
        {title && (
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
        )}
        <div className={clsx('card-body', className)}>
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