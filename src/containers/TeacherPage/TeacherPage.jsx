import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Badge, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import TeacherSearchForm from './components/TeacherSearchForm';
import options from '../../constants/options';

const { Link } = Typography;

const TeacherPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;

    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

    useEffect(() => {
        setTitle('Teachers');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dataSource = [
        {
            key: '621d2a6e9bea8f5e982a129d',
            _id: '621d2a6e9bea8f5e982a129d',
            name: 'Cadayong, Mhar Padro',
            email: 'mhar@email.com',
            status: 'enabled',
        },
        {
            key: '621d2a6e9bea8f5e982a129e',
            _id: '621d2a6e9bea8f5e982a129e',
            name: 'Magayo-ong, Almirah Mae',
            email: 'almirah@email.com',
            status: 'enabled',
        },
        {
            key: '621d2a6e9bea8f5e982a129f',
            _id: '621d2a6e9bea8f5e982a129f',
            name: 'Pantin, Juden Jay',
            email: 'juden@email.com',
            status: 'enabled',
        },
        {
            key: '621d2a6e9bea8f5e982a12a0',
            _id: '621d2a6e9bea8f5e982a12a0',
            name: 'Salili, Ronald Hamot',
            email: 'ronald@email.com',
            status: 'disabled',
        },
    ];

    const columns = [
        {
            title: 'Name (Last, First, Suffix, Middle)',
            dataIndex: 'name',
            key: 'name',
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
                <TeacherSearchForm/>
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
                scroll={ { x: true } }
                dataSource={dataSource}
                columns={columns}
            />
        </>
    );
};

export default TeacherPage;