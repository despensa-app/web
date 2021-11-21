import clsx from "clsx";

const NavTabPane = ({children, active, id}) => {
    return (
        <div className={clsx("tab-pane fade", {"show active": active})}
             id={`${id}-tab-pane`}
             role="tabpanel"
             aria-labelledby={id}>
            {children}
        </div>
    );
};

export default NavTabPane;