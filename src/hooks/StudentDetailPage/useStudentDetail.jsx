import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useStudentDetail = (studentId) => {
    const [meta, setMeta] = useState(null);
    const [loadingStudent, setLoadingStudent] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [student, setStudent] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getStudentById = async () => {
        setLoadingStudent(true);

        const response = await get({ uri: `/admin/students/${studentId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingStudent(false);
            return;
        }

        setStudent(response?.data?.student);
        setLoadingStudent(false);
    };

    const createOrUpdateStudent = async ({ studentId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            student: {
                ...fields,
            },
        };

        let response;
        if (studentId) {
            response = await patch({
                uri: `/admin/students/${studentId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/students',
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

        const { student } = response.data;

        setMeta(response.meta);
        setStudent(student);
        setLoadingSubmit(false);

        navigate(`/students/${student._id}/information`);
    };

    useEffect(() => {
        studentId && getStudentById();

        return () => {
            setStudent(null);
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
        getStudentById,
        createOrUpdateStudent,
        loadingStudent,
        loadingSubmit,
        student,
    };
};

export default useStudentDetail;