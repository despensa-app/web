const ContentHeader = ({children}) => {
    return (
        <section className="content-header">
            <div className="container-fluid">
                {children}
            </div>
        </section>
    );
};

export default ContentHeader;