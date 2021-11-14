import NavbarNavItem from "./NavbarNavItem";
import NavbarNav from "./NavbarNav";
import {useContext} from "react";
import NavbarHandleContext from "../../../context/NavbarHandleContext";

const Navbar = () => {

    const {items} = useContext(NavbarHandleContext);

    return (
        <nav className="main-header navbar navbar-expand fixed-bottom navbar-white navbar-light d-flex justify-content-between">
            <NavbarNav>
                <NavbarNavItem>
                    <button className="btn" data-widget="pushmenu" type="button">
                        <i className="fas fa-bars"/>
                    </button>
                </NavbarNavItem>
            </NavbarNav>
            <NavbarNav>
                {
                    items.middle.map((value, i) => (
                        <NavbarNavItem key={`navbar-nav-item-middle-${i}`}>
                            {value}
                        </NavbarNavItem>
                    ))
                }
            </NavbarNav>
            <NavbarNav>
                {
                    items.right.map((value, i) => (
                        <NavbarNavItem key={`navbar-nav-item-right-${i}`}>
                            {value}
                        </NavbarNavItem>
                    ))
                }
            </NavbarNav>
        </nav>
    );
};

export default Navbar;