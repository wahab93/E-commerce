import carthandler from "./carthandler";
import favhandler from "./favhandler";
import userinfihandler from "./userinfo";
import colorReducer from "./colorReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    carthandler,
    userinfihandler,
    favhandler,
    colorReducer
})
export default rootReducer