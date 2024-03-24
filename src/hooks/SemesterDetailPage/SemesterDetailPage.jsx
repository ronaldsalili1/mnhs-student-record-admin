import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useSemesterDetail = (semesterId) => {
    const [meta, setMeta] = useState(null);
    const [loadingSemester, setLoadingSemester] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [semester, setSemester] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getSemesterById = async () => {
        setLoadingSemester(true);

        const response = await get({ uri: `/admin/semesters/${semesterId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSemester(false);
            return;
        }

        setSemester(response?.data?.semester);
        setLoadingSemester(false);
    };

    const createOrUpdateSemester = async ({ semesterId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            semester: {
                ...fields,
            },
        };

        let response;
        if (semesterId) {
            response = await patch({
                uri: `/admin/semesters/${semesterId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/semesters',
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

        const { semester } = response.data;

        setMeta(response.meta);
        setSemester(semester);
        setLoadingSubmit(false);

        navigate(`/semesters/${semester._id}`);
    };

    useEffect(() => {
        semesterId && getSemesterById();

        return () => {
            setSemester(null);
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
        getSemesterById,
        createOrUpdateSemester,
        loadingSemester,
        loadingSubmit,
        semester,
    };
};

export default useSemesterDetail;