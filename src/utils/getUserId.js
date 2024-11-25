import decodeToken from "./decodeToken";
import user from "./user";

export function getUserId() {
    try {
        const token = user.getToken()
        const decodedToken = decodeToken(token); // Decode the token
        return decodedToken.id; // Extract and return the user ID
    } catch (error) {
        console.error(error.message);
        return null; // Handle errors gracefully
    }
}
