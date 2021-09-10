const FormControl = ({type, name, id, placeholder, value, onChange, autoComplete, disabled}) => {
    return (
        <input autoComplete={autoComplete}
               type={type}
               value={value}
               onChange={onChange}
               className="form-control"
               name={name}
               id={id}
               placeholder={placeholder}
               disabled={disabled}/>
    );
};

export default FormControl;