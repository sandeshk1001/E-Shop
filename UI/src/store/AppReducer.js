const AppReducer=(
    state={
        isLogin:null,
        cart:{
            products:[]
        },
        user:{
            role:"USER"
        }
    }, action
)=>{
    switch (action.type)
    {
        case "IS_LOGIN":
            state={...state}
            state["isLogin"]=action.payload;
            return state;
        break;

        case "CART":
            state={...state}
            state["cart"]=action.payload;
            return state;
        break;

        case "USER":
            state={...state}
            state["user"]=action.payload;
            return state;
        break;
    }
    } 
export default AppReducer;