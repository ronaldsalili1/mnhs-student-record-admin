import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get } from '../helpers/request';

const useAuth = () => {
    const [checkingAuthStatus, setCheckingAuthStatus] = useState(false);
    const [meta, setMeta] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [activeSemester, setActiveSemester] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const checkAuthStatus = async () => {
        setCheckingAuthStatus(true);

        const response = await get({ uri: '/admin/auth/authenticated', navigate, location });
        if (response?.meta?.code !== 200) {
            navigate(`/login?path=${location.pathname + location.search + location.hash}`, { replace: true });
            return;
        }

        setAdmin(response?.data?.admin);
        setActiveSemester(response?.data?.semester);
        setCheckingAuthStatus(false);
    };
  
    return {
        checkingAuthStatus,
        meta,
        admin,
        resetMeta,
        checkAuthStatus,
        activeSemester,
    };
};

export default useAuth;