import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';

const { Link } = Typography;

const SemesterPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

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
        },
        {
            title: 'Semester',
            dataIndex: 'number',
            key: 'number',
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

    const dataSource = [
        {
            key: '621d2a6e9bea8f5e982a129d',
            _id: '621d2a6e9bea8f5e982a129d',
            school_year: '2023-2024',
            number: 2,
        },
        {
            key: '621d2a6e9bea8f5e982a129e',
            _id: '621d2a6e9bea8f5e982a129e',
            school_year: '2022-2023',
            number: 1,
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
                scroll={ { x: true } }
                dataSource={dataSource}
                columns={columns}
            />
        </>
    );
};

export default SemesterPage;