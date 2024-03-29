import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

import SubjectTeacherModal from './components/SubjectTeacherModal';
import useSubjectTeacher from '../../../hooks/SubjectDetailPage/useSubjectTeacher';
import { getParamsFromUrl, objectToQueryString } from '../../../helpers/general';

const { Link } = Typography;

const SubjectTeacherPage = () => {
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const subjectTeacherProps = useSubjectTeacher();
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
    } = subjectTeacherProps;

    useEffect(() => {
        if (meta?.code === 200) {
            setModal(false);
        }
    }, [meta]);

    const columns = [
        {
            title: 'Teacher',
            dataIndex: 'teacher',
            key: 'teacher',
            render: (_, record) => {
                const { last_name, first_name, suffix, middle_name } = record?.teacher || {};
                return `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`;
            },
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
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => setModal(true)}
                >
                    Add Teacher
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
            <SubjectTeacherModal
                title={subjectTeacher ? subjectTeacher?.subject?.name : 'Add Subject'}
                destroyOnClose={true}
                width={450}
                open={modal}
                onCancel={() => {
                    setModal(false);
                    setSubjectTeacher(null);
                }}
                subjectTeacherProps={subjectTeacherProps}
            />
        </Flex>
    );
};

export default SubjectTeacherPage;