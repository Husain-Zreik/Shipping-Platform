import { sendRequest } from "./core/config/request";
import { localStorageAction } from "./core/config/localstorage";
import { requestMethods } from "./core/enums/requestMethods";

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
        console.log(response)

        localStorageAction("access_token", response.user.token);
        localStorageAction("user_data", response.user);

        return response;
    } catch (error) {
        throw error;
    }
};

export const RegisterUser = async (name, email, password) => {
    try {
        const response = await sendRequest({
            route: "/guest/register",
            method: requestMethods.POST,
            body: {
                name,
                email,
                password,
            },
        });
        console.log(response);

        return response;
    } catch (error) {
        throw error;
    }
};

export const createShipment = async (waybill, address, name, number, image) => {
    try {
        const response = await sendRequest({
            route: "/user/shipments/create",
            method: requestMethods.POST,
            body: {
                waybill,
                name,
                address,
                number,
                image
            }
        });
        console.log(response)

        return response;
    } catch (error) {
        throw error;
    }
};

export const updateShipment = async (id, waybill = null, address = null, name = null, number = null) => {
    try {
        const response = await sendRequest({
            route: `/user/shipments/${id}`,
            method: requestMethods.PUT,
            body: {
                waybill,
                name,
                address,
                number,
            }
        });
        console.log(response)

        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteShipment = async (id) => {
    try {
        const response = await sendRequest({
            route: `/user/shipments/${id}`,
            method: requestMethods.DELETE,
        });
        console.log(response)

        return response;
    } catch (error) {
        throw error;
    }
};
