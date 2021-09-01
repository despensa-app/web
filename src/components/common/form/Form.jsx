import FormInputGroup from "./FormInputGroup";
import FormControl from "./FormControl";
import FormLabel from "./FormLabel";

const Form = ({children, className}) => {
    return (
        <form className={className}>
            {children}
        </form>
    );
};

export default Object.assign(Form, {
    Label: FormLabel,
    InputGroup: FormInputGroup,
    Control: FormControl
});