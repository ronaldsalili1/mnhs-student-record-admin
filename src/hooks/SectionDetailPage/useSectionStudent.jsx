import { useEffect, useState, useContext } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { get, post, del } from '../../helpers/request';
import { NavigationContext } from '../../providers/NavigationProvider';
import { getParamsFromUrl } from '../../helpers/general';

const useSectionStudent = () => {
    const [meta, setMeta] = useState(null);
    const [loadingSectionStudents, setLoadingSectionStudents] = useState(false);
    const [loadingStudents, setLoadingStudents] = useState(false);
    const [loadingSemesters, setLoadingSemesters] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [sectionStudents, setSectionStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const layoutState = useContext(NavigationContext);
    const { notificationApi } = layoutState;
    const { sectionId } = useParams();

    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const resetMeta = () => {
        setMeta(null);
    };

    const getStudentOptions = async (semesterId) => {
        setLoadingStudents(true);

        const query = {
            section_id: sectionId,
            semester_id: semesterId,
        };
        console.log('🚀 ~ query:', query);

        const response = await get({
            uri: '/admin/section-students/options/students',
            navigate,
            location,
            query: {
                section_id: sectionId,
                semester_id: semesterId,
            } });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingStudents(false);
            return;
        }

        setStudents(response?.data?.students);
        setLoadingStudents(false);
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

    const getSectionStudents = async (query) => {
        setLoadingSectionStudents(true);

        const newQuery = query
            ? {
                ...query, 
                section_id: sectionId,
            }
            : { section_id: sectionId };
        const response = await get({ uri: '/admin/section-students', query: newQuery, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            setLoadingSectionStudents(false);
            return;
        }

        setTotal(response?.data?.total);
        setPage(response?.data?.page);
        setLimit(response?.data?.limit);
        setSectionStudents(response?.data?.section_students);
        setLoadingSectionStudents(false);
    };

    const deleteSectionStudentById = async (sectionStudentId) => {
        const response = await del({ uri: `/admin/section-students/${sectionStudentId}`, navigate, location });
        if (response?.meta?.code !== 200) {
            setMeta(response?.meta);
            return;
        }

        setMeta(response?.meta);
    };

    const createSectionStudents = async ({ fields }) => {
        setLoadingSubmit(true);

        const body = {
            section_students: {
                ...fields,
                section_id: sectionId,
            },
        };

        const response = await post({
            uri: '/admin/section-students',
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
        setLoadingSubmit(false);
    };

    useEffect(() => {
        getSemesterOptions();
        getSectionStudents(query);

        return () => {
            setSectionStudents([]);
            setStudents([]);
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
                getSectionStudents(query);
            }
        }
        

        return () => resetMeta();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta]);

    return {
        meta,
        resetMeta,
        getStudentOptions,
        getSectionStudents,
        createSectionStudents,
        deleteSectionStudentById,
        loadingSubmit,
        loadingSectionStudents,
        loadingStudents,
        loadingSemesters,
        sectionStudents,
        students,
        semesters,
        total,
        page,
        limit,
    };
};

export default useSectionStudent;