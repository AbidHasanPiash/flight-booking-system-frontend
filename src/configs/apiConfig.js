const URL = process.env.REACT_APP_BASE_URL;
const PREFIX = process.env.REACT_APP_PREFIX;

// const isServer = typeof window === 'undefined';

const apiConfig = {
    BASE_URL : `${URL}/${PREFIX}`,

    //────────────────────────────────────────────
    //? API: ---- Auth
    //────────────────────────────────────────────
    LOGIN : '/login',
    REGISTER : '/registration',

    //────────────────────────────────────────────
    //? API: ---- Profile
    //────────────────────────────────────────────
    UPDATE_PROFILE : '/profile',

    //────────────────────────────────────────────
    //? API: ---- flights
    //────────────────────────────────────────────
    GET_FLIGHT : '/flights',
    GET_FLIGHT_BY_ID : '/flights/',
    CREATE_FLIGHT : '/flights',
    UPDATE_FLIGHT : '/flights/',
    DELETE_FLIGHT : '/flights/',

    //────────────────────────────────────────────
    //? API: ---- bookings
    //────────────────────────────────────────────
    GET_BOOKING : '/bookings',
    GET_BOOKING_BY_ID : '/bookings/',
    GET_BOOKING_BY_USER_ID : '/bookings/user/',
    CREATE_BOOKING : '/bookings',
    UPDATE_BOOKING : '/bookings/',
    DELETE_BOOKING : '/bookings/',
}

export default apiConfig;  