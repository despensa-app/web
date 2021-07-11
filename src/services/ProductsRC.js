import routes from "../assests/routes.json";
import {call, getDeleteOptions, getPostOptions, getPutOptions, getRute, getRuteIfID} from "./RestCall";

const getUri = ({uri, id} = {}) => {
    return getRuteIfID({uri, path: routes.products, id});
}

const ProductsRC = {
    getPath: ({path = [], host = false} = {}) => {
        return getRute({path: [routes.products, ...path], host});
    },
    get: ({uri, id, success, error, final}) => {
        call({
            uri: getUri({uri, id}),
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