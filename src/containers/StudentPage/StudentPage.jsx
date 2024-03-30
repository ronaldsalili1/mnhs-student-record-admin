import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import useStudent from '../../hooks/useStudent';
import StudentSearchForm from './components/StudentSearchForm';
import options from '../../constants/options';
import { getParamsFromUrl, objectToQueryString } from '../../helpers/general';

const { Link } = Typography;

const StudentPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    
    const location = useLocation();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();
    const { loadingStudents, students, page, limit, total, getStudents } = useStudent();

    useEffect(() => {
        setTitle('Students');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Name (Last, First, Suffix, Middle)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => {
                const { last_name, first_name, middle_name, suffix } = record || {};
                return `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`;
            },
        },
        {
            title: 'LRN',
            dataIndex: 'lrn',
            key: 'lrn',
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
            render: data => options.sex.find(s => s.value === data)?.label || '-',
        },
        {
            title: 'Grade Level',
            dataIndex: 'grade_level',
            key: 'grade_level',
            render: data => data || '-',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/students/${record._id}/information`)}
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
                <StudentSearchForm getStudents={getStudents}/>
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    htmlType="submit"
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => navigate('/students/create')}
                >
                    New Student
                </Button>
            </Flex>
            <Table
                loading={loadingStudents}
                scroll={ { x: true } }
                dataSource={students.map(student => ({ ...student, key: student._id }))}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getStudents(queryObj);
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

export default StudentPage;