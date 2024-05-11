import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { get, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';

const useGradeSubmissionDetail = () => {
    const [meta, setMeta] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [studentGradeData, setStudentGradeData] = useState([]);
    const [semester, setSemester] = useState(null);
    const [quarter, setQuarter] = useState(null);
    const [subject, setSubject] = useState(null);
    const [loadingGrades, setLoadingGrades] = useState(false);
    const [gradeSubmission, setGradeSubmission] = useState(null);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();
    const { gradeSubmissionId } = useParams();

    const resetMeta = () => {
        setMeta(null);
    };

    const getGradeSubmissionById = async () => {
        setLoadingGrades(true);

        const response = await get({
            uri: `/admin/grades/submissions/${gradeSubmissionId}`,
            navigate,
            location,
        });

        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingGrades(false);
            return;
        }

        setGradeSubmission(response?.data?.grade_submission);
        setSemester(response?.data?.semester);
        setQuarter(response?.data?.quarter);
        setSubject(response?.data?.subject);
        setStudentGradeData(response?.data?.student_grade_data);
        setLoadingGrades(false);
    };

    const updateGradeSubmissionStatus = async ({ fields }) => {
        setLoadingSubmit(true);

        const body = {
            grade_submission: {
                ...fields,
            },
        };

        const response = await patch({
            uri: `/admin/grades/submissions/${gradeSubmissionId}/update-status`,
            body,
            navigate,
            location,
        });

        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubmit(false);
            return;
        }

        setMeta(response.meta);
        setGradeSubmission({
            ...gradeSubmission,
            ...response?.data?.grade_submission,
        });
        setLoadingSubmit(false);
    };

    useEffect(() => {
        gradeSubmissionId && getGradeSubmissionById();

        return () => {
            setMeta(null);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gradeSubmissionId]);

    useEffect(() => {
        if (meta) {
            const type = meta.code === 200 ? 'success' : 'error';
            notificationApi[type]({
                message: meta.message,
                placement: 'bottomRight',
            });

            if (meta.code === 200) {
                gradeSubmissionId && getGradeSubmissionById();
            }
        }

        return () => resetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    return {
        meta,
        resetMeta,
        loadingSubmit,
        studentGradeData,
        setStudentGradeData,
        semester,
        quarter,
        setSemester,
        subject,
        setSubject,
        loadingGrades,
        setLoadingGrades,
        gradeSubmission,
        setQuarter,
        updateGradeSubmissionStatus,
    };
};

export default useGradeSubmissionDetail;