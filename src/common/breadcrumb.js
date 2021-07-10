import rutes from "../assests/rutes.json";

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

    if (items) {
        productLabel.active = false;
        productLabel.url = rutes.products;

        items.unshift(productLabel);
    }

    return {
        home,
        items
    };
};

const breadcrumb = {
    unitType,
    product
}

export default breadcrumb;