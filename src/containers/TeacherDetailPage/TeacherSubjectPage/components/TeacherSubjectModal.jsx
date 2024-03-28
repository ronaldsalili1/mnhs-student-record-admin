import { useEffect, useRef, useState } from 'react';
import { Modal, Form, Button, Flex } from 'antd';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import SkeletonDatePicker from '../../../../components/CustomUI/SkeletonDatePicker';
import { filterOption } from '../../../../helpers/general';

dayjs.extend(isSameOrBefore);

const { Item } = Form;

const TeacherSubjectModal = ({ teacherSubjectProps, ...rest }) => {
    const formRef = useRef(null);
    const [startAt, setStartAt] = useState(null);

    const {
        loadingSubjects,
        subjects,
        createOrUpdateSubjectTeacher,
        subjectTeacher,
        loadingSubjectTeacher,
        loadingSubmit,
    } = teacherSubjectProps;

    const disabledDate = (current) => {
        if (current && startAt) {
            return current && (current.isSameOrBefore(startAt));
        }

        return false;
    };

    useEffect(() => {
        const { subject, start_at, end_at } = subjectTeacher || {};
        formRef.current?.setFieldsValue({
            subject_id: subject?._id,
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
                    const { subject_id, start_at, end_at } = values || {};
                    const fields = {
                        subject_id,
                        start_at: start_at.toISOString(),
                        ...(end_at && { end_at: end_at.toISOString() }),
                    };
                    
                    createOrUpdateSubjectTeacher({ fields });
                }}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Item
                    name="subject_id"
                    label="Subject:"
                    rules={[
                        {
                            required: true,
                            message: 'Subject is required',
                        },
                    ]}
                >
                    <SkeletonSelect
                        loading={loadingSubjects || loadingSubjectTeacher}
                        placeholder="Select Subject"
                        showSearch
                        filterOption={filterOption}
                        options={subjects.map(subject => ({
                            label: subject.name,
                            value: subject._id,
                        }))}
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

export default TeacherSubjectModal;