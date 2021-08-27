import ContentHeader from "./ContentHeader";
import ContentMain from "./ContentMain";

const Content = ({children}) => {
    return (
        <div className="content-wrapper">
            {children}
        </div>
    );
};

export default Object.assign(Content, {
    Header: ContentHeader,
    Main: ContentMain
});