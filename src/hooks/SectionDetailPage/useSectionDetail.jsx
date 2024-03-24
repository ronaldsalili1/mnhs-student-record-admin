import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useSectionDetail = (sectionId) => {
    const [meta, setMeta] = useState(null);
    const [loadingSection, setLoadingSection] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [section, setSection] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [loadingTeachers, setLoadingTeachers] = useState(false);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getTeacherOptions = async () => {
        setLoadingTeachers(true);

        const response = await get({ uri: '/admin/teachers/all/options', navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingTeachers(false);
            return;
        }

        setTeachers(response?.data?.teachers);
        setLoadingTeachers(false);
    };

    const getSectionById = async () => {
        setLoadingSection(true);

        const response = await get({ uri: `/admin/sections/${sectionId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSection(false);
            return;
        }

        setSection(response?.data?.section);
        setLoadingSection(false);
    };

    const createOrUpdateSection = async ({ sectionId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            section: {
                ...fields,
            },
        };

        let response;
        if (sectionId) {
            response = await patch({
                uri: `/admin/sections/${sectionId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/sections',
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

        const { section } = response.data;

        setMeta(response.meta);
        setSection(section);
        setLoadingSubmit(false);

        navigate(`/sections/${section._id}`);
    };

    useEffect(() => {
        getTeacherOptions();
        sectionId && getSectionById();

        return () => {
            setSection(null);
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
        }

        return () => resetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    return {
        meta,
        resetMeta,
        getSectionById,
        createOrUpdateSection,
        loadingSection,
        loadingSubmit,
        section,
        loadingTeachers,
        teachers,
    };
};

export default useSectionDetail;