const BreadcrumbItem = ({page}) => {
    const className = "breadcrumb-item";

    if (page.active) {
        return <li className={`${className} active`}>{page.name}</li>;
    }

    return (
        <li className={className}>
            <a href={page.href}>{page.name}</a>
        </li>
    );
};

const Breadcrumb = ({pages}) => (
    <ol className="breadcrumb float-sm-right">
        {
            pages.map((page, i) => <BreadcrumbItem key={i} page={page}/>)
        }
    </ol>
);

export default Breadcrumb;