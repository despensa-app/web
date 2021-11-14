import NavbarItemsContext from "../context/NavbarItemsContext";
import {useContext} from "react";

export const useNavbarItems = () => {
    return useContext(NavbarItemsContext).items;
};

export const useSetNavbarItems = () => {
    const context = useContext(NavbarItemsContext);

    return {
        setNavbarMiddleItems: (items) => context.setItems({middle: items, right: []}),
        setNavbarRightItems: (items) => context.setItems({middle: [], right: items}),
        setNavbarItems: ({middle, right}) => context.setItems({middle, right})
    };
};