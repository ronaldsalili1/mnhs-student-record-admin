import { useEffect, useMemo, useRef } from 'react';
import { Modal, Form, Button, Flex } from 'antd';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import { filterOption } from '../../../../helpers/general';

dayjs.extend(isSameOrBefore);

const { Item } = Form;

const SubjectStudentModal = ({ subjectStudentProps, ...rest }) => {
    const formRef = useRef(null);

    const {
        loadingSemesters,
        loadingStudents,
        loadingSubmit,
        loadingSubjectStudent,
        students,
        semesters,
        subjectStudent,
        createOrUpdateSubjectStudent,
    } = subjectStudentProps;

    useEffect(() => {
        if (subjectStudent) {
            formRef.current?.setFieldsValue({
                ...subjectStudent,
                student_id: subjectStudent.student._id,
            });
        }
    }, [subjectStudent]);

    const activeSemester = useMemo(() => {
        return semesters.find(semester => semester.status === 'active') ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesters]);

    return (
        <Modal
            { ...rest }
            footer={null}
        >
            <Form
                ref={formRef}
                layout="vertical"
                initialValues={activeSemester ? {
                    semester_id: activeSemester._id,
                } : {}}
                onFinish={values => {
                    createOrUpdateSubjectStudent({ fields: values });
                }}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Item
                    name="semester_id"
                    label="Semester:"
                    rules={[
                        {
                            required: true,
                            message: 'Semester is required',
                        },
                    ]}
                >
                    <SkeletonSelect
                        loading={loadingSemesters || loadingSubjectStudent}
                        placeholder="Select Semester"
                        showSearch
                        filterOption={filterOption}
                        options={semesters.map(semester => {
                            const { sy_start_year, sy_end_year, term } = semester;
                            return {
                                label: `S.Y. ${sy_start_year} - ${sy_end_year} | ${term === 1 ? '1st' : '2nd'} Semester`,
                                value: semester._id,
                            };
                        })}
                    />
                </Item>
                <Item
                    name="student_id"
                    label="Student:"
                    rules={[
                        {
                            required: true,
                            message: 'Student is required',
                        },
                    ]}
                >
                    <SkeletonSelect
                        loading={loadingStudents || loadingSubjectStudent}
                        placeholder="Select Student"
                        showSearch
                        filterOption={filterOption}
                        options={students.map(student => {
                            const { last_name, first_name, suffix, middle_name } = student;
                            return {
                                label: `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`,
                                value: student._id,
                            };
                        })}
                    />
                </Item>
                
                <Item style={{ margin: 0 }}>
                    <Flex justify="end">
                        <Button
                            loading={loadingSubmit}
                            type="primary"
                            htmlType="submit"
                            style={{ minWidth: 80 }}
                        >
                            Save
                        </Button>
                    </Flex>
                </Item>
            </Form>
        </Modal>
    );
};

export default SubjectStudentModal;