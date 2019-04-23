import {
  GET_CATEGORIES_AND_SUBCATEGORIES,
  GET_CATEGORIES_AND_SUBCATEGORIES_URL
} from "../types/categoryService";
export function serviceCategoriesAndSubCategories(siteid, langid) {
  return {
    type: GET_CATEGORIES_AND_SUBCATEGORIES,
    payload: {
      request: {
        url: GET_CATEGORIES_AND_SUBCATEGORIES_URL + `/${siteid}/${langid}`
      }
    }
  };
}
