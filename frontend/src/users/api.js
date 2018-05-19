import { FOOD_DELIVERY_URL } from "/config";

export const getUsers = httpFetcher => (skip = 0, top = 5) => httpFetcher.get(`${FOOD_DELIVERY_URL}/users?skip=${skip}&top=${top}`);