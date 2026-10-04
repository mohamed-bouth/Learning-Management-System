import swaggerJsdoc from "swagger-jsdoc";
import listners from "../utils/listnerHandler.js";
import env from "./env.js";

const servers = listners.map(listner => {
    return {
        url: `http://${listner.adress}:${env.backendPort}`,
        description: `${listner.name} Server`
    }
})



const options = {
    definition: {
        openapi: "3.0.3",

        info: {
            title: "LMS API",
            version: "1.0.0",
            description: "Learning Management System API",
        },

        servers,
    },

    apis: ["./docs/swagger/*.swagger.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;