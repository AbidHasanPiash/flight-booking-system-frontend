import decodeToken from "./decodeToken";

export function getUserId(token) {
    try {
        const decodedToken = decodeToken(token); // Decode the token
        return decodedToken.id; // Extract and return the user ID
    } catch (error) {
        console.error(error.message);
        return null; // Handle errors gracefully
    }
}
