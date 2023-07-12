import express from "express";
import routerAuth from "./microservices/auth/routes/authRoute";
import { setupGraphQL } from "./microservices/auth/graphql/auth";

const app = express();
app.use(express.json());

app.use("/api/auth", routerAuth);

app.use(express.static(__dirname + "/public"));

// Configuración de GraphQL
setupGraphQL(app);

export default app;
