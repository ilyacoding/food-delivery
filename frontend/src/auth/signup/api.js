import { FOOD_DELIVERY_API_URL } from "/config";
import { httpFetcher, MimeType } from "/utils/http";

export const signup = (email, password, birthday, phoneNumber, firstName, lastName, role) => {
    let accountsUrl = `${FOOD_DELIVERY_API_URL}/users/register?role=${role}`;
    const data = {
        email,
        password,
        birthday,
        phoneNumber,
        firstName,
        lastName
    };
    console.log(accountsUrl);
    const json = JSON.stringify(data);

    return httpFetcher.post(accountsUrl, json, { "Content-Type": MimeType.JSON });
};

// export const getIsEmailOccupied = (email) =>
//     httpFetcher.get(`${accountsUrl}?email=${email}`);
