// Pre-request script: Check JWT validity before making authenticated requests
// Runs before EVERY request in the collection

// Public endpoints that don't need authentication
const publicEndpoints = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/health",
];

// Get the current request path
const requestPath = pm.request.url.getPath();

// Check if this is a public endpoint
const isPublic = publicEndpoints.some(
  (endpoint) => requestPath === endpoint || requestPath.startsWith(endpoint),
);

if (!isPublic) {
  // Check if we have a token
  const token = pm.environment.get("bearerToken");
  const expiry = pm.environment.get("token_expiry");

  if (!token) {
    console.warn(
      "No bearerToken found. Run login request first to authenticate.",
    );
  } else if (expiry) {
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    const expiryTime = parseInt(expiry, 10);

    if (now >= expiryTime) {
      console.warn("Token has expired. Please login again.");
      // Optionally clear the expired token
      // pm.environment.set('bearerToken', '');
      // pm.environment.set('token_expiry', '');
    } else {
      const remainingMinutes = Math.floor((expiryTime - now) / 60);
      if (remainingMinutes < 5) {
        console.log(
          `Token expires in ${remainingMinutes} minutes. Consider refreshing.`,
        );
      }
    }
  }
}
