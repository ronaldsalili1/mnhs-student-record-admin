import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get } from '../helpers/request';
import { getParamsFromUrl } from '../helpers/general';

const useTeacher = () => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();

    const resetMeta = () => {
        setMeta(null);
    };

    const getTeachers = async (query) => {
        setLoading(true);

        const response = await get({ uri: '/admin/teachers', query, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoading(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setTeachers(response?.data?.teachers);
        setLoading(false);
    };

    useEffect(() => {
        getTeachers(query);

        return () => {
            setTeachers([]);
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        meta,
        resetMeta,
        getTeachers,
        loading,
        total,
        page,
        limit,
        teachers,
    };
};

export default useTeacher;