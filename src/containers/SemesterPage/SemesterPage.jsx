import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

import { NavigationContext } from '../../providers/NavigationProvider';
import useSemester from '../../hooks/useSemester';
import { getParamsFromUrl, objectToQueryString } from '../../helpers/general';
import options from '../../constants/options';

const { Link, Text } = Typography;

const SemesterPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    
    const query = getParamsFromUrl();
    const location = useLocation();
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();
    const { semesters, loadingSemesters, getSemesters, page, limit, total }= useSemester();

    useEffect(() => {
        setTitle('Semesters');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'School Year (SY)',
            dataIndex: 'school_year',
            key: 'school_year',
            render: (_, record) => {
                const { sy_start_year, sy_end_year } = record || {};
                return `${dayjs(sy_start_year).year()} - ${dayjs(sy_end_year).year()}`;
            },
        },
        {
            title: 'Semester',
            dataIndex: 'term',
            key: 'term',
            render: data => {
                let semester = '';

                switch (data) {
                    case 1:
                        semester = '1st';
                        break;
                    case 2:
                        semester = '2nd';
                        break;
                    default:
                        break;
                }

                return semester;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: data => {
                const status = options.semesterStatus.find(status => status.value === data);
                if (data !== 'active') {
                    return status.label;
                }

                return <Text type="success">{status.label}</Text>;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/semesters/${record._id}`)}
                    >
						Edit
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
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    htmlType="submit"
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => navigate('/semesters/create')}
                >
                    New Semester
                </Button>
            </Flex>
            <Table
                loading={loadingSemesters}
                scroll={ { x: true } }
                dataSource={semesters.map(semester => {
                    return { ...semester, key: semester._id };
                })}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getSemesters(queryObj);
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

export default SemesterPage;