import {call, getDeleteOptions, getPostOptions, getPutOptions, getRute, getRuteIfID} from "./RestCall";

const products_path = "/products";

const getUri = ({uri, id, params} = {}) => {
    return getRuteIfID({uri, path: products_path, id, params});
}

const ProductsRC = {
    getPath: ({path = [], host = false} = {}) => {
        return getRute({path: [products_path, ...path], host});
    },
    get: ({uri, id, params, success, error, final}) => {
        call({
            uri: getUri({uri, id, params}),
            success,
            error,
            final
        });
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
    put: ({body, id, success, error, final}) => {
        call({
            uri: getUri({id}),
            options: getPutOptions(body),
            success,
            error,
            final
        })
    },
    delete: ({id, success, error, final}) => {
        call({
            uri: getUri({id}),
            options: getDeleteOptions(),
            success,
            error,
            final
        })
    }
};

export default ProductsRC;