const ContentMain = ({children}) => {
    return (
        <section className="content">
            <div className="container-fluid">
                {children}
            </div>
        </section>
    );
};

export default ContentMain;