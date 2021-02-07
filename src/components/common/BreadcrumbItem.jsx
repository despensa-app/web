import {Link} from "react-router-dom";
import clsx from "clsx";

const BreadcrumbItem = ({active, url, label, preIconClassName}) => {
    const labelRender = (
        <>
            {preIconClassName && <span className={preIconClassName}> </span>  }
            {label}
        </>
    );

    return (
        <li className={clsx('breadcrumb-item', {active})}>
            {active ? labelRender : <Link to={url || '#'}>{labelRender}</Link>}
        </li>
    );
};

const BreadCrumb = ({home, items}) => {
    return (
        <ol className="breadcrumb float-sm-right">
            <BreadcrumbItem {...home}/>
            {
                items.map((item, i) => (
                    <BreadcrumbItem key={`breadcrumb-item-${item.label}-${i}`} {...item}/>
                ))
            }
        </ol>
    );
}

export default BreadCrumb;