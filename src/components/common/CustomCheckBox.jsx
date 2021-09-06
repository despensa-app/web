import clsx from "clsx";
import {useEffect, useState} from "react";

const CustomCheckBox = ({onClick, selected = false}) => {

    const [isCheck, setIsCheck] = useState(false);

    useEffect(() => {
        setIsCheck(selected);
    }, [selected])

    const onClickHandle = () => {
        setIsCheck(!isCheck);
        onClick(!isCheck);
    }

    return (
        <div className="checkbox-custom-label" onClick={onClickHandle}>
            <div className={clsx({check: isCheck})}>
                {isCheck && <i className="fas fa-check"/>}
            </div>
        </div>
    );
};

export default CustomCheckBox;