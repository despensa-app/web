const PageItem = ({children, href, active, onClick}) => {
    const onHandleClick = (e) =>{
        e.preventDefault();
        onClick(href);
    };

    return (
        <li className={`page-item${active ? ' active' : ''}`}>
            <a className="page-link"
               href={href}
               onClick={onHandleClick}
               dangerouslySetInnerHTML={{__html: children}}/>
        </li>
    );
};

const Pagination = ({links, onClick, nameKey}) => {
    return (
        <ul className="pagination m-0 justify-content-center">
            {
                links.map((link, i) => (
                    <PageItem
                        href={link.url}
                        active={link.active}
                        children={link.label}
                        onClick={onClick}
                        key={nameKey + '-page-' + i}/>
                ))
            }
        </ul>
    );
}

export default Pagination;