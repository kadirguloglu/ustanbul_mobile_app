import {
  SET_SERVICE_CREATE,
  SET_SERVICE_CREATE_URL
} from "../types/servicePost";

export function createService(serviceData, postedData) {
  let bodyFormData = new FormData();
  bodyFormData.append("langId", postedData.LangID);
  delete postedData.LangID;
  bodyFormData.append("service", JSON.stringify(postedData));
  serviceData.serviceImages.map((item, index) => {
    if (item.uri.uri) {
      const res = item.uri.uri.split("/");
      bodyFormData.append("file" + index, {
        uri: item.uri.uri,
        type: `image/${res[res.length - 1].split(".")[1]}`,
        name: res[res.length - 1]
      });
    }
  });
  return {
    type: SET_SERVICE_CREATE,
    payload: {
      request: {
        url: SET_SERVICE_CREATE_URL,
        method: "POST",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    }
  };
}
