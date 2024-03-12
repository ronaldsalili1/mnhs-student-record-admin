import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get } from '../helpers/request';
import { getParamsFromUrl } from '../helpers/general';

const useAdministrator = () => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();

    const resetMeta = () => {
        setMeta(null);
    };

    const getAdministrators = async (query) => {
        setLoading(true);

        const response = await get({ uri: '/admin/admins', query, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoading(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setAdmins(response?.data?.admins);
        setLoading(false);
    };

    useEffect(() => {
        getAdministrators(query);

        return () => {
            setAdmins([]);
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        meta,
        resetMeta,
        getAdministrators,
        loading,
        total,
        page,
        limit,
        admins,
    };
};

export default useAdministrator;