'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
 
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    Cookies.remove('user');

    localStorage.removeItem('user');
    

    router.push('/auth/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
}