// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'master',         // ✅ MUST MATCH your actual realm
  clientId: 'user'         // ✅ must match your client ID
});

// Configure redirect URI for development
keycloak.redirectUri = 'http://localhost:5173/';

export default keycloak;



