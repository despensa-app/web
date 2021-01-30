const PageItem = ({children, href}) => (
    <li className="page-item">
        <a className="page-link" href={href}>{children}</a>
    </li>
);

const Pagination = ({pages}) => {
    return (
        <ul className="pagination m-0 justify-content-center">
            {
                pages.map((page, i) => (
                    <PageItem href={page.href} key={i}>{page.value}</PageItem>
                ))
            }
        </ul>
    );
}

export default Pagination;