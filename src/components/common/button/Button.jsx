import clsx from "clsx";

const Button = ({children, className, variant, onClick}) => {
    const prefix = "btn";

    return (
        <button
            className={clsx(prefix, className, variant && `${prefix}-${variant}`)}
            type="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;