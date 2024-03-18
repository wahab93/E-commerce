import { apiHelper } from "../helper/apiHelper";

export const websiteServices = {
    WebSettingsDetail: (url) => apiHelper.get(url),
    AddEditWebSettings: (AddEditWebSettings, websiteData) => apiHelper.post(AddEditWebSettings, { ...websiteData }),
}