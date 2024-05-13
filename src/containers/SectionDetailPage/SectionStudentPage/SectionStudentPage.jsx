import { useEffect, useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Modal } from 'antd';
import { PlusSquareFilled, ExclamationCircleFilled } from '@ant-design/icons';

import { AuthContext } from '../../../providers/AuthProvider'; 
import { formatFullName, getParamsFromUrl, objectToQueryString } from '../../../helpers/general';
import useSectionStudent from '../../../hooks/SectionDetailPage/useSectionStudent';
import SectionStudentSearchForm from './components/SectionStudentSearchForm';
import StudentSearchModal from '../../../components/StudentSearchModal';
import StudentConfirmationModal from './components/StudentConfirmationModal';

const { Link } = Typography;
const { confirm } = Modal;

const SectionStudentPage = (props) => {
    const [addStudentsModal, setAddStudentsModal] = useState(false);
    const [confirmation, setConfirmation] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const { activeSemester } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const sectionStudentProps = useSectionStudent();
    const {
        meta,
        getSectionStudents,
        deleteSectionStudentById,
        sectionStudents,
        loadingSectionStudents,
        total,
        page,
        limit,
        loadingSubmit,
        createSectionStudents,
    } = sectionStudentProps;

    const onAddStudent = () => {
        createSectionStudents({
            fields: {
                student_ids: selectedStudents,
                semester_id: activeSemester._id,
            },
        });
    };

    useEffect(() => {
        if (meta?.code === 200) {
            setConfirmation(false);
            setAddStudentsModal(false);
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
                deleteSectionStudentById(id);
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
            title: 'Semester',
            dataIndex: 'semester',
            key: 'semester',
            render: (_, record) => {
                const { sy_end_year, sy_start_year, term }  = record?.semester || {};
                return `S.Y. ${sy_start_year} - ${sy_end_year} | ${term === 1 ? '1st' : '2nd'} Semester`;
            },
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
                            confirmDelete(record._id);
                        }}
                    >
                            Delete
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
                <SectionStudentSearchForm {...sectionStudentProps}/>
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
                loading={loadingSectionStudents}
                scroll={ { x: true } }
                dataSource={sectionStudents.map(sectionStudent => ({ ...sectionStudent, key: sectionStudent._id }))}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getSectionStudents(queryObj);
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
                searchBySection={false}
                exclude={sectionStudents.map(sectionStudent => sectionStudent.student._id)}
                excludeStudentsInSection={true}
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
                subject={props?.section}
                loadingSubmit={loadingSubmit}
                onConfirm={onAddStudent}
            />
        </Flex>
    );
};

export default SectionStudentPage;