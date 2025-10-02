import React, { useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdminService from "../../../API/AdminService";

const ProductDatatable = () => {
  var [data, setData] = useState([]);
  var link = "/admin/product/"

  useEffect(()=>{
    AdminService.getProductList().then((response) => {
      console.log(response.data)
      setData(response.data)
  })
  },[])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={link+""+params.row.id} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  console.log(data)
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link to="/admin/products/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default ProductDatatable;
