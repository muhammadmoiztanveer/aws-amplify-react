import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { Amplify } from "aws-amplify";
import amplifyconfig from "./amplifyconfiguration.json";
Amplify.configure(amplifyconfig);
import { AuthProvider } from "react-oidc-context";
import { store } from "./store/store.js";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_DZzbf3oNL",
  client_id:
    "841095866374-s8ev71u8j3cgu4kfen9kk0fbtou2gt5n.apps.googleusercontent.com",
  redirect_uri:
    "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_DZzbf3oNL/.well-known/jwks.json//oauth2/idpresponse",
  response_type: "code",
  scope: "<scopes>",
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider {...cognitoAuthConfig}>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>
);
