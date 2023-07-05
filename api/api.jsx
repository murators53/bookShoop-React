import axios from "axios"

const api = () => {
    
    // axios.get('/admin').then(res=>console.log(res)) burda kullansak baseUrl sini degistirmyordu
    //biz baseUrlsini degistirip o sekilde return edip kullanacaz diger componentlerde
    axios.defaults.baseURL=  'http://localhost:3003';
    // axios.get('/admin').then(res=>console.log(res))admin kontrol 

    return axios//api baseUrl guncel halde export edilecek
    
}
export default api