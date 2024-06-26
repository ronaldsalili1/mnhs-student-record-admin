import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Typography, Flex } from 'antd';
import dayjs from 'dayjs';

import { NavigationContext } from '../../providers/NavigationProvider';
import { getParamsFromUrl, formatFullName, objectToQueryString } from '../../helpers/general';
import useGradeSubmission from '../../hooks/useGradeSubmission';
import options from '../../constants/options';
import { formatSemester } from '../../helpers/semester';
import GradeSubmissionSearchForm from './components/GradeSubmissionSearchForm';

const { Link } = Typography;

const GradeSubmissions = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;

    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();
    const {
        getGradeSubmissions,
        loadingGradeSubmissions,
        total,
        page,
        limit,
        gradeSubmissions,
    } = useGradeSubmission();

    useEffect(() => {
        setTitle('Grade Submissions');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: data => data.name,
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            render: data => formatSemester(data),
        },
        {
            title: 'Teacher',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => formatFullName(record.teacher),
        },
        {
            title: 'Submission Date',
            dataIndex: 'submitted_at',
            key: 'submitted_at',
            render: data => dayjs(data).format('YYYY-MM-DD'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: data => options.gradeSubmissionStatus.find(status => status.value === data).label,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/grade-submissions/${record._id}`)}
                    >
						View
                    </Link>   
                );
            },
        },
    ];

    return (
        <>
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                <GradeSubmissionSearchForm getGradeSubmissions={getGradeSubmissions} />
            </Flex>
            <Table
                loading={loadingGradeSubmissions}
                scroll={ { x: true } }
                dataSource={gradeSubmissions.map(gradeSubmission => {
                    return { ...gradeSubmission, key: gradeSubmission._id };
                })}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getGradeSubmissions(queryObj);
                        const queryString = objectToQueryString(queryObj);
                        navigate(`${location.pathname}${queryString}`);
                    },
                    position: ['bottomRight'],
                    total,
                    pageSize: limit,
                }}
            />
        </>
    );
};

export default GradeSubmissions;