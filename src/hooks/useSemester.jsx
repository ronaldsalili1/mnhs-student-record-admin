import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get } from '../helpers/request';
import { getParamsFromUrl } from '../helpers/general';

const useSemester = () => {
    const [meta, setMeta] = useState(null);
    const [loadingSemesters, setLoadingSemesters] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();

    const resetMeta = () => {
        setMeta(null);
    };

    const getSemesters = async (query) => {
        setLoadingSemesters(true);

        const response = await get({ uri: '/admin/semesters', query, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSemesters(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setSemesters(response?.data?.semesters);
        setLoadingSemesters(false);
    };

    useEffect(() => {
        getSemesters(query);

        return () => {
            setSemesters([]);
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        meta,
        resetMeta,
        getSemesters,
        loadingSemesters,
        total,
        page,
        limit,
        semesters,
    };
};

export default useSemester;