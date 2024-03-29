import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { get, post, patch } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';
import { getParamsFromUrl } from '../../helpers/general';

const useSubjectTeacher = () => {
    const [meta, setMeta] = useState(null);
    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [loadingSubjectTeacher, setLoadingSubjectTeacher] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingSubjectTeachers, setLoadingSubjectTeachers] = useState(false);
    const [subjectTeacher, setSubjectTeacher] = useState(null);
    const [subjectTeachers, setSubjectTeachers] = useState([]);
    const [teachers, setTeachers] = useState([]);
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

    const getSubjectTeachers = async (query) => {
        setLoadingSubjectTeachers(true);

        const newQuery = query
            ? {
                ...query, 
                subject_id: subjectId,
                sort_by: 'teacher',
            }
            : { subject_id: subjectId, sort_by: 'teacher' };
        const response = await get({ uri: '/admin/subject-teachers', query: newQuery, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubjectTeachers(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setSubjectTeachers(response?.data?.subject_teachers);
        setLoadingSubjectTeachers(false);
    };

    const getSubjectTeacherById = async (subjectTeacherId) => {
        setLoadingSubjectTeacher(true);

        const response = await get({ uri: `/admin/subject-teachers/${subjectTeacherId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSubjectTeacher(false);
            return;
        }

        setSubjectTeacher(response?.data?.subject_teacher);
        setLoadingSubjectTeacher(false);
    };

    const createOrUpdateSubjectTeacher = async ({ fields }) => {
        setLoadingSubmit(true);

        const body = {
            subject_teacher: {
                ...fields,
                subject_id: subjectId,
                current_timestamp: dayjs().toISOString(),
            },
        };

        let response;
        if (subjectTeacher) {
            response = await patch({
                uri: `/admin/subject-teachers/${subjectTeacher._id}`,
                body,
                navigate,
                location,
            });
        } else {
            response = await post({
                uri: '/admin/subject-teachers',
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

    useEffect(() => {
        getSubjectTeachers(query);
        getTeacherOptions();

        return () => {
            setSubjectTeacher(null);
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
                getSubjectTeachers();
                setSubjectTeacher(null);
            }
        }

        return () => resetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    return {
        meta,
        resetMeta,
        setSubjectTeacher,
        getTeacherOptions,
        getSubjectTeachers,
        getSubjectTeacherById,
        createOrUpdateSubjectTeacher,
        loadingSubmit,
        loadingTeachers,
        loadingSubjectTeacher,
        loadingSubjectTeachers,
        teachers,
        subjectTeacher,
        subjectTeachers,
        total,
        page,
        limit,
    };
};

export default useSubjectTeacher;