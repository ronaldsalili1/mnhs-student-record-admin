import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';

const { Link } = Typography;

const SectionPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;

    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

    useEffect(() => {
        setTitle('Sections');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataSource = [
        {
            key: '621d2a6e9bea8f5e982a129d',
            _id: '621d2a6e9bea8f5e982a129d',
            grade_level: 12,
            name: 'Wonderful',
            adviser: 'Teacher A',
        },
        {
            key: '621d2a6e9bea8f5e982a129e',
            _id: '621d2a6e9bea8f5e982a129e',
            grade_level: 11,
            name: 'Beautiful',
            adviser: 'Teacher B',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Grade Level',
            dataIndex: 'grade_level',
            key: 'grade_level',
        },
        {
            title: 'Adviser',
            dataIndex: 'adviser',
            key: 'adviser',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/sections/${record._id}`)}
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
                    onClick={() => navigate('/sections/create')}
                >
                    New Section
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

export default SectionPage;