//Enabling this option cause access node-specific variable
/*eslint-env node*/

export const ENVIRONMENT_NAME = process.env.NODE_ENV;

export const FOOD_DELIVERY_URL = "http://localhost:8080";
export const FOOD_DELIVERY_TOKEN_URL = `${FOOD_DELIVERY_URL}/api/auth/login`;
export const FOOD_DELIVERY_API_URL = `${FOOD_DELIVERY_URL}/api`;
export const FOOD_DELIVERY_MVC_URL = `${FOOD_DELIVERY_URL}`;

export const CLIENT_ID = "FoodDelivery_FrontEnd";
