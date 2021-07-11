import routes from "../assests/routes.json";
import {call, getDeleteOptions, getPostOptions, getPutOptions, getRuteIfID} from "./RestCall";

const getUri = ({uri, id} = {}) => {
    return getRuteIfID({uri, path: routes.products_shopping_list, id});
}

const ProductsShoppingListRC = {
    getPath: () => {
        return routes.products_shopping_list;
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