import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Typography, Badge, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import TeacherSearchForm from './components/TeacherSearchForm';
import options from '../../constants/options';
import useTeacher from '../../hooks/useTeacher';
import { getParamsFromUrl, objectToQueryString } from '../../helpers/general';

const { Link } = Typography;

const TeacherPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;

    const navigate = useNavigate();
    const location = useLocation();
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const { teachers, loading, page, total, limit, getTeachers } = useTeacher();

    useEffect(() => {
        setTitle('Teachers');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Name (Last, First, Suffix, Middle)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                const {
                    last_name,
                    first_name,
                    suffix,
                    middle_name,
                } = record;
                return `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + record.middle_name : ''}`;
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: data => {
                const status = data === 'enabled' ? 'success' : 'error';
                const text = options.status.find(s => s.value === data);

                return (
                    <Badge
                        status={status}
                        text={text.label}
                    />
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/teachers/${record._id}/information`)}
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
                <TeacherSearchForm getTeachers={getTeachers}/>
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    htmlType="submit"
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => navigate('/teachers/create')}
                >
                    New Teacher
                </Button>
            </Flex>
            <Table
                loading={loading}
                scroll={ { x: true } }
                dataSource={teachers.map(teacher => {
                    return ({
                        ...teacher,
                        key: teacher._id,
                    });
                })}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getTeachers(queryObj);
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

export default TeacherPage;