import clsx from "clsx";

const NavTabItem = ({children, active, id}) => {
    return (
        <li className="nav-item" role="presentation">
            <a className={clsx("nav-link border-radius-0", {active})}
               id={`${id}-nav-item`}
               data-toggle="tab"
               href={`#${id}-tab-pane`}
               role="tab"
               aria-controls={id}
               aria-selected={active ? "true" : "false"}>
                {children}
            </a>
        </li>
    );
};

export default NavTabItem;