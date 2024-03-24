import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useSubjectDetail = (subjectId) => {
    const [meta, setMeta] = useState(null);
    const [loadingSubject, setLoadingSubject] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [subject, setSubject] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getSubjectById = async () => {
        setLoadingSubject(true);

        const response = await get({ uri: `/admin/subjects/${subjectId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubject(false);
            return;
        }

        setSubject(response?.data?.subject);
        setLoadingSubject(false);
    };

    const createOrUpdateSubject = async ({ subjectId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            subject: {
                ...fields,
            },
        };

        let response;
        if (subjectId) {
            response = await patch({
                uri: `/admin/subjects/${subjectId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/subjects',
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

        const { subject } = response.data;

        setMeta(response.meta);
        setSubject(subject);
        setLoadingSubmit(false);

        navigate(`/subjects/${subject._id}/information`);
    };

    useEffect(() => {
        subjectId && getSubjectById();

        return () => {
            setSubject(null);
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
        getSubjectById,
        createOrUpdateSubject,
        loadingSubject,
        loadingSubmit,
        subject,
    };
};

export default useSubjectDetail;