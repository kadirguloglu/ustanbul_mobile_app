import * as contants from './contants'
import { states } from './reducer';
import { storage } from './functions';

export function popularCategories(siteid, langid, topcategory, count) {
    return {
        type: contants.GET_POPULAR_CATEGORIES,
        payload: {
            request: {
                url: contants.GET_POPULAR_CATEGORIES_URL + `/${siteid}/${langid}/${topcategory}/${count}`
            }
        }
    }
}

export function serviceCategoriesAndSubCategories(siteid, langid) {
    return {
        type: contants.GET_CATEGORIES_AND_SUBCATEGORIES,
        payload: {
            request: {
                url: contants.GET_CATEGORIES_AND_SUBCATEGORIES_URL + `/${siteid}/${langid}`
            }
        }
    }
}

export function searchCategories(text, siteID, langID, orderColumn, orderStatus, page, count) {
    return {
        type: contants.GET_SEARCH_CATEGORIES,
        payload: {
            request: {
                url: contants.GET_SEARCH_CATEGORIES_URL + `/${text}/${siteID}/${langID}/${orderColumn}/${orderStatus}/${page}/${count}`
            }
        }
    }
}

export function getApiToken(deviceid) {
    return {
        type: contants.GET_TOKEN,
        payload: {
            request: {
                url: contants.GET_TOKEN_URL + `/true/${deviceid}`
            }
        }
    }
}

export function serviceCreateData(categoryid, siteid, langid) {
    return {
        type: contants.GET_SERVICE_CREATE_DATA,
        payload: {
            request: {
                url: contants.GET_SERVICE_CREATE_DATA_URL + `/${categoryid}/${siteid}/${langid}`
            }
        }
    }
}

export function createService(serviceData, postedData) {
    let bodyFormData = new FormData();
    bodyFormData.append('service', JSON.stringify(postedData));
    serviceData.serviceImages.map((item, index) => {
        if (item.uri.uri) {
            bodyFormData.append('file' + index, {
                uri: item.uri.uri,
                type: item.image.type,
                name: item.image.fileName,
            });
        }
    });
    return {
        type: contants.SET_SERVICE_CREATE,
        payload: {
            request: {
                url: contants.SET_SERVICE_CREATE_URL,
                method: "POST",
                data: bodyFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }
    }
}

export function customerServiceCountData(activeUser) {
    return {
        type: contants.GET_CUSTOMER_SERVICE_COUNT,
        payload: {
            request: {
                url: contants.GET_CUSTOMER_SERVICE_COUNT_URL + `/${activeUser.ID}`
            }
        }
    }
}

export function userUpdateData(userData) {
    delete userData.ProfilePicturePath;
    return {
        type: contants.SET_USER_UPDATE,
        payload: {
            request: {
                url: contants.SET_USER_UPDATE_URL,
                data: {
                    u: JSON.stringify(userData),
                    langID: states.LangID,
                },
                method: "POST",
            }
        }
    }
}

export function customerUpdateData(customer) {
    return {
        type: contants.SET_CUSTOMER_UPDATE,
        payload: {
            request: {
                url: contants.SET_CUSTOMER_UPDATE_URL,
                data: customer,
                method: "POST",
            }
        }
    }
}

export function refreshAuthenticatedUser(activeUser) {
    return {
        type: contants.REFRESH_AUTHENTICATION_USER,
        payload: {
            request: {
                url: contants.REFRESH_AUTHENTICATION_USER_URL + `?Email=&Password=&ID=${activeUser.ID}`,
            }
        }
    }
}

export function messageUserList(activeUser) {
    return {
        type: contants.GET_USER_MESSAGE_LIST,
        payload: {
            request: {
                url: contants.GET_USER_MESSAGE_LIST_URL + `/${activeUser.ID}`,
            }
        }
    }
}

export function userChatReadMessage(activeUser, openingUserID) {
    return {
        type: contants.POST_USER_CHAT_READ_MESSAGE,
        payload: {
            request: {
                url: contants.POST_USER_CHAT_READ_MESSAGE_URL,
                data: { activeUserId: activeUser.ID, openingUserId: openingUserID },
                method: "POST",
            }
        }
    }
}

export function userChatMessageOld(activeUser, openingUserID) {
    return {
        type: contants.SET_USER_CHAT_MESSAGE_OLD,
        payload: {
            request: {
                url: contants.SET_USER_CHAT_MESSAGE_OLD_URL + `/${activeUser.ID}/${openingUserID}`,
            }
        }
    }
}

export function contactSubjectData() {
    return {
        type: contants.GET_CONTACT_MESSAGE_SUBJECT,
        payload: {
            request: {
                url: contants.GET_CONTACT_MESSAGE_SUBJECT_URL + `/${states.SiteID}/${states.LangID}`,
            }
        }
    }
}

export function postContactSubject(contactMessage) {
    return {
        type: contants.POST_CONTACT_MESSAGE,
        payload: {
            request: {
                url: contants.POST_CONTACT_MESSAGE_URL,
                data: { subject: contactMessage },
                method: 'POST'
            }
        }
    }
}

export function companyServicePreviewData(activeUser) {
    return {
        type: contants.GET_COMPANY_SERVICE_PREVIVEW,
        payload: {
            request: {
                url: contants.GET_COMPANY_SERVICE_PREVIVEW_URL + `/${activeUser.ID}/${states.LangID}`,
            }
        }
    }
}

export function servicePreviewDetailData(serviceID) {
    return {
        type: contants.GET_SERVICE_PREVIEW_DETAIL,
        payload: {
            request: {
                url: contants.GET_SERVICE_PREVIEW_DETAIL_URL + `/${serviceID}`,
            }
        }
    }
}

export function servicePreviewDetailQuestionData(serviceID) {
    return {
        type: contants.GET_SERVICE_PREVIEW_DETAIL_QUESTION,
        payload: {
            request: {
                url: contants.GET_SERVICE_PREVIEW_DETAIL_QUESTION_URL + `/${serviceID}`,
            }
        }
    }
}

export function logoutUser() {
    return {
        type: contants.LOGOUT_USER,
        payload: {
            request: {
                url: contants.LOGOUT_USER_URL,
            }
        }
    }
}

export function loginUser(email, password, id) {
    return {
        type: contants.LOGIN_USER,
        payload: {
            request: {
                url: contants.LOGIN_USER_URL + `?Email=${email}&Password=${password}&ID=${id}`,
                headers: {
                    _isMobileDevice: true
                }
            }
        }
    }
}

export function proposalDetailData(proposalID) {
    return {
        type: contants.GET_PROPOSAL_DETAIL,
        payload: {
            request: {
                url: contants.GET_PROPOSAL_DETAIL_URL + `/${proposalID}`
            }
        }
    }
}

export function updateServiceProposal(price, proposalId) {
    return {
        type: contants.UPDATE_PROPOSAL_PRICE,
        payload: {
            request: {
                url: contants.UPDATE_PROPOSAL_PRICE_URL,
                data: { newPrice: price, Id: proposalId },
                method: 'POST'
            }
        }
    }
}

export function customerServicePreviewData(activeUser, activeLang) {
    return {
        type: contants.GET_CUSTOMER_SERVICE_PREVIVEW,
        payload: {
            request: {
                url: contants.GET_CUSTOMER_SERVICE_PREVIVEW_URL + `/${activeUser.ID}/${activeLang.ID}`,
            }
        }
    }
}
