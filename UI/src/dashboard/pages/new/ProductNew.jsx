import React, { useEffect } from "react";
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useAlert } from 'react-alert';
import axios from "axios";
import AdminService from "../../../API/AdminService";

const ProductNew = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    var Product = {
        "name": null,
        "description": null,
        "unitPrice": null,
        "imageUrl": null,
        "unitsInStock": null,
        "category": {
            "name":null
        }
    }

    function submit() {
        if (file != "" && title.value == null) {
            Product.imageUrl = "products/"+file.name;
            AdminService.createProduct(Product).then((res)=>{
                console.log(res)
                window.location.href="admin/products/"
            })
        }
    }

    function setTitle(e){
        Product.name=e.target.value;
    }
    function setDescription(e){
        Product.description=e.target.value;
    }
    function setPrice(e){
        Product.unitPrice=e.target.value;
    }
    function setStock(e){
        Product.unitsInStock=e.target.value;
    }
    function setCategory(e){
        Product.category.name=e.target.value;
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={submit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>
                            <div className="formInput" >
                                <label>Title</label>
                                <input type="text"
                                    id="title"
                                    onChange={setTitle}
                                    placeholder="Apple Macbook Pro" />
                            </div>
                            <div className="formInput" key={2}>
                                <label>Description</label>
                                <input type="text"
                                    id="description"
                                    onChange={setDescription}
                                    placeholder="Description" />
                            </div>
                            <div className="formInput" key={2}>
                                <label>Category</label>
                                <input type="text"
                                    id="category"
                                    onChange={setCategory}
                                    placeholder="Computers" />
                            </div>
                            <div className="formInput" key={2}>
                                <label>Price</label>
                                <input type="text"
                                    id="price"
                                    onChange={setPrice}
                                    placeholder="100" />
                            </div>
                            <div className="formInput" key={2}>
                                <label>Stock</label>
                                <input type="text"
                                    id="stock"
                                    onChange={setStock}
                                    placeholder="In Stock" />
                            </div>
                            {/* {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))} */}
                            <button >Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductNew;
