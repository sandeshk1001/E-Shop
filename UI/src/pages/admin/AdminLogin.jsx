import styled from "styled-components";
import { mobile } from "../../responsive";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {toast} from 'react-toastify';
import { WindowSharp } from "@mui/icons-material";
import { LaptopWindowsSharp } from "@material-ui/icons";


const Wrapper = styled.div`
  width: 50%;
  padding: 20px;
  background-color: white;
  border:10px;
  ${mobile({ width: "75%" })}
`;

const Header = styled.div`
  font-size:50px;
  padding: 5px;
  text-style:bold;
`;

const Container = styled.div`
align-items: center;
text-align:center;
margin-top:100px;
`;

const ContainerInner = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AlreadyUser = styled.div`
font-size:22px;
font-style:italic;
padding: 2px;
text-style:bold;
`;

function Longin(props) {
  toast.configure()
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()

  // function handleClick() {
  //   setLoading(true);
  // }

  var user = {
    email: " ",
    password: " "
  }

  async function loginCheck() {
    setLoading(true)
    await axios.post("http://localhost:8080/admin/login", {
      email: user.email,
      password: user.password,
      role:"ADMIN"
    }).then((res) => {
      console.log(res)
      if (res.data.token) {
        localStorage.token = res.data.token;
        props.dispatch({
          type: "IS_LOGIN",
          payload: true
        })
        props.dispatch({
          type: "USER",
          payload: res.data.user
        })
        toast.success("login Success",{position: toast.POSITION.TOP_CENTER})
        navigate("/admin/home")
      }
    })
      .catch((error) => { 
        console.log(error)
        setLoading(false)
        toast.warning("Wrong Credential",{position: toast.POSITION.TOP_CENTER})

      })
  }

  function getEmail(event) {
    var email = event.target.value;
    user.email = email;
  }

  function getPassword(event) {
    var password = event.target.value;
    user.password = password;
  }

  return (<>
    <Container>
      <Header>Admin LogIn</Header>
      <ContainerInner>
        <Wrapper>
        {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
          {/* Same as */}
        {/* <ToastContainer /> */} 
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>

              <TextField id="outlined-text" label="Email" type="email" onChange={getEmail} required />

              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={getPassword}
                required
              />
            </div>
            <br />
            <div>
              <LoadingButton
                type="submit"
                color="secondary"
                onClick={loginCheck}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Login
              </LoadingButton>
            </div>
          </Box>
        </Wrapper>

      </ContainerInner>
      <AlreadyUser>for Register click here</AlreadyUser>
    </Container>
  </>
  );
}
export default connect()(Longin);