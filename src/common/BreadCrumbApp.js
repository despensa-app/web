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
    const item = {
        label: 'Productos',
        active: true
    };

    if (items && items.length) {
        item.active = false;
        item.url = rutes.products;
    }

    return {
        home,
        items: [item, ...items]
    };
};

const shoppingList = (items = []) => {
    const item = {
        label: 'Lista de la compra',
        active: true
    };

    if (items && items.length) {
        item.active = false;
        item.url = rutes.products;
    }

    return {
        home,
        items: [item, ...items]
    };
};

const BreadCrumbApp = {
    unitType,
    product,
    shoppingList
}

export default BreadCrumbApp;