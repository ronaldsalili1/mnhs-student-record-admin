import { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Form, Button, Flex } from 'antd';
import dayjs from 'dayjs';

import { filterOption, formatFullName } from '../../../../helpers/general';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import SkeletonDatePicker from '../../../../components/CustomUI/SkeletonDatePicker';


const { Item } = Form;

const SectionStudentModal = ({ sectionStudentProps, setSelectedSemester, disabledStudents, ...rest }) => {
    const formRef = useRef(null);

    const {
        students,
        loadingStudents,
        loadingSemesters,
        loadingSubmit,
        semesters,
        createSectionStudents,
    } = sectionStudentProps;


    const activeSemester = useMemo(() => {
        return semesters.find(semester => semester.status === 'active') ;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesters]);
    // useEffect(() => {
    //     const { start_at, end_at, teacher } = sectionAdviser || {};
    //     formRef.current?.setFieldsValue({
    //         teacher_id: teacher?._id,
    //         start_at: start_at ? dayjs(start_at) : null,
    //         end_at: end_at ? dayjs(end_at) : null,
    //     });

    //     start_at && setStartAt(dayjs(start_at));
    // }, [sectionAdviser]);

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
                onFinish={values => createSectionStudents({ fields: values })}
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
                        loading={loadingSemesters}
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
                        onChange={value => setSelectedSemester(value)}
                    />
                </Item>
                <Item
                    name="student_ids"
                    label="Students:"
                    rules={[
                        {
                            required: true,
                            message: 'Students are required',
                        },
                    ]}
                >
                    <SkeletonSelect
                        loading={loadingStudents}
                        disabled={disabledStudents}
                        placeholder="Select Students"
                        mode="multiple"
                        showSearch
                        filterOption={filterOption}
                        options={students.map(student => ({
                            label: formatFullName(student),
                            value: student._id,
                        }))}
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

export default SectionStudentModal;