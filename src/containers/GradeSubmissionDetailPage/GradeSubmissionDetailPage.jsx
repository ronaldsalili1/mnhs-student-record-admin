import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Flex, Button, Grid, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { formatFullName } from '../../helpers/general';
import useGradeSubmissionDetail from '../../hooks/GradeSubmissionDetailPage/useGradeSubmissionDetail';
import { formatSemester } from '../../helpers/semester';
import { NavigationContext } from '../../providers/NavigationProvider';

const GradeSubmissionDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle, setBreadcrumbItems } = layoutState;
    const gradeSubmissionDetailProps = useGradeSubmissionDetail();
    const {
        studentGradeData,
        semester,
        quarter,
        subject,
        loadingGrades,
        gradeSubmission,
        updateGradeSubmissionStatus,
        loadingSubmit,
    } = gradeSubmissionDetailProps;

    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

    const columns = [
        {
            title: 'Name (Last, First, Middle, Suffix)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => formatFullName(record.student),
        },
        {
            title: 'LRN',
            dataIndex: 'lrn',
            key: 'lrn',
            render: (_, record) => record.student.lrn,
        },
        {
            title: 'Grade',
            dataIndex: 'grade',
            key: 'grade',
            width: 100,
            render: data => data || '-',
        },
    ];

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Grade Submissions',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/grade-submissions');
                },
            },
            {
                title: 'Details',
            },
        ]);

        setTitle('Grade Submission Details');

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Flex
                vertical
                gap={10}
                style={{ margin: '30px 0px 15px' }}
            >
                <Flex gap={10}>
                    <span>
                        <strong>Semester:</strong>
                    </span>
                    <span>
                        {semester ? formatSemester(semester) : '-'}
                    </span>
                </Flex>
                <Flex gap={18}>
                    <span>
                        <strong>Quarter:</strong>
                    </span>
                    <span>
                        {quarter ? quarter === 1 ? '1st' : '2nd' : '-' }
                    </span>
                </Flex>
                <Flex gap={21}>
                    <span>
                        <strong>Subject:</strong>
                    </span>
                    <span>
                        {subject ? subject.name : '-'}
                    </span>
                </Flex>
                <Flex gap={17}>
                    <span>
                        <strong>Teacher:</strong>
                    </span>
                    <span>
                        {gradeSubmission ? formatFullName(gradeSubmission?.teacher) : '-'}
                    </span>
                </Flex>
                <Flex gap={18}>
                    <span>
                        <strong>Remarks:</strong>
                    </span>
                    <span>
                        {gradeSubmission?.remark || '-'}
                    </span>
                </Flex>
            </Flex>
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                {
                    gradeSubmission && (gradeSubmission.status === 'pending' || gradeSubmission.status === 'under_review') &&
                    <Button
                        danger
                        type="primary"
                        style={{ ...(xs && { width: '100%' }) }}
                        loading={loadingSubmit}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Are you sure you want to mark this grade submission as "Rejected"?',
                                icon: <ExclamationCircleFilled />,
                                okButtonProps: {
                                    danger: true,
                                },
                                okText: 'Confirm',
                                onOk: () => {
                                    updateGradeSubmissionStatus({ fields: { status: 'rejected' } });
                                },
                            });
                        }}
                    >
                        Mark As Rejected
                    </Button>
                }
                {
                    gradeSubmission && (gradeSubmission.status === 'pending') &&
                    <Button
                        type="dashed"
                        style={{ ...(xs && { width: '100%' }) }}
                        loading={loadingSubmit}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Are you sure you want to mark this grade submission as "Under Review"?',
                                icon: <ExclamationCircleFilled />,
                                okText: 'Confirm',
                                onOk: () => {
                                    updateGradeSubmissionStatus({ fields: { status: 'under_review' } });
                                },
                            });
                        }}
                    >
                        Mark As Under Review
                    </Button>
                }
                {
                    gradeSubmission && (gradeSubmission.status === 'pending' || gradeSubmission.status === 'under_review') &&
                    <Button
                        type="primary"
                        style={{ ...(xs && { width: '100%' }) }}
                        loading={loadingSubmit}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Are you sure you want to mark this grade submission as "Approved"?',
                                icon: <ExclamationCircleFilled />,
                                okText: 'Confirm',
                                onOk: () => {
                                    updateGradeSubmissionStatus({ fields: { status: 'approved' } });
                                },
                            });
                        }}
                    >
                        Mark As Approved
                    </Button>
                }
            </Flex>
            <Table
                loading={loadingGrades}
                scroll={ { x: true } }
                dataSource={studentGradeData.map(data => {
                    return { ...data, key: data._id };
                })}
                bordered
                columns={columns}
                pagination={{
                    showSizeChanger: true,
                    total: studentGradeData.length,
                }}
            />
        </>
    );
};

export default GradeSubmissionDetailPage;