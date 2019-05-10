import { 
  SET_SERVICE_CREATE,
  SET_SERVICE_CREATE_SUCCESS,
  SET_SERVICE_CREATE_FAIL, 
} from "../../types/servicePost";

const INITIAL_STATE = { 
  serviceCreateLoading: false, 
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {  
    case SET_SERVICE_CREATE:
      return { ...state, serviceCreateLoading: true };
    case SET_SERVICE_CREATE_SUCCESS:
      return { ...state, serviceCreateLoading: false };
    case SET_SERVICE_CREATE_FAIL:
      return { ...state, serviceCreateLoading: false, error: "hata" }; 
    default:
      return { ...state };
  }
};
