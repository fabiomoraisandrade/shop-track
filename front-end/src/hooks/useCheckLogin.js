import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../utils/getUserInfo';
import getUsers from '../services/getUsers';

const useCheckLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async (userInfo) => {
      const users = await getUsers();
      if (users.error || !userInfo.id) {
        localStorage.removeItem('user');
        return navigate('/login');
      }
      const user = users.find((userData) => userData.id === userInfo.id);
      if (!user) {
        localStorage.removeItem('user');
        return navigate('/login');
      }
    };

    const userInfo = getUserInfo();

    if (userInfo.isAdmin) return navigate('/admin/manage');

    checkAuthorization(userInfo);
  }, [navigate]);
};

export default useCheckLogin;