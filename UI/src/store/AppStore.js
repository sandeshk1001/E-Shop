import {createStore} from  'redux';
import Reducer from './AppReducer'
const Appstore=createStore(Reducer)
export default Appstore;