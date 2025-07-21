# Keycloak Setup Guide for Trivia App

## Prerequisites
1. Java 17+ installed
2. Keycloak server running on `http://localhost:8080`

## Keycloak Server Setup

### 1. Download and Start Keycloak
```bash
# Download Keycloak (if not already done)
wget https://github.com/keycloak/keycloak/releases/download/24.0.1/keycloak-24.0.1.tar.gz
tar -xzf keycloak-24.0.1.tar.gz
cd keycloak-24.0.1

# Start Keycloak in development mode
./bin/kc.sh start-dev
```

### 2. Create Admin User
1. Go to `http://localhost:8080`
2. Click "Administration Console"
3. Create admin user (e.g., admin/admin)

### 3. Create Client
1. In Keycloak admin console, go to "Clients" → "Create client"
2. Client ID: `user`
3. Client Protocol: `openid-connect`
4. Root URL: `http://localhost:5173`
5. Valid Redirect URIs: `http://localhost:5173/*`
6. Web Origins: `http://localhost:5173`
7. Access Type: `public`
8. Save

### 4. Create Test User
1. Go to "Users" → "Add user"
2. Username: `testuser`
3. Email: `test@example.com`
4. Go to "Credentials" tab
5. Set password: `password`
6. Turn off "Temporary" password
7. Save

## Running the App

```bash
cd trivia-app
npm run dev
```

The app will be available at `http://localhost:5173`

## Troubleshooting

### Common Issues:
1. **"Keycloak init failed"**: Make sure Keycloak server is running on port 8080
2. **"Invalid redirect URI"**: Check that redirect URI in Keycloak client matches `http://localhost:5173/*`
3. **"Realm not found"**: Make sure you're using the correct realm (default is "master")
4. **"Client not found"**: Verify client ID is "user" in Keycloak

### Debug Steps:
1. Check browser console for errors
2. Verify Keycloak server is running: `curl http://localhost:8080/health`
3. Check Keycloak logs for authentication errors
4. Ensure all URLs match exactly (including trailing slashes) 