import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get } from '../helpers/request';
import { getParamsFromUrl } from '../helpers/general';

const useStudent = () => {
    const [meta, setMeta] = useState(null);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [students, setStudents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();

    const resetMeta = () => {
        setMeta(null);
    };

    const getStudents = async (query) => {
        setLoadingStudents(true);

        const response = await get({ uri: '/admin/students', query, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingStudents(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setStudents(response?.data?.students);
        setLoadingStudents(false);
    };

    useEffect(() => {
        getStudents(query);

        return () => {
            setStudents([]);
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        meta,
        resetMeta,
        getStudents,
        loadingStudents,
        total,
        page,
        limit,
        students,
    };
};

export default useStudent;