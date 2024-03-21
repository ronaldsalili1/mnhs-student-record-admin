import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useTeacherDetail = (teacherId) => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [teacher, setTeacher] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getTeacherById = async () => {
        setLoading(true);

        const response = await get({ uri: `/admin/teachers/${teacherId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoading(false);
            return;
        }

        setTeacher(response?.data?.teacher);
        setLoading(false);
    };

    const createOrUpdateTeacher = async ({ teacherId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            teacher: {
                ...fields,
            },
        };

        let response;
        if (teacherId) {
            response = await patch({
                uri: `/admin/teachers/${teacherId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/teachers',
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

        const { teacher } = response.data;

        setMeta(response.meta);
        setTeacher(teacher);
        setLoadingSubmit(false);

        navigate(`/teachers/${teacher._id}/information`);
    };

    useEffect(() => {
        teacherId && getTeacherById();

        return () => {
            setTeacher(null);
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
        getTeacherById,
        createOrUpdateTeacher,
        loading,
        loadingSubmit,
        teacher,
    };
};

export default useTeacherDetail;