import axios from 'axios'
// import { message } from 'antd'


//send request , get response to api/index.js process
async function ajax(url, data = {}, type = 'GET') {
    let response;
    try {
        if (type === 'GET') {
            response = await axios.get(url, { params: data });
        } else {
            response = await axios.post(url, data);
        }
        return response.data;
    } catch (err) {
        //network not working , or server is died
        // message.error('Request error : ' + err.message);
        return { status: 1, msg: 'Request error : ' + err.message };
    }
}







export default ajax;