import Content from "../common/Content";
import Card from "../common/Card";
import BreadcrumbItem from "../common/BreadcrumbItem";
import Pagination from "../common/Pagination";
import Link from "../common/Link";
import CardProductShopping from "./CardProductShoppin";

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