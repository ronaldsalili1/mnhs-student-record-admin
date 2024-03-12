import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import SubjectSearchForm from './components/SubjectSearchForm';
import { capitalizeFirstLetter } from '../../helpers/general';

const { Link } = Typography;

const SubjectPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

    useEffect(() => {
        setTitle('Subjects');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: data => {
                return capitalizeFirstLetter(data);
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/subjects/${record._id}`)}
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
            name: 'Subject A',
            type: 'core',
        },
        {
            key: '621d2a6e9bea8f5e982a129e',
            _id: '621d2a6e9bea8f5e982a129e',
            name: 'Subject B',
            type: 'applied',
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
                <SubjectSearchForm/>
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    htmlType="submit"
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => navigate('/subjects/create')}
                >
                    New Subject
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

export default SubjectPage;