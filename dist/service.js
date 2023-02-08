class ReqService {

    interceptorInstance
    constructor(instance) {
        this.interceptorInstance = instance;
    }

     /**
     * Custom http call
     * @param {object} object: destruction of the passed object yield the below properties
     * @property {string} url: suffix of the url e.g. /api/models 
     * @property {string} method: method of the request, e.g. get, post, put, delete
     * @property {Object} data: payload of the request
     * @property {string} params: parameters of the request
     * @return {Promise<AxiosResponse>} http response
     */
     call = ({ url, method, data, params, headers }) => new Promise((resolve, reject) => {
        this.interceptorInstance.request({ url, method, data, params, headers }).then(response => {
           resolve(response.data);
        }, error => {
            reject(error?.response?.data | error.message | 'Unexpected error has occured');
        });
    });

}
module.exports = {
    ReqService
}