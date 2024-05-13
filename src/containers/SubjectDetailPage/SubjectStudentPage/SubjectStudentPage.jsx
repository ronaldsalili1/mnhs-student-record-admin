import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Modal } from 'antd';
import { PlusSquareFilled, ExclamationCircleFilled } from '@ant-design/icons';

import { AuthContext } from '../../../providers/AuthProvider';
import useSubjectStudent from '../../../hooks/SubjectDetailPage/useSubjectStudent';
import SubjectStudentSearchForm from './components/SubjectStudentSearchForm';
import { formatFullName, getParamsFromUrl, objectToQueryString } from '../../../helpers/general';
import StudentSearchModal from '../../../components/StudentSearchModal';
import StudentConfirmationModal from './components/StudentConfirmationModal';

const { Link } = Typography;
const { confirm } = Modal;

const SubjectStudentPage = (props) => {
    const { activeSemester } = useContext(AuthContext);
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
        deleteSubjectStudentById,
        loadingSubmit,
        createOrUpdateSubjectStudent,
    } = subjectStudentProps;

    const [addStudentsModal, setAddStudentsModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

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

    const onAddStudent = () => {
        createOrUpdateSubjectStudent({
            fields: {
                student_ids: selectedStudents,
                semester_id: activeSemester._id,
            },
        });
    };

    const columns = [
        {
            title: 'Name (Last, First, Middle, Suffix)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => formatFullName(record),
        },
        {
            title: 'Grades',
            children: [
                {
                    title: 'Q1',
                    dataIndex: 'quarter_1',
                    key: 'quarter_1',
                    render: (_, record) => record?.grade?.quarter_1 || '-',
                },
                {
                    title: 'Q2',
                    dataIndex: 'quarter_2',
                    key: 'quarter_2',
                    render: (_, record) => record?.grade?.quarter_2 || '-',
                },
                {
                    title: 'Final',
                    dataIndex: 'final_grade',
                    key: 'final_grade',
                    render: (_, record) => {
                        const { quarter_1, quarter_2 } = record?.grade || {};
                        let grade;
                        if (quarter_1 && !quarter_2) {
                            grade = quarter_1;
                        } else if (!quarter_1 && quarter_2) {
                            grade = quarter_2;
                        } else if (quarter_1 && quarter_2) {
                            grade = (quarter_1 + quarter_2) / 2;
                        }
                        return grade ? Math.round(grade) : '-';
                    },
                },
            ],
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        type="danger"
                        onClick={() => {
                            confirmDelete(record.subject_student_id);
                        }}
                    >
                            Delete
                    </Link>
                );
            },
        },
    ];

    useEffect(() => {
        if (meta?.code === 200) {
            setConfirmation(false);
            setAddStudentsModal(false);
        }
    }, [meta]);

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
                    onClick={() => setAddStudentsModal(true)}
                >
                    Add Student
                </Button>
            </Flex>
            <Table
                loading={loadingSubjectStudents}
                scroll={ { x: true } }
                bordered
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
            <StudentSearchModal
                title="Add Students"
                width={800}
                open={addStudentsModal}
                destroyOnClose={true}
                maskClosable={false}
                onCancel={() => setAddStudentsModal(false)}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                searchBySection={true}
                exclude={subjectStudents.map(subjectStudent => subjectStudent._id)}
                excludeStudentsInSection={false}
                actionComponent={(
                    <Button
                        disabled={selectedStudents.length === 0}
                        size="large"
                        type="primary"
                        icon={<PlusSquareFilled />}
                        htmlType="submit"
                        style={{ width: '100%', marginTop: 10 }}
                        onClick={() => setConfirmation(true)}
                    >
                        Save Selected Students
                    </Button>
                )}
            />
            <StudentConfirmationModal
                title="Confirmation"
                destroyOnClose={true}
                width={450}
                open={confirmation}
                onCancel={() => setConfirmation(false)}
                subject={props?.subject}
                loadingSubmit={loadingSubmit}
                onConfirm={onAddStudent}
            />
        </Flex>
    );
};

export default SubjectStudentPage;