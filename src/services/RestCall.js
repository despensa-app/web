import routes from '../assests/routes.json';

const getBaseRequestOptions = ({method, body}) => {
    const request = {
        method: method,
        headers: {'Content-Type': 'application/json'}
    };

    if (body) {
        request.body = JSON.stringify(body);
    }

    return request;
};

export const getRute = ({path = [], host = true, params = null}) => {
    let paramsToAdd = "";

    if (params) {
        paramsToAdd = "?" + Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join("&");
    }

    path = path.map(value => {
        if (typeof value !== "string") {
            return value;
        }

        return value.startsWith("/") ? value.substring(1) : value;
    });

    if (host) {
        path.unshift(routes.host);
    }

    path = path.join('/');

    return (host ? path : '/' + path) + paramsToAdd;
};

export const getRuteIfID = ({uri, path = "", id, params}) => {
    if (id) {
        return getRute({path: [path, id], params});
    } else if (uri) {
        return uri;
    }

    return getRute({path: [path], params});
};

export const getPostOptions = (body) => {
    return getBaseRequestOptions({method: 'POST', body})
}

export const getPutOptions = (body) => {
    return getBaseRequestOptions({method: 'PUT', body})
}

export const getDeleteOptions = (body) => {
    return getBaseRequestOptions({method: 'DELETE', body})
}

export const call = ({uri, options, success, error, final}) => {
    fetch(uri, options)
        .then(async response => {
            let responseJSON = {};

            if (response.status !== 204) {
                responseJSON = await response.json();
            }

            if (response.ok) {
                success && success(responseJSON);
            } else {
                error && error(responseJSON)
            }
        })
        .catch(error => console.log(error))
        .finally(final);
}