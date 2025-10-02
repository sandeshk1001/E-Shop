import { NewReleases } from "@material-ui/icons";
import axios, { Axios } from "axios";
const  USER_BASE_URL="http://localhost:8080/user/";
const  ADMIN_BASE_URL="http://localhost:8080/admin/";
class AdminService{

    userList(){
        return axios.get(USER_BASE_URL+"getUsers")
    }
    userDetail(id){
        return axios.get(USER_BASE_URL+"getDetailsById/"+id)
    }
    getOrderDetail(id){
        return axios.get(ADMIN_BASE_URL+"getUserOrder/"+id)
    }
    getOrderGraph(id){
        return axios.get(ADMIN_BASE_URL+"getUserTransactionGraph/"+id)
    }
    getProductList(){
        return axios.get(ADMIN_BASE_URL+"getProductList")
    }
    getOrderList(){
        return axios.get(ADMIN_BASE_URL+"getOrderList")
    }
    createProduct(product){
        return axios.post(ADMIN_BASE_URL+"create/product",product)
    }
}
export default new AdminService();