import routes from '../../assests/rutes.json';

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

export const getRute = (path = "") => {
    return `${routes.host}${path}`;
};

export const getRuteIfID = ({uri, path = "", id}) => {
    const rute = getRute(path);

    if (id) {
        return `${rute}/${id}`;
    } else if (uri) {
        return uri;
    }

    return rute;
};

export const getPostOptions = (body) => {
    return getBaseRequestOptions({method: 'POST', body})
}

export const getPutOptions = (body) => {
    return getBaseRequestOptions({method: 'PUT', body})
}

export const getDeleteOptions = () => {
    return getBaseRequestOptions({method: 'DELETE'})
}

export const call = ({uri, options, success, error, final}) => {
    fetch(uri, options)
        .then(async response => {
            const status = response.status;
            const responseJSON = status !== 204 && await response.json();

            if (response.ok) {
                success && success(responseJSON);
            } else {
                error && error(responseJSON)
            }
        })
        .catch(error => console.log(error))
        .finally(final);
}