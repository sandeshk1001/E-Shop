import styled from "styled-components";
import { mobile } from "../responsive";
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import axios from "axios";

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

const AlreadyUser =styled.div`
font-size:22px;
font-style:italic;
padding: 2px;
text-style:bold;
`;

export default function Register() {
  const [loading, setLoading] = React.useState(false);

  function handleClick() {
    setLoading(true);
  }

  var user = {
      firstName:" ",
      lastName:" ",
      email:" ",
      mob:" ",
      password:" "
  };

  async function saveUser(){
    handleClick()
    console.log(user)
     await axios.post("http://localhost:8080/user/create",{
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      mob:user.mob,
      password:user.password
     })
    .then((res)=>{ 
      console.log(res) 
      setLoading(false)
      alert("register success "+res);
    })
    .catch((error)=>{ console.log(error) })
  }

  function setFirstName(event){
    user.firstName= event.target.value
  }
  function setLastName(event){
    user.lastName= event.target.value
  }

  function setEmail(event){
    user.email= event.target.value
  }
  function setMobile(event){
    user.mob= event.target.value
  }
  var password=" "
  function setPassword(event){
    password= event.target.value
  }
  function setCheckPasssword(event){
    if(event.target.value === password){
      user.password=event.target.value;
    }else{
    console.log("Wrong password")}
  }

  return (<>
    <Container>
      <Header>Sign Up </Header>
      <ContainerInner>
        <Wrapper>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
            <TextField id="outlined-text-fname" onChange={setFirstName} label="First Name" type="text" required/>

            <TextField id="outlined-text-lname"  onChange={setLastName} label="Last Name" type="text" required/>
            
            <TextField id="outlined-text-email"  onChange={setEmail} label="Email" type="email" required/>

            <TextField id="outlined-text-mob"  onChange={setMobile} label="Mobile No." type="text" required/>

            <TextField
                id="outlined-password-input-password"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={setPassword}
                required
              />

            <TextField id="outlined-text-cpassword"  onChange={setCheckPasssword} label="Confirm password" type="password" required/>

            </div>
            <br/>
            <div>
              <LoadingButton
                type="submit"
                color="secondary"
                onClick={saveUser}
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
              >
                Save
              </LoadingButton>
            </div>
          </Box>
        </Wrapper>
        
      </ContainerInner>
      <AlreadyUser>Already have account Login here</AlreadyUser>
    </Container>
  </>
  );
}