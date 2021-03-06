import rutes from "../assests/routes.json";

const home = {
    preIconClassName: 'fas fa-home',
    url: '/'
}

const unitType = () => {
    return {
        home,
        items:
            [
                {
                    label: 'Tipo de unidades',
                    active: true
                }
            ]
    };
};

const product = (items = []) => {
    const productLabel = {
        label: 'Productos',
        active: true
    };

    if (items && items.length) {
        productLabel.active = false;
        productLabel.url = rutes.products;
    }

    return {
        home,
        items: [productLabel, ...items]
    };
};

const BreadCrumbApp = {
    unitType,
    product
}

export default BreadCrumbApp;