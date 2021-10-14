import {call, getDeleteOptions, getPostOptions, getPutOptions, getRuteIfID} from "./RestCall";

const productShoppingListPath = "/products-shopping-list";

const getUri = ({uri, id} = {}) => {
    return getRuteIfID({uri, path: productShoppingListPath, id});
}

const ProductsShoppingListRC = {
    getPath: () => {
        return productShoppingListPath;
    },
    post: ({body, success, error, final}) => {
        call({
            uri: getUri(),
            options: getPostOptions(body),
            success,
            error,
            final
        })
    },
    put: ({body, success, error, final}) => {
        call({
            uri: getUri(),
            options: getPutOptions(body),
            success,
            error,
            final
        })
    },
    delete: ({body, success, error, final}) => {
        call({
            uri: getUri(),
            options: getDeleteOptions(body),
            success,
            error,
            final
        })
    }
};

export default ProductsShoppingListRC;