import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

import TeacherSubjectSearchForm from './components/TeacherSubjectSearchForm';
import TeacherSubjectModal from './components/TeacherSubjectModal';
import useTeacherSubjectDetail from '../../../hooks/TeacherDetailPage/useTeacherSubject';
import { getParamsFromUrl, objectToQueryString } from '../../../helpers/general';

const { Link } = Typography;

const TeacherSubjectPage = () => {
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const teacherSubjectProps = useTeacherSubjectDetail();
    const {
        loadingSubjectTeachers,
        subjectTeacher,
        subjectTeachers,
        meta,
        getSubjectTeacherById,
        setSubjectTeacher,
        page,
        limit,
        total,
        getSubjectTeachers,
    } = teacherSubjectProps;
    console.log('🚀 ~ limit:', limit);

    useEffect(() => {
        if (meta?.code === 200) {
            setModal(false);
        }
    }, [meta]);

    const columns = [
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            render: (_, record) => record.subject.name,
        },
        {
            title: 'Start At',
            dataIndex: 'start_at',
            key: 'start_at',
            render: data => dayjs(data).format('YYYY-MM-DD'),
        },
        {
            title: 'End At',
            dataIndex: 'end_at',
            key: 'end_at',
            render: data => data ? dayjs(data).format('YYYY-MM-DD') : '-',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => {
                            getSubjectTeacherById(record._id);
                            setModal(true);
                        }}
                    >
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
                <TeacherSubjectSearchForm {...teacherSubjectProps}/>
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
                loading={loadingSubjectTeachers}
                scroll={ { x: true } }
                dataSource={subjectTeachers.map(subjectTeacher => ({ ...subjectTeacher, key: subjectTeacher._id }))}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getSubjectTeachers(queryObj);
                        const queryString = objectToQueryString(queryObj);
                        navigate(`${location.pathname}${queryString}`);
                    },
                    position: ['bottomRight'],
                    total,
                    pageSize: limit,
                }}
            />
            <TeacherSubjectModal
                title={subjectTeacher ? subjectTeacher?.subject?.name : 'Add Subject'}
                destroyOnClose={true}
                width={450}
                open={modal}
                onCancel={() => {
                    setModal(false);
                    setSubjectTeacher(null);
                }}
                teacherSubjectProps={teacherSubjectProps}
            />
        </Flex>
    );
};

export default TeacherSubjectPage;