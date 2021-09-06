import clsx from "clsx";
import {useEffect, useState} from "react";

const CustomCheckBox = ({onClick, active = false}) => {

    const [statusCheckBox, setStatusCheckBox] = useState(false);

    useEffect(() => {
        setStatusCheckBox(active);
    }, [active])

    const onClickHandle = () => {
        setStatusCheckBox(!statusCheckBox);
        onClick(!statusCheckBox);
    }

    return (
        <div className="custom-checkbox" onClick={onClickHandle}>
            <div className={clsx("custom-checkbox-box", {active: statusCheckBox})}>
                {statusCheckBox && <i className="fas fa-check"/>}
            </div>
        </div>
    );
};

export default CustomCheckBox;