import clsx from "clsx";
import {useState} from "react";

const CheckboxCustomLabel = ({id, value, onClick}) => {

    const [isCheck, setIsCheck] = useState(false);

    const onClickHandle = () => {
        setIsCheck(!isCheck);
        onClick();
    }

    return (
        <div className="checkbox-custom-label" onClick={onClickHandle}>
            <input className="d-none" type="checkbox" id={id} value={value}/>
            <label className={clsx({check: isCheck})} htmlFor={id}>
                {isCheck && <i className="fas fa-check"/>}
            </label>
        </div>
    );
};

export default CheckboxCustomLabel;