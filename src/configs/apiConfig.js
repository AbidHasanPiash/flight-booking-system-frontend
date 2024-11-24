const URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost'
const PORT = process.env.NEXT_PUBLIC_PORT || '5000'
const PREFIX = process.env.NEXT_PUBLIC_PREFIX || 'api'

// const isServer = typeof window === 'undefined';

const apiConfig = {
    BASE_URL : `${URL}:${PORT}/${PREFIX}`,

    //────────────────────────────────────────────
    //? API: ---- Auth
    //────────────────────────────────────────────
    LOGIN : '/login',
    REGISTER : '/registration',

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