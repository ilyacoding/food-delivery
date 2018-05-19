import { FOOD_DELIVERY_URL } from "/config";

export const getSurveys = httpFetcher => (max = 0) => httpFetcher.get(`${FOOD_DELIVERY_URL}/surveys?max=${max}`);