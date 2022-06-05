import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 1px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({ display: "none" })}
// `;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  &:focus {
    border: 0px;
  }
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  display:flex;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

// const MenuItemC = styled.div`
//   font-size: 14px;
//   cursor: pointer;
//   margin-left: 25px;
//   ${mobile({ fontSize: "12px", marginLeft: "10px" })}
// `;

function Navbar(props) {

  let token =localStorage.getItem("token") ? localStorage.getItem("token") :null;
  const fullName = props.user ? props.user.firstName+" "+props.user.lastName : null;
  // for user profile drowpdown list
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let badgeContentNumber = 0;
  
  useEffect(()=>{
    dataFetch()
    UserDataFetch()
  },[])

  function dataFetch(){
    if(token !=null)
      axios({
        url: "http://localhost:8080/cart/get",
        method: "get",
        headers: {token:token}
      }).then((res)=>{
        props.dispatch({
          type: "CART",
          payload: res.data
        })
      }).catch((error)=>console.log(error))
  }

  function UserDataFetch(){
    if(token !=null)
      axios({
        url: "http://localhost:8080/user/getDetails",
        method: "get",
        headers: {token:token}
      }).then((res)=>{
        props.dispatch({
          type: "USER",
          payload: res.data
        })
      }).catch((error)=>console.log(error))
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  var navigate = useNavigate()
  useEffect(() => {
    props.dispatch({
      type: "IS_LOGIN",
      payload: localStorage.getItem("token") ? true : false
    })
  }, props)

  function logout() {
    if (localStorage.getItem("token") != null)
      localStorage.removeItem("token")
    props.dispatch({
      type: "IS_LOGIN",
      payload: false
    });
    props.dispatch({
      type: "USER",
      payload: {}
    });
    props.dispatch({
      type: "CART",
      payload: []
    });
    // navigate("/")
    window.location.href="/"
  }

  if(props.cart !=null){
    badgeContentNumber = 0;
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/"><Logo>E-Shop</Logo></Link>
        </Left>
        <Center>
        {/* <Language>EN</Language> */}
          <SearchContainer>
            <Input placeholder="Search" style={{border:"none"}}/>
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Center>
        <Right>
          {!props.isLogin && <MenuItem><Link to="/register">REGISTER</Link></MenuItem>}
          {!props.isLogin && <MenuItem><Link to="/login">SIGN IN</Link></MenuItem>}
          {props.isLogin ?
            <MenuItem>
              <Link to="/cart">
                <Badge badgeContent={badgeContentNumber ==0 ?props.cart.products.length :0} color="primary">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
            </MenuItem> : <></>}
            {props.isLogin ?
            <MenuItem>
                <Tooltip title="Account settings">
                  <AccountCircleIcon onClick={handleClick} sx={{ width: 32, height: 32 }}> </AccountCircleIcon>
                </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  {fullName}
                </MenuItem>
                <Divider />
                <MenuItem>
                  <Avatar fontSize="small" /><Link to="/order/summary"> My Orders</Link>
                </MenuItem>
                <Divider />
                {/* <MenuItem>
                  <Avatar /> Profile
                </MenuItem> */}
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </MenuItem>: <></>}
        </Right>
      </Wrapper>
      <hr />
    </Container>
  );
};

export default connect(function (state, props) {
  console.log(state)
  if (state != null)
    return {
      isLogin: state["isLogin"],
      cart: state["cart"],
      user: state["user"]
    }
  else
    return {
      isLogin: false,
      cart: [],
      user:{}
    };
})(Navbar);