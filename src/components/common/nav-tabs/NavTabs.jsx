import NavTabItem from "./NavTabItem";
import NavTabContent from "./NavTabContent";
import NavTabPane from "./NavTabPane";

const NavTabs = ({children}) => {
    return (
        <ul className="nav nav-tabs" role="tablist">
            {children}
        </ul>
    );
};

export default Object.assign(NavTabs, {
    Item: NavTabItem,
    Content: Object.assign(NavTabContent, {
        Pane: NavTabPane
    })
});