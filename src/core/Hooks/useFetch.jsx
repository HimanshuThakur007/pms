import axios from 'axios';

function useFetch() {
    const ServerRequest = async (config) => {
        try {
            const response = await axios(config);
            return { response, data: response.data };
        } catch (error) {
            return { response: error.response, data: error.response ? error.response.data : {} };
        }
    }

    // Main function to call API
    let callFetch = async (url, label, body) => {
        const ip = process.env.REACT_APP_PRO_BASEURL;
        const port = process.env.REACT_APP_PRO_PORT;
        let baseURL = `${ip}:${port}`;
        console.log('baseURL',baseURL)

        const userData = sessionStorage.getItem('userData');
        const token = userData ? JSON.parse(userData).TokenId : null;

        // Prepare the full URL
        const urlStr = baseURL + url;

        let config = {
            url: urlStr,
            method: label,
            headers: {
                'Accept': 'application/json',
                'CompCode': 'ESCRMDB',
                'Content-Type': 'application/json',
                'FYear': '0',
                'Authorization': token ? `Bearer ${token}` : undefined,
            },
            data: label === 'POST' ? body : undefined,
        };

        let { response, data } = await ServerRequest(config);
        return { res: response, got: data };
    }

    return callFetch;
}

export default useFetch;
