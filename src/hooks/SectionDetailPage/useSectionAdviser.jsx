import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';
import { getParamsFromUrl } from '../../helpers/general';

const useSectionAdviser = () => {
    const [meta, setMeta] = useState(null);
    const [loadingSectionAdvisers, setLoadingSectionAdvisers] = useState(false);
    const [loadingSectionAdviser, setLoadingSectionAdviser] = useState(false);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [sectionAdviser, setSectionAdviser] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [sectionAdvisers, setSectionAdvisers] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;
    const { sectionId } = useParams();

    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
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

    const getSectionAdvisers = async (query) => {
        setLoadingSectionAdvisers(true);

        const newQuery = query
            ? {
                ...query, 
                section_id: sectionId,
            }
            : { section_id: sectionId };
        const response = await get({ uri: '/admin/section-advisers', query: newQuery, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSectionAdvisers(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setSectionAdvisers(response?.data?.section_advisers);
        setLoadingSectionAdvisers(false);
    };

    const getSectionAdviserById = async (sectionAdviserId) => {
        setLoadingSectionAdviser(true);

        const response = await get({ uri: `/admin/section-advisers/${sectionAdviserId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSectionAdviser(false);
            return;
        }

        setSectionAdviser(response?.data?.section_adviser);
        setLoadingSectionAdviser(false);
    };

    const createOrUpdateSectionAdviser = async ({ sectionAdviserId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            section_adviser: {
                ...fields,
                section_id: sectionId,
                current_timestamp: dayjs().toString(),
            },
        };

        let response;
        if (sectionAdviserId) {
            response = await patch({
                uri: `/admin/section-advisers/${sectionAdviserId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/section-advisers',
                body,
                navigate,
                location,
            });
        }

        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubmit(false);
            return;
        }

        setMeta(response.meta);
        setLoadingSubmit(false);
    };

    useEffect(() => {
        getTeacherOptions();
        getSectionAdvisers(query);

        return () => {
            setSectionAdviser(null);
            setTeachers([]);
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (meta) {
            const type = meta.code === 200 ? 'success' : 'error';
            notificationApi[type]({
                message: meta.message,
                placement: 'bottomRight',
            });

            if (meta.code === 200) {
                getSectionAdvisers();
                setSectionAdviser(null);
            }
        }
        

        return () => resetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    return {
        meta,
        resetMeta,
        setSectionAdviser,
        getSectionAdvisers,
        getSectionAdviserById,
        createOrUpdateSectionAdviser,
        loadingSectionAdviser,
        loadingSubmit,
        loadingSectionAdvisers,
        loadingTeachers,
        sectionAdvisers,
        sectionAdviser,
        teachers,
        total,
        page,
        limit,
    };
};

export default useSectionAdviser;