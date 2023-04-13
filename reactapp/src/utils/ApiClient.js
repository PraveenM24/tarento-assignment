const url = "http://localhost:9090";
const queryEndpoint = "/api/v/1";

const executeQuery = async (query) => {
    return await fetch(url + queryEndpoint, {
        method: 'POST',
        body: JSON.stringify({
            query: query
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
            return true;
        });
}

export {
    executeQuery
}