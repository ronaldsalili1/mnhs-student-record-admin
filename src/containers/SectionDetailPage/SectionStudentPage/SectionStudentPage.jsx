import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Divider, Modal } from 'antd';
import { PlusSquareFilled, ExclamationCircleFilled } from '@ant-design/icons';
import dayjs from 'dayjs';

import { formatFullName, getParamsFromUrl, objectToQueryString } from '../../../helpers/general';
import SectionStudentModal from './components/SectionStudentModal';
import useSectionStudent from '../../../hooks/SectionDetailPage/useSectionStudent';
import SectionStudentSearchForm from './components/SectionStudentSearchForm';

const { Link } = Typography;
const { confirm } = Modal;

const SectionStudentPage = () => {
    const [modal, setModal] = useState(false);
    const [disabledStudents, setDisabledStudents] = useState(true);
    const [selectedSemester, setSelectedSemester] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const sectionStudentProps = useSectionStudent();
    const {
        meta,
        getStudentOptions,
        deleteSectionStudentById,
        // setSectionAdviser,
        sectionStudents,
        // getSectionAdviserById,
        loadingSectionStudents,
        // sectionAdvisers,
        // sectionAdviser,
        // total,
        // page,
        // limit,
    } = sectionStudentProps;

    useEffect(() => {
        if (meta?.code === 200) {
            setModal(false);
            setDisabledStudents(true);
            setSelectedSemester(null);
        }
    }, [meta]);

    useEffect(() => {
        if (selectedSemester) {
            setDisabledStudents(false);
            getStudentOptions(selectedSemester);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSemester]);

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

    // const dataSource = useMemo(() => {
    //     let finalData = [];

    //     const activeAdvisers = sectionAdvisers
    //         .filter(adviser => {
    //             const { start_at, end_at } = adviser || {};
    //             const now = dayjs();
            
    //             return now.isSameOrAfter(dayjs(start_at)) && (!end_at || now.isBefore(dayjs(end_at)));
    //         })
    //         .map(activeAdviser => ({ ...activeAdviser, status: 'active' }));
        
    //     if (activeAdvisers.length > 0) {
    //         const inactiveAdvisers = sectionAdvisers.filter(adviser => !activeAdvisers.map(activeAdviser => activeAdviser._id).includes(adviser._id));
    //         finalData = [...activeAdvisers, ...inactiveAdvisers];
    //     } else {
    //         finalData = sectionAdvisers;
    //     }

    //     return finalData.map(data => ({ ...data, key: data._id }));
    // }, [sectionAdvisers]);

    

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
                    onClick={() => setModal(true)}
                >
                    Add Student
                </Button>
            </Flex>
            <Table
                loading={loadingSectionStudents}
                scroll={ { x: true } }
                dataSource={sectionStudents.map(sectionStudent => ({ ...sectionStudent, key: sectionStudent._id }))}
                columns={columns}
                // pagination={{
                //     current: page,
                //     showSizeChanger: true,
                //     onChange: (current, pageSize) => {
                //         const queryObj = { ...query, page: current, limit: pageSize };
                //         getSectionAdvisers(queryObj);
                //         const queryString = objectToQueryString(queryObj);
                //         navigate(`${location.pathname}${queryString}`);
                //     },
                //     position: ['bottomRight'],
                //     total,
                //     pageSize: limit,
                // }}
            />
            <SectionStudentModal
                // title={sectionAdviser ? formatFullName(sectionAdviser?.teacher) : 'Add Adviser'}
                destroyOnClose={true}
                width={450}
                open={modal}
                onCancel={() => {
                    setModal(false);
                    setDisabledStudents(true);
                    setSelectedSemester(null);
                }}
                sectionStudentProps={sectionStudentProps}
                disabledStudents={disabledStudents}
                setDisabledStudents={setDisabledStudents}
                selectedSemester={selectedSemester}
                setSelectedSemester={setSelectedSemester}
            />
        </Flex>
    );
};

export default SectionStudentPage;