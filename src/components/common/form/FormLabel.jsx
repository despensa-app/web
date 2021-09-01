import clsx from "clsx";

const FormLabel = ({children, hide, htmlFor}) => {
    return (
        <label className={clsx(hide && "sr-only")} htmlFor={htmlFor}>
            {children}
        </label>
    );
};

export default FormLabel;