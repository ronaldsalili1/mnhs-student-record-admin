import { useEffect, useRef, useState } from 'react';
import { Modal, Form, Button, Flex } from 'antd';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import SkeletonDatePicker from '../../../../components/CustomUI/SkeletonDatePicker';
import { filterOption } from '../../../../helpers/general';

dayjs.extend(isSameOrBefore);

const { Item } = Form;

const SubjectTeacherModal = ({ subjectTeacherProps, ...rest }) => {
    const formRef = useRef(null);
    const [startAt, setStartAt] = useState(null);

    const {
        loadingTeachers,
        teachers,
        createOrUpdateSubjectTeacher,
        subjectTeacher,
        loadingSubjectTeacher,
        loadingSubmit,
    } = subjectTeacherProps;

    const disabledDate = (current) => {
        if (current && startAt) {
            return current && (current.isSameOrBefore(startAt));
        }

        return false;
    };

    useEffect(() => {
        const { teacher, start_at, end_at } = subjectTeacher || {};
        formRef.current?.setFieldsValue({
            teacher_id: teacher?._id,
            start_at: start_at ? dayjs(start_at) : null,
            end_at: end_at ? dayjs(end_at) : null,
        });

        start_at && setStartAt(dayjs(start_at));
    }, [subjectTeacher]);

    return (
        <Modal
            { ...rest }
            footer={null}
        >
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={values => {
                    const { teacher_id, start_at, end_at } = values || {};
                    const fields = {
                        teacher_id,
                        start_at: start_at.startOf('day').toISOString(),
                        ...(end_at && { end_at: end_at.endOf('day').toISOString() }),
                    };
                    
                    createOrUpdateSubjectTeacher({ fields });
                }}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Item
                    name="teacher_id"
                    label="Teacher:"
                    rules={[
                        {
                            required: true,
                            message: 'Teacher is required',
                        },
                    ]}
                >
                    <SkeletonSelect
                        loading={loadingTeachers || loadingSubjectTeacher}
                        placeholder="Select Teacher"
                        showSearch
                        filterOption={filterOption}
                        options={teachers.map(teacher => {
                            const { last_name, first_name, suffix, middle_name } = teacher;
                            return {
                                label: `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`,
                                value: teacher._id,
                            };
                        })}
                    />
                </Item>
                <Item
                    name="start_at"
                    label="Start At (YYYY-MM-DD):"
                    rules={[
                        {
                            required: true,
                            message: 'Start At is required',
                        },
                    ]}
                >
                    <SkeletonDatePicker
                        loading={loadingSubjectTeacher}
                        placeholder="Select Start At"
                        style={{ width: '100%' }}
                        onChange={value => {
                            setStartAt(value);
                            formRef.current?.setFieldValue('end_at', null);
                        }}
                    />
                </Item>
                <Item
                    name="end_at"
                    label="End At (YYYY-MM-DD):"
                >
                    <SkeletonDatePicker
                        loading={loadingSubjectTeacher}
                        placeholder="Select Start At"
                        style={{ width: '100%' }}
                        disabledDate={disabledDate}
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

export default SubjectTeacherModal;