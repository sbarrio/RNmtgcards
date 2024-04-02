import axios from 'axios';

const CancelToken = axios.CancelToken;
const DEFAULT_TIMEOUT = 20000; // in ms

// Glogal axios config
axios.defaults.timeout = DEFAULT_TIMEOUT;

class Request {

    static get(url, cancelSource, headers) {

        let options = {
        }

        if (headers) {
            options["headers"] = headers;
        }

        if (cancelSource) {
            options["cancelToken"] = cancelSource.token;
        }

        return axios.get(url, options).then( response => {

            return response;

        }).catch( thrown => {

            if (axios.isCancel(thrown)) {
                console.log("Request cancelled " + thrown.message);
            } else {
                throw thrown;
            }

        }).catch( error => {
            throw error;
        })

    }

    static getNewCancelSource() {
        return CancelToken.source();
    }

    static cancelRequest(cancelSource) {
        cancelSource.cancel("Operation cancelled by user");
    }


}

export default Request;