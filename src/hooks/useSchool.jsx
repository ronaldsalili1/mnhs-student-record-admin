import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { NavigationContext } from '../providers/NavigationProvider';
import { get, patch, post } from '../helpers/request';
import { getParamsFromUrl } from '../helpers/general';

const useSchool = () => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [school, setSchool] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const resetMeta = () => {
        setMeta(null);
    };

    const getSchool = async (query) => {
        setLoading(true);

        const response = await get({ uri: '/admin/school', query, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoading(false);
            return;
        }

        setSchool(response?.data?.school);
        setLoading(false);
    };

    const createOrUpdateSchool = async ({ fields }) => {
        setLoadingSubmit(true);

        const body = {
            school: {
                ...fields,
            },
        };

        let response;
        if (school) {
            response = await patch({
                uri: '/admin/school',
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/school',
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

        const { school: newSchool } = response.data;

        setMeta(response.meta);
        setSchool(newSchool);
        setLoadingSubmit(false);
    };

    useEffect(() => {
        getSchool(query);

        return () => {
            setSchool(null);
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
        loading,
        loadingSubmit,
        school,
        createOrUpdateSchool,
    };
};

export default useSchool;