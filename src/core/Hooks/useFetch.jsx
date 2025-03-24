// import axios from 'axios';
// import { useAuthContext } from '../common/AuthContext';
// // import { useSelector } from 'react-redux';


// function useFetch() 
// {
//     const { url, port, state, actions } = useAuthContext();
//     var myUrl = url
//     const decData = state.decryptedData;
//     // console.log('decData',decData)
//     var { Token } = decData;
//     // const { user } = useSelector((state) => state.auth);
//     const ServerRequest = async (config) => {
//         try {
//             const response = await axios(config);
//             return { response, data: response.data };
//         } catch (error) {
//             return { response: error.response, data: error.response ? error.response.data : {} };
//         }
//     }

//     // Main function to call API
//     let callFetch = async (url, label, body) => {
//         // const ip = process.env.REACT_APP_PRO_BASEURL;
//         // const port = process.env.REACT_APP_PRO_PORT;
//         let baseURL = port ? `${myUrl}:${port}` : myUrl;
//         console.log('baseURL',baseURL)

//         // const userData = sessionStorage.getItem('userData');
//         const token = decData ? Token : null;
//         // console.log('tttttyyyy',token)

//         // Prepare the full URL
//         const urlStr = baseURL + url;

//         let config = {
//             url: urlStr,
//             method: label,
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': token ? `Bearer ${token}` : undefined,
//             },
//             data: label === 'POST' ? body : undefined,
//         };

//         let { response, data } = await ServerRequest(config);
//         return { res: response, got: data };
//     }

//     return callFetch;
// }

// export default useFetch;

import axios from 'axios';
import { useAuthContext } from '../common/AuthContext';

function useFetch() {
    const { url, port, state } = useAuthContext();
    var myUrl = url;
    const decData = state.decryptedData;
    var { Token } = decData || {}; // Ensure decData exists to avoid errors

    const ServerRequest = async (config) => {
        try {
            const response = await axios(config);
            return { response, data: response.data };
        } catch (error) {
            return { response: error.response, data: error.response ? error.response.data : {} };
        }
    };

    let callFetch = async (url, method, body) => {
        let baseURL = port ? `${myUrl}:${port}` : myUrl;
        // console.log('baseURL', baseURL);

        const urlStr = baseURL + url;

        let config = {
            url: urlStr,
            method,
            headers: {
                'Accept': 'application/json',
                ...(Token && { 'Authorization': `Bearer ${Token}` }) 
            },
            data: method === 'POST' ? body : undefined,
        };

        let { response, data } = await ServerRequest(config);
        return { res: response, got: data };
    };

    return callFetch;
}

export default useFetch;

