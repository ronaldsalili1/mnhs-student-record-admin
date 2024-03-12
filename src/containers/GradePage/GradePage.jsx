import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled, UploadOutlined } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import GradeSearchForm from './components/GradeSearchForm';
import GradeUploadModal from './components/GradeUploadModal';

const { Link } = Typography;

const GradePage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

    const [uploadModal, setUploadModal] = useState(false);

    const columns = [
        {
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
        },
        {
            title: 'Student',
            dataIndex: 'student',
            key: 'student',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
        },
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
        },
    ];

    const dataSource = [
        {
            key: '621d2a6e9bea8f5e982a129d',
            _id: '621d2a6e9bea8f5e982a129d',
            student: 'Salili, Ronald Hamot',
            subject: 'Mathematics',
            semester: 'S.Y. 2023-2024 - 2nd Semester',
            teacher: 'Teacher A',
            grade: 90,
        },
        {
            key: '621d2a6e9bea8f5e982a129s',
            _id: '621d2a6e9bea8f5e982a129s',
            student: 'Salili, Ronald Hamot',
            subject: 'English',
            semester: 'S.Y. 2023-2024 - 2nd Semester',
            teacher: 'Teacher B',
            grade: 87,
        },
    ];

    useEffect(() => {
        setTitle('Grades');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                <GradeSearchForm/>
            </Flex>
            <Table
                scroll={ { x: true } }
                dataSource={dataSource}
                columns={columns}
            />
            <GradeUploadModal
                title="Upload Grades"
                // width={450}
                open={uploadModal}
                onCancel={() => setUploadModal(false)}
            />
        </>
    );
};

export default GradePage;