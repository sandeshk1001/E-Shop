import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router";
import axios from "axios";
import AdminService from "../../../API/AdminService";

const Single = () => {
  var params = useParams()
  var userId = params.userId;
  var [user,setUser] =useState({})
  var [transactions,setTransaction] = useState([])
  var [tra_loop,setTra_loop] =useState(false)
  var [monthwise,setMonthWise] = useState([])
  //   { name: "September", Total: 0 },
  //   { name: "October", Total: 0 },
  // var  months = [{"January":0}, {"February":0}, {"March":0}, {"April":0}, {"May":0}, {"June":0}, {"July":0}, {"August":0}, {"September":0}, {"October":0}, {"November":0}, {"December":0}];
  var monthData = [
    { name: "January", Total: 0 },
    { name: "February", Total: 0 },
    { name: "March", Total: 0 },
    { name: "April", Total: 0 },
    { name: "May", Total: 0 },
    { name: "June", Total: 0 },
    { name: "July", Total: 0 },
    { name: "August", Total: 0 },
    { name: "September", Total: 0 },
    { name: "October", Total: 0 },
    { name: "November", Total: 0 },
    { name: "December", Total: 0 }
  ];
  // var [monthData,setMonthData] =useState([
  //   { name: "January", Total: 0 },
  //   { name: "February", Total: 0 },
  //   { name: "March", Total: 0 },
  //   { name: "April", Total: 0 },
  //   { name: "May", Total: 0 },
  //   { name: "June", Total: 0 },
  //   { name: "July", Total: 0 },
  //   { name: "August", Total: 0 },
  //   { name: "November", Total: 0 },
  //   { name: "December", Total: 0 }
  // ])
  useEffect(()=>{
  AdminService.userDetail(userId).then((res)=>{
    setUser(res.data)
    AdminService.getOrderDetail(userId).then((res)=>{
      setTransaction(res.data)
      transactionsmap(res.data)
      dataFilter()
    }).catch((error)=>console.log(error.getMessage))
  }).catch((error)=>console.log(error.getMessage))
},[])

function transactionsmap(trans){
  console.log(trans)
  setTra_loop(true)
  trans.map((index)=>{
    let date = new Date(index.date);
    let longMonth = date.toLocaleString('en-us', { month: 'long' });
    console.log(monthData)
    mapp(longMonth,index);
  })
}
  function mapp(longMonth,index){
    monthData.map((i)=>{
      if(i.name == longMonth){
        i.Total = index.amount + i.Total;
        console.log(index.amount)
        // setMonthData(monthData)
        console.log(i.Total)
        console.log(monthData)
      }
      console.log(i)
    })
    setTra_loop(false)
  }
  function dataFilter(){
    console.log(monthData)
    const data =monthData.filter(month => month.Total > 0 )
    setMonthWise(data)
    console.log(data)
}
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="/avatar.png"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.firstName} {user.lastName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.mob}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart data={monthwise}  aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List data={transactions}/>
        </div>
      </div>
    </div>
  );
};

export default Single;
