
import axios from 'axios';
const getCsrfToken = () => {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 10) === 'csrftoken=') {
                csrfToken = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return csrfToken;
};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',  // Replace with your Django backend URL
    timeout: 5000,  // Timeout after 5 seconds
    withCredentials: true,  // Send cookies or tokens with requests
});

export const getUsers = async() => {
    return axiosInstance.get('get_users/');
};

export const getInterests = async() => {
    return axiosInstance.get('interests/');
}

export const getMessages = async () => {
    return axiosInstance.get('messages/');
}
export const sentRequest = async(data) => {
    const csrfToken = getCsrfToken();
    return axiosInstance.post('interests/',data, {
        headers: {
            'X-CSRFToken': csrfToken,
        },
    })
}
export const updateInterest = (id,data) => {
    const csrfToken = getCsrfToken();
    return axiosInstance.patch(`interests/${id}/`,data, {
        headers: {
            'X-CSRFToken': csrfToken,
        },
    })
}

export const sentMessage = (data) => {
    const csrfToken = getCsrfToken();
    return axiosInstance.post('messages/',data, {
        headers: {
            'X-CSRFToken': csrfToken,
        },
    })
}

// Add more functions for sending interests, accepting/rejecting interests, etc.
