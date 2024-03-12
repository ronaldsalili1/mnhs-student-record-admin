import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useAdministratorDetail = (adminId) => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);
    const [admin, setAdmin] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getAdministratorById = async () => {
        setLoading(true);

        const response = await get({ uri: `/admin/admins/${adminId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoading(false);
            return;
        }

        setAdmin(response?.data?.admin);
        setLoading(false);
    };

    const createOrUpdateAdministrator = async ({ adminId, fields }) => {
        setLoading(true);

        const body = {
            admin: {
                ...fields,
            },
        };

        let response;
        if (adminId) {
            response = await patch({
                uri: `/admin/admins/${adminId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/admins',
                body,
                navigate,
                location,
            });
        }

        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoading(false);
            return;
        }

        const { admin } = response.data;

        setMeta(response.meta);
        setAdmin(admin);
        setLoading(false);

        navigate(`/administrators/${admin._id}`);
    };

    useEffect(() => {
        adminId && getAdministratorById();

        return () => {
            setAdmin(null);
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
        getAdministratorById,
        createOrUpdateAdministrator,
        loading,
        admin,
    };
};

export default useAdministratorDetail;