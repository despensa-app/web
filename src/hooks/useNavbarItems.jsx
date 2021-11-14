import NavbarHandleContext from "../context/NavbarHandleContext";
import {useContext} from "react";

export const useNavbarItems = () => {
    return useContext(NavbarHandleContext).items;
};

export const useSetNavbarItems = () => {
    const context = useContext(NavbarHandleContext);

    return {
        setNavbarMiddleItems: (items) => context.setItems({middle: items, right: []}),
        setNavbarRightItems: (items) => context.setItems({middle: [], right: items}),
        setNavbarItems: ({middle, right}) => context.setItems({middle, right})
    };
};