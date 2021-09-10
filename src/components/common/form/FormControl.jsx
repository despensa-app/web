import clsx from "clsx";

const FormControl = ({type, name, id, placeholder, value, onChange, autoComplete, disabled, className}) => {
    return (
        <input autoComplete={autoComplete}
               type={type}
               value={value}
               onChange={onChange}
               className={clsx("form-control", className)}
               name={name}
               id={id}
               placeholder={placeholder}
               disabled={disabled}/>
    );
};

export default FormControl;