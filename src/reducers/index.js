import { combineReducers } from "redux";
import categoryService from "./categoryService";
import companyDetailService from "./companyDetailService";
import customerDetailService from "./customerDetailService";
import generalServiceGet from "./generalServiceGet";
import homeService from "./homeService";
import messageServiceGet from "./messageServiceGet";
import messageServicePost from "./messageServicePost";
import serviceService from "./serviceService";

export default combineReducers({
  categoryServiceResponse: categoryService,
  companyDetailServiceResponse: companyDetailService,
  customerDetailServiceResponse: customerDetailService,
  generalServiceGetResponse: generalServiceGet,
  homeServiceResponse: homeService,
  messageServiceGetResponse: messageServiceGet,
  messageServicePostResponse: messageServicePost,
  serviceServiceResponse: serviceService
});
