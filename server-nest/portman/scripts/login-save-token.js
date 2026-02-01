// Post-login script: Extract JWT from Set-Cookie header and save to environment
// This runs after the login request completes successfully

// Only process if login was successful
if (pm.response.code === 200 || pm.response.code === 201) {
  // Get the Set-Cookie header(s)
  const setCookieHeader = pm.response.headers.get("Set-Cookie");

  if (setCookieHeader) {
    // Parse the access_token from the cookie
    // Cookie format: access_token=<jwt>; Path=/; HttpOnly; ...
    const cookies = setCookieHeader.split(",").map((c) => c.trim());

    for (const cookie of cookies) {
      const tokenMatch = cookie.match(/access_token=([^;]+)/);
      if (tokenMatch && tokenMatch[1]) {
        const token = tokenMatch[1];

        // Save token to environment variable
        pm.environment.set("bearerToken", token);
        console.log("Token saved to bearerToken environment variable");

        // Optionally decode and save expiry
        try {
          const parts = token.split(".");
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            if (payload.exp) {
              pm.environment.set("token_expiry", payload.exp.toString());
              console.log(
                "Token expiry saved:",
                new Date(payload.exp * 1000).toISOString(),
              );
            }
          }
        } catch (e) {
          console.log("Could not decode token expiry:", e.message);
        }

        break;
      }
    }
  } else {
    console.log("No Set-Cookie header found in response");
  }
}
