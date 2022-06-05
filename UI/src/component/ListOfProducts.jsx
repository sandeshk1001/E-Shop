import React ,{ useState ,useEffect } from "react"
import axios from "axios";
import { Button } from "bootstrap";

function ListOfProducts(){
    var [product,setProduct] =useState([]);
    useEffect(() => {
        axios({
          url: "http://localhost:8080/api/products",
          method: "get"
        }).then((response) => {
        setProduct(response.data._embedded.products)
        }, (error) => {
          console.log("error", error)
        })
      }, []);                               

    return(
        <><Button onclick="">Book</Button>
        {
                product.map((e)=> {return(
                   <div>
                       {e.name}
                   </div>)
                })
            }
        </>              
    )
}
export default ListOfProducts;