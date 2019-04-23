import {
  GET_POPULAR_CATEGORIES,
  GET_POPULAR_CATEGORIES_URL,
  GET_SEARCH_CATEGORIES,
  GET_SEARCH_CATEGORIES_URL,
  GET_CONTACT_MESSAGE_SUBJECT,
  GET_CONTACT_MESSAGE_SUBJECT_URL,
  POST_CONTACT_MESSAGE,
  POST_CONTACT_MESSAGE_URL
} from "../types/homeService";

export function popularCategories(siteid, langid, topcategory, count) {
  return {
    type: GET_POPULAR_CATEGORIES,
    payload: {
      request: {
        url:
          GET_POPULAR_CATEGORIES_URL +
          `/${siteid}/${langid}/${topcategory}/${count}`
      }
    }
  };
}

export function searchCategories(
  text,
  siteID,
  langID,
  orderColumn,
  orderStatus,
  page,
  count
) {
  return {
    type: GET_SEARCH_CATEGORIES,
    payload: {
      request: {
        url:
          GET_SEARCH_CATEGORIES_URL +
          `/${text}/${siteID}/${langID}/${orderColumn}/${orderStatus}/${page}/${count}`
      }
    }
  };
}

export function contactSubjectData() {
  return {
    type: GET_CONTACT_MESSAGE_SUBJECT,
    payload: {
      request: {
        url:
          GET_CONTACT_MESSAGE_SUBJECT_URL + `/${states.SiteID}/${states.LangID}`
      }
    }
  };
}

export function postContactSubject(contactMessage) {
  return {
    type: POST_CONTACT_MESSAGE,
    payload: {
      request: {
        url: POST_CONTACT_MESSAGE_URL,
        data: { subject: contactMessage },
        method: "POST"
      }
    }
  };
}
