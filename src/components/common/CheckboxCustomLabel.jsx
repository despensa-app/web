import clsx from "clsx";

const CheckboxCustomLabel = ({id, value, check = false}) => {
    return (
        <div className="checkbox-custom-label">
            <input className="d-none" type="checkbox" id={id} value={value}/>
            <label className={clsx({check: check})} htmlFor={id}>
                {check && <i className="fas fa-check"/>}
            </label>
        </div>
    );
};

export default CheckboxCustomLabel;