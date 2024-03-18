export const apiHelper = {
    post,
    get,
}

// get Requests
async function get(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    return handleResponse(response);
}

// Post Request
async function post(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    return handleResponse(response);
}

// Handling Response
async function handleResponse(response) {
    try {
        const data = await response.json();
        if (response.status !== 200) {
            const error = (data && data.message);
            throw error;
        }
        return data;
    } catch (error) {
        console.error('Error in handleResponse:', error);
        throw error;
    }
}