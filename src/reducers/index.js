import { combineReducers } from "redux";
import categoryService from "./categoryService";
import companyDetailService from "./companyDetailService";
import customerDetailService from "./customerDetailService";
import generalServiceGet from "./generalServiceGet";
import homeService from "./homeService";
import messageServiceGet from "./messageServiceGet";
import messageServicePost from "./messageServicePost";
import serviceService from "./serviceService";
import servicePost from "./servicePost";
import customerService from "./customerService";

export default combineReducers({
  categoryServiceResponse: categoryService,
  companyDetailServiceResponse: companyDetailService,
  customerDetailServiceResponse: customerDetailService,
  generalServiceGetResponse: generalServiceGet,
  homeServiceResponse: homeService,
  messageServiceGetResponse: messageServiceGet,
  messageServicePostResponse: messageServicePost,
  serviceServiceResponse: serviceService,
  servicePostResponse: servicePost,
  customerServiceResponse: customerService
});
