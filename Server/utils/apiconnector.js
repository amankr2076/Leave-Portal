const axios = require('axios');

const axiosInstance = axios.create({});

const apiConnector = (method, url, bodyData, headers, params) => {
    return axiosInstance({
        method: method,
        url: url,
        data: bodyData || null,
        headers: headers || null,
        params: params || null,
    });
};

// Export the functions using CommonJS syntax
module.exports = { axiosInstance, apiConnector };
