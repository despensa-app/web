import Content from "./Content";
import Card from "./Card";
import BreadcrumbItem from "./BreadcrumbItem";
import Pagination from "./Pagination";

const Link = ({href, children, preClassIcon, btnColor, size}) => (
    <a href={href} className={`btn btn-${btnColor}${size ? ' btn-' + size : ''}`}>
        {preClassIcon && <i className={preClassIcon}/>} {children}
    </a>
);

const CardProductShopping = ({title, unitTypes, units, hrefDelete, hrefEdit, hrefView}) => (
    <div className="card bg-light">
        <div className="card-header text-muted border-bottom-0">
            <h2 className="card-title">{title}</h2>
        </div>
        <div className="card-body pt-0">
            <div className="form-group">
                <label>Tipo de unidad</label>
                <input className="form-control" value={unitTypes} disabled/>
            </div>
            <div className="form-group mb-0">
                <label htmlFor="units_per_product">Unidades</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                            <i className="fas fa-plus"/>
                        </span>
                    </div>
                    <input type="number" className="form-control" id="units_per_product" value={units} disabled/>
                    <div className="input-group-append">
                        <div className="input-group-text">
                            <i className="fas fa-minus"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="card-footer">
            <div className="row">
                <div className="col-3">
                    <Link href={hrefDelete} preClassIcon="fas fa-trash" size="sm" btnColor="danger"/>
                </div>
                <div className="col-9 text-right">
                    <Link href={hrefEdit} btnColor="success" size="sm">
                        Editar
                    </Link>
                    <Link href={hrefView} btnColor="primary" size="sm" preClassIcon="fas fa-cart-arrow-down">
                        Ver lista
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const Product = () => {

    const pages = [
        {
            href: "/",
            value: "«"
        },
        {
            href: "/",
            value: "1"
        },
        {
            href: "/",
            value: "2"
        },
        {
            href: "/",
            value: "3"
        },
        {
            href: "/",
            value: "»"
        }
    ];

    const PageHeader = () => (
        <>
            Nombre del producto 01
            <Link href="/" preClassIcon="fas fa-edit" btnColor="primary"/>
            <Link href="/" preClassIcon="fas fa-trash" btnColor="danger"/>
        </>
    );

    const BreadcrumbItems = () => (
        <BreadcrumbItem active="true">
            Productos
        </BreadcrumbItem>
    );

    return (
        <Content pageHeader={<PageHeader/>} breadcrumbItems={<BreadcrumbItems/>}>
            <Card>
                <dl className="row mb-0">
                    <dt className="col-sm-2">Descripción</dt>
                    <dd className="col-sm-10">Descripción del producto</dd>
                    <dt className="col-sm-2">Precio</dt>
                    <dd className="col-sm-10">1,235.58 €</dd>
                    <dt className="col-sm-2">Calorías</dt>
                    <dd className="col-sm-10">10.99 kcal</dd>
                </dl>
            </Card>
            <Card title="Listas de la compra">
                <div className="row d-flex align-items-stretch">
                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                        <CardProductShopping title="Nombre de la lista 01"
                                             unitTypes="unit 01"
                                             units="1"
                                             hrefDelete="/"
                                             hrefEdit="/"
                                             hrefView="/"/>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
                        <CardProductShopping title="Nombre de la lista 02"
                                             unitTypes="unit 02"
                                             units="1"
                                             hrefDelete="/"
                                             hrefEdit="/"
                                             hrefView="/"/>
                    </div>
                </div>
                <Pagination pages={pages}/>
            </Card>
        </Content>
    );
};

export default Product;