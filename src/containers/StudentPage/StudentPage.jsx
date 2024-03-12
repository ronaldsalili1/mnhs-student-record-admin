import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import StudentSearchForm from './components/StudentSearchForm';

const { Link } = Typography;

const StudentPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

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
        },
        {
            title: 'LRN',
            dataIndex: 'lrn',
            key: 'lrn',
        },
        {
            title: 'Birthdate',
            dataIndex: 'birthdate',
            key: 'birthdate',
        },
        {
            title: 'Sex',
            dataIndex: 'sex',
            key: 'sex',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/students/${record._id}`)}
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
            name: 'Cadayong, Mhar Padro',
            lrn: '6482947',
            birthdate: 'April 22, 1994',
            sex: 'Male',
        },
        {
            key: '621d2a6e9bea8f5e982a129e',
            _id: '621d2a6e9bea8f5e982a129e',
            name: 'Magayo-ong, Almirah Mae',
            lrn: '9467947',
            birthdate: 'June 20, 1998',
            sex: 'Female',
        },
        {
            key: '621d2a6e9bea8f5e982a129f',
            _id: '621d2a6e9bea8f5e982a129f',
            name: 'Pantin, Juden Jay',
            lrn: '3948592',
            birthdate: 'September 06, 1995',
            sex: 'Male',
        },
        {
            key: '621d2a6e9bea8f5e982a12a0',
            _id: '621d2a6e9bea8f5e982a12a0',
            name: 'Salili, Ronald Hamot',
            lrn: '1234567',
            birthdate: 'January 10, 1999',
            sex: 'Male',
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
                <StudentSearchForm/>
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
                scroll={ { x: true } }
                dataSource={dataSource}
                columns={columns}
            />
        </>
    );
};

export default StudentPage;