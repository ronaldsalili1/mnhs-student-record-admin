import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Typography, Flex, Button, Grid, Divider, Modal, Form, Space, Alert, Upload } from 'antd';
import { ExclamationCircleFilled, CloudDownloadOutlined, CloudUploadOutlined } from '@ant-design/icons';

import { formatFullName } from '../../helpers/general';
import useGradeSubmissionDetail from '../../hooks/GradeSubmissionDetailPage/useGradeSubmissionDetail';
import { formatSemester } from '../../helpers/semester';

const GradeSubmissionDetailPage = () => {
    const gradeSubmissionDetailProps = useGradeSubmissionDetail();
    const {
        getReviewerOptions,
        createOrUpdateGradeSubmission,
        meta,
        studentGradeData,
        setStudentGradeData,
        semester,
        quarter,
        setQuarter,
        setSemester,
        subject,
        setSubject,
        loadingGrades,
        gradeSubmission,
        setLoadingGrades,
    } = gradeSubmissionDetailProps;

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
                        { formatSemester(semester)}
                    </span>
                </Flex>
                <Flex gap={18}>
                    <span>
                        <strong>Quarter:</strong>
                    </span>
                    <span>
                        { quarter === 1 ? '1st' : '2nd' }
                    </span>
                </Flex>
                <Flex gap={21}>
                    <span>
                        <strong>Subject:</strong>
                    </span>
                    <span>
                        {subject.name}
                    </span>
                </Flex>
                <Flex gap={17}>
                    <span>
                        <strong>Teacher:</strong>
                    </span>
                    <span>
                        {formatFullName(gradeSubmission.teacher)}
                    </span>
                </Flex>
                <Flex gap={19}>
                    <span>
                        <strong>Remarks:</strong>
                    </span>
                    <span>
                        {gradeSubmission?.remark}
                    </span>
                </Flex>
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