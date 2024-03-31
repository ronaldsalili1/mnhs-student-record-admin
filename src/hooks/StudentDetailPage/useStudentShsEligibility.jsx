import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useStudentShsEligibility = (studentId) => {
    const [meta, setMeta] = useState(null);
    const [loadingStudentShsEligibility, setLoadingStudentShsEligibility] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [studentShsEligibility, setStudentShsEligibility] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getStudentShsEligibilityById = async () => {
        setLoadingStudentShsEligibility(true);

        const response = await get({ uri: `/admin/student-shs-eligibilities/${studentId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingStudentShsEligibility(false);
            return;
        }

        setStudentShsEligibility(response?.data?.student_shs_eligibility);
        setLoadingStudentShsEligibility(false);
    };

    const createOrUpdateStudentShsEligibility = async ({ studentShsEligibilityId, fields }) => {
        setLoadingSubmit(true);

        const body = {
            student_shs_eligibility: {
                ...fields,
                student_id: studentId,
            },
        };

        let response;
        if (studentShsEligibilityId) {
            response = await patch({
                uri: `/admin/student-shs-eligibilities/${studentShsEligibilityId}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/student-shs-eligibilities',
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

        const { student_shs_eligibility } = response.data;

        setMeta(response.meta);
        setStudentShsEligibility(student_shs_eligibility);
        setLoadingSubmit(false);

        navigate(`/students/${studentId}/shs-eligibility`);
    };

    useEffect(() => {
        studentId && getStudentShsEligibilityById();

        return () => {
            setStudentShsEligibility(null);
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
        getStudentShsEligibilityById,
        createOrUpdateStudentShsEligibility,
        loadingStudentShsEligibility,
        loadingSubmit,
        studentShsEligibility,
    };
};

export default useStudentShsEligibility;