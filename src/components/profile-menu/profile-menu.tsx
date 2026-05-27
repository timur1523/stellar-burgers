import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logOut } from '../../services/slices/auth-slice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
