import BreadcrumbItem from "./Breadcrumb";

const Content = ({pageHeader, breadcrumbItems, children}) => {
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{pageHeader}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <BreadcrumbItem href="/">
                                    Home
                                </BreadcrumbItem>
                                {breadcrumbItems}
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                {children}
            </section>
        </div>
    );
};

export default Content;