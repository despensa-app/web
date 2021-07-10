import routes from "../assests/routes.json";
import {call, getDeleteOptions, getPostOptions, getPutOptions, getRuteIfID} from "./RestCall";

const getRoute = ({uri, id} = {}) => {
    return getRuteIfID({uri, path: routes.products, id});
}

const ProductsRC = {
    getPath: () => {
        return routes.products;
    },
    get: ({uri, id, success, error, final}) => {
        call({
            uri: getRoute({uri, id}),
            success,
            error,
            final
        });
    },
    post: ({body, success, error, final}) => {
        call({
            uri: getRoute(),
            options: getPostOptions(body),
            success,
            error,
            final
        })
    },
    put: ({body, id, success, error, final}) => {
        call({
            uri: getRoute({id}),
            options: getPutOptions(body),
            success,
            error,
            final
        })
    },
    delete: ({id, success, error, final}) => {
        call({
            uri: getRoute({id}),
            options: getDeleteOptions(),
            success,
            error,
            final
        })
    }
};

export default ProductsRC;