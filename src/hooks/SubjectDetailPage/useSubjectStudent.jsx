import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { get, post, patch, del } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';
import { getParamsFromUrl } from '../../helpers/general';

const useSubjectStudent = () => {
    const [meta, setMeta] = useState(null);
    const [loadingSemesters, setLoadingSemesters] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [loadingSubjectStudent, setLoadingSubjectStudent] = useState(false);
    const [loadingSubjectStudents, setLoadingSubjectStudents] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [subjectStudent, setSubjectStudent] = useState(null);
    const [subjectStudents, setSubjectStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;

    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();
    const { subjectId } = useParams();

    const resetMeta = () => {
        setMeta(null);
    };

    const getSemesterOptions = async () => {
        setLoadingSemesters(true);

        const response = await get({ uri: '/admin/semesters/options/all', navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSemesters(false);
            return;
        }

        setSemesters(response?.data?.semesters);
        setLoadingSemesters(false);
    };

    const getStudentOptions = async () => {
        setLoadingStudents(true);

        const response = await get({ uri: '/admin/students/options/all', navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingStudents(false);
            return;
        }

        setStudents(response?.data?.students);
        setLoadingStudents(false);
    };

    const getSubjectStudents = async (query) => {
        setLoadingSubjectStudents(true);

        const newQuery = query
            ? {
                ...query, 
                subject_id: subjectId,
            }
            : { subject_id: subjectId };
        const response = await get({ uri: '/admin/subject-students', query: newQuery, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubjectStudents(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setSubjectStudents(response?.data?.subject_students);
        setLoadingSubjectStudents(false);
    };

    const getSubjectStudentById = async (subjectStudentId) => {
        setLoadingSubjectStudent(true);

        const response = await get({ uri: `/admin/subject-students/${subjectStudentId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubjectStudent(false);
            return;
        }

        setSubjectStudent(response?.data?.subject_student);
        setLoadingSubjectStudent(false);
    };

    const createOrUpdateSubjectStudent = async ({ fields }) => {
        setLoadingSubmit(true);

        const body = {
            subject_student: {
                ...fields,
                subject_id: subjectId,
            },
        };

        let response;
        if (subjectStudent) {
            response = await patch({
                uri: `/admin/subject-students/${subjectStudent._id}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/subject-students',
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

    const deleteSubjectStudentById = async (subjectStudentId) => {
        // setLoadingSubjectStudent(true);

        const response = await del({ uri: `/admin/subject-students/${subjectStudentId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            // setLoadingSubjectStudent(false);
            return;
        }

        setMeta(response.meta);
        // setLoadingSubjectStudent(false);
    };

    useEffect(() => {
        getSubjectStudents(query);
        getSemesterOptions();
        getStudentOptions();

        return () => {
            setSubjectStudent(null);
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
                getSubjectStudents();
                setSubjectStudent(null);
            }
        }

        return () => resetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    return {
        meta,
        resetMeta,
        setSubjectStudent,
        getSemesterOptions,
        getSubjectStudents,
        getSubjectStudentById,
        createOrUpdateSubjectStudent,
        deleteSubjectStudentById,
        loadingSubmit,
        loadingSemesters,
        loadingStudents,
        loadingSubjectStudent,
        loadingSubjectStudents,
        students,
        semesters,
        subjectStudent,
        subjectStudents,
        total,
        page,
        limit,
    };
};

export default useSubjectStudent;