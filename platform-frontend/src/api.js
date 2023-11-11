import { sendRequest } from "./core/config/request";
import { localStorageAction } from "./core/config/localstorage";
import { requestMethods } from "../../../core/enums/requestMethods";

export const loginUser = async (email, password) => {
    try {
        const response = await sendRequest({
            method: requestMethods.POST,
            route: "/guest/login",
            body: {
                email,
                password,
            }
        });
        // console.log(response)

        localStorageAction("access_token", response.user.token);
        localStorageAction("user_data", response.user);

        return response;
    } catch (error) {
        throw error;
    }
};