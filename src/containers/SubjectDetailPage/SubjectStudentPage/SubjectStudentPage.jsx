import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Divider, Modal } from 'antd';
import { PlusSquareFilled, ExclamationCircleFilled } from '@ant-design/icons';

import useSubjectStudent from '../../../hooks/SubjectDetailPage/useSubjectStudent';
import SubjectStudentModal from './components/SubjectStudentModal';
import SubjectStudentSearchForm from './components/SubjectStudentSearchForm';
import { formatFullName, getParamsFromUrl, objectToQueryString } from '../../../helpers/general';

const { Link } = Typography;
const { confirm } = Modal;

const SubjectStudentPage = () => {
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const subjectStudentProps = useSubjectStudent();
    const {
        meta,
        loadingSubjectStudents,
        subjectStudents,
        page,
        limit,
        total,
        getSubjectStudents,
        subjectStudent,
        setSubjectStudent,
        deleteSubjectStudentById,
        getSubjectStudentById,
    } = subjectStudentProps;
 

    useEffect(() => {
        if (meta?.code === 200) {
            setModal(false);
        }
    }, [meta]);

    const confirmDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this record?',
            icon: <ExclamationCircleFilled />,
            okButtonProps: {
                danger: true,
            },
            okText: 'Delete',
            onOk: () => {
                deleteSubjectStudentById(id);
            },
        });
    };

    const columns = [
        {
            title: 'Name (Last, First, Middle, Suffix)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => formatFullName(record?.student),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <>
                        <Link
                            onClick={() => {
                                getSubjectStudentById(record._id);
                                setModal(true);
                            }}
                        >
                            Edit
                        </Link>  
                        <Divider type="vertical" />
                        <Link
                            type="danger"
                            onClick={() => {
                                confirmDelete(record._id);
                            }}
                        >
                            Delete
                        </Link>  
                    </> 
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
                <SubjectStudentSearchForm {...subjectStudentProps}/>
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => setModal(true)}
                >
                    Add Student
                </Button>
            </Flex>
            <Table
                loading={loadingSubjectStudents}
                scroll={ { x: true } }
                dataSource={subjectStudents.map(subjectStudent => ({ ...subjectStudent, key: subjectStudent._id }))}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getSubjectStudents(queryObj);
                        const queryString = objectToQueryString(queryObj);
                        navigate(`${location.pathname}${queryString}`);
                    },
                    position: ['bottomRight'],
                    total,
                    pageSize: limit,
                }}
            />
            <SubjectStudentModal
                title={subjectStudent
                    ? `${subjectStudent.student.last_name}, 
                        ${subjectStudent.student.first_name}
                        ${subjectStudent.student.suffix ? ', ' + subjectStudent.student.suffix : '' }
                        ${subjectStudent.student.middle_name ? ', ' + subjectStudent.student.middle_name : ''}`
                    : 'Add Student'}
                destroyOnClose={true}
                width={450}
                open={modal}
                onCancel={() => {
                    setModal(false);
                    setSubjectStudent(null);
                }}
                subjectStudentProps={subjectStudentProps}
            />
        </Flex>
    );
};

export default SubjectStudentPage;