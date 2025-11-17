'use server';

export async function getCurrentUser() {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data: data.data };
    }
    return { success: false, data: null };
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { success: false, data: null, error: error.message };
  }
}

export async function logoutUser() {
  try {
    const response = await fetch('https://api.freeapi.app/api/v1/users/logout', {
      method: 'POST',
      credentials: 'include',
    });
    
    return { success: response.ok };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
}