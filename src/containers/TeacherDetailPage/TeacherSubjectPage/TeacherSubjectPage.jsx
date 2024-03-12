import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Badge, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../../providers/NavigationProvider';
import TeacherSubjectSearchForm from './components/TeacherSubjectSearchForm';
import TeacherSubjectModal from './components/TeacherSubjectModal';

const { Link } = Typography;

const TeacherSubjectPage = () => {
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();


    const dataSource = [
        {
            key: '621d2a6e9bea8f5e982a129d',
            _id: '621d2a6e9bea8f5e982a129d',
            name: 'Subject A',
            semester: 'S.Y. 2023-2024 | 2nd Semester',
        },
        {
            key: '621d2a6e9bea8f5e982a129e',
            _id: '621d2a6e9bea8f5e982a129e',
            name: 'Subject B',
            semester: 'S.Y. 2022-2023 | 1st Semester',
        },
    ];

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link onClick={() => setModal(true)}>
						Edit
                    </Link>   
                );
            },
        },
    ];

    return (
        <Flex
            vertical
            style={{ width: '100%' }}
        >
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                <TeacherSubjectSearchForm/>
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => setModal(true)}
                >
                    Add Subject
                </Button>
            </Flex>
            <Table
                scroll={ { x: true } }
                dataSource={dataSource}
                columns={columns}
            />
            <TeacherSubjectModal
                title="Add Subject"
                width={450}
                open={modal}
                onCancel={() => setModal(false)}
            />
        </Flex>
    );
};

export default TeacherSubjectPage;