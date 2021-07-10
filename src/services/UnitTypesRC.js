import routes from "../assests/routes.json";
import {call, getDeleteOptions, getPostOptions, getPutOptions, getRuteIfID} from "./RestCall";

const getUnitTypeRute = ({uri, id} = {}) => {
    return getRuteIfID({uri, path: routes.unit_types, id});
};

export const UnitTypesRC = {
    getPath: () => {
        return routes.unit_types;
    },
    get: ({uri, id, success, error, final}) => {
        call({
            uri: getUnitTypeRute({uri, id}),
            success,
            error,
            final
        });
    },
    post: ({body, success, error, final}) => {
        call({
            uri: getUnitTypeRute(),
            options: getPostOptions(body),
            success,
            error,
            final
        })
    },
    put: ({body, id, success, error, final}) => {
        call({
            uri: getUnitTypeRute({id}),
            options: getPutOptions(body),
            success,
            error,
            final
        })
    },
    delete: ({id, success, error, final}) => {
        call({
            uri: getUnitTypeRute({id}),
            options: getDeleteOptions(),
            success,
            error,
            final
        })
    }
};