export async function getCurrentUser() {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/users/me', {
      method: 'GET',
      credentials: 'include', // This sends cookies with the request
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data; // Returns user object if authenticated
    }
    return null; // Not authenticated
  } catch (error) {
    console.error('Error checking auth status:', error);
    return null;
  }
}

export async function logoutUser() {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    return response.ok;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
}