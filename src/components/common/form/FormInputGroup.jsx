import FormInputGroupAppend from "./FormInputGroupAppend";

const FormInputGroup = ({children}) => {
    return (
        <div className="input-group">
            {children}
        </div>
    );
};

export default Object.assign(FormInputGroup, {
    Append: FormInputGroupAppend
});