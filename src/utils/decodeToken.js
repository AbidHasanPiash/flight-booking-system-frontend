export default function decodeToken(token) {
    if (!token) {
        throw new Error("Token is not provided.");
    }

    try {
        // Split the token into its components
        const [header, payload, signature] = token.split(".");

        if (!payload) {
            throw new Error("Invalid token format.");
        }

        // Decode the payload from Base64URL
        const decodedPayload = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));

        return decodedPayload; // Return the decoded payload
    } catch (error) {
        console.error("Error decoding token:", error);
        throw new Error("Failed to decode token.");
    }
}
