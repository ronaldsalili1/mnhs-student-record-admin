import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get } from '../helpers/request';
import { getParamsFromUrl } from '../helpers/general';

const useSection = () => {
    const [meta, setMeta] = useState(null);
    const [loadingSections, setLoadingSections] = useState(false);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [sections, setSections] = useState([]);
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

    const getSections = async (query) => {
        setLoadingSections(true);

        const response = await get({ uri: '/admin/sections', query, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSections(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setSections(response?.data?.sections);
        setLoadingSections(false);
    };

    const getTeacherOptions = async () => {
        setLoadingTeachers(true);

        const response = await get({ uri: '/admin/teachers/options/all', navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingTeachers(false);
            return;
        }

        setTeachers(response?.data?.teachers);
        setLoadingTeachers(false);
    };

    useEffect(() => {
        getSections(query);
        getTeacherOptions();

        return () => {
            setSections([]);
            setTeachers([]);
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        meta,
        resetMeta,
        getSections,
        loadingSections,
        total,
        page,
        limit,
        sections,
        loadingTeachers,
        teachers,
    };
};

export default useSection;