import Button from "./button/Button";
import {useEffect, useState} from "react";

const CustomButtonLoad = ({onClick, metaPage}) => {

    const [render, setRender] = useState(false);

    useEffect(() => {
        setRender(canRender());
    }, [metaPage]);

    const canRender = () => {
        if (!metaPage) {
            return false;
        }

        const {current_page, last_page} = metaPage;

        return current_page < last_page;
    };

    return (
        <>
            {
                render && (
                    <Button className="btn-block mb-3" variant="default" onClick={onClick}>
                        <i className="fas fa-spinner pr-1"/>
                        Cargar más
                    </Button>)
            }
        </>
    );
};

export default CustomButtonLoad;