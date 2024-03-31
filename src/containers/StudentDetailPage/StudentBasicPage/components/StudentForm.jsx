import { useEffect, useRef } from 'react';
import { Row, Form, Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import options from '../../../../constants/options';
import SkeletonInput from '../../../../components/CustomUI/SkeletonInput';
import SkeletonDatePicker from '../../../../components/CustomUI/SkeletonDatePicker';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import { removeObjNilValues } from '../../../../helpers/general';

const { Item } = Form;
const { Text } = Typography;

const StudentForm = (props) => {
    const formRef = useRef(null);
    const { loadingStudent, createOrUpdateStudent, student, loadingSubmit } = props;

    useEffect(() => {
        const { birthdate, shs_admission_date, student_shs_eligibility } = student || {};
        const {
            completion_date,
            assesment_date,
            als_ae_passer,
            hs_completer,
            jhs_completer,
            pept_passer,
        } = student_shs_eligibility || {};
        
        formRef.current?.setFieldsValue({
            ...student,
            ...student_shs_eligibility,
            birthdate: birthdate ? dayjs(birthdate) : null,
            shs_admission_date: shs_admission_date ? dayjs(shs_admission_date) : null,
            completion_date: completion_date ? dayjs(completion_date) : null,
            assesment_date: assesment_date ? dayjs(assesment_date) : null,
            als_ae_passer: als_ae_passer ? 'yes' : 'no',
            hs_completer: hs_completer ? 'yes' : 'no',
            jhs_completer: jhs_completer ? 'yes' : 'no',
            pept_passer: pept_passer ? 'yes' : 'no',
        });
    }, [student]);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateStudent({ studentId: student?._id, fields: removeObjNilValues(values) })}
            style={{
                width: 400,
            }}
        >
            <Row>
                <Text
                    strong
                    style={{ fontSize: 18, margin: '15px 0px' }}
                >
                    Student Informations:
                </Text>
            </Row>
            <Item
                name="email"
                label="Email:"
                rules={[
                    {
                        type: 'email',
                        message: 'Email is not valid',
                    },
                ]}
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter Email"
                    allowClear
                />
            </Item>
            <Item
                name="guardian_email"
                label="Guardian Email:"
                rules={[
                    {
                        type: 'email',
                        message: 'Email is not valid',
                    },
                ]}
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter Guardian Email"
                    allowClear
                />
            </Item>
            <Item
                name="last_name"
                label="Last Name:"
                rules={[
                    {
                        required: true,
                        message: 'Last Name is required',
                    },
                ]}
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter Last Name"
                />
            </Item>
            <Item
                name="first_name"
                label="First Name:"
                rules={[
                    {
                        required: true,
                        message: 'First Name is required',
                    },
                ]}
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter First Name"
                />
            </Item>
            <Item
                name="middle_name"
                label="Middle Name:"
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter Middle Name"
                    allowClear
                />
            </Item>
            <Item
                name="suffix"
                label="Suffix:"
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter Suffix"
                    allowClear
                />
            </Item>
            <Item
                name="lrn"
                label="Learner Reference Number (LRN):"
                rules={[
                    {
                        required: true,
                        message: 'Learner Reference Number (LRN) is required',
                    },
                ]}
            >
                <SkeletonInput
                    loading={loadingStudent}
                    placeholder="Enter Learner Reference Number (LRN)"
                />
            </Item>
            <Item
                name="birthdate"
                label="Birthdate:"
                rules={[
                    {
                        required: true,
                        message: 'Birthdate is required',
                    },
                ]}
            >
                <SkeletonDatePicker
                    loading={loadingStudent}
                    placeholder="Select Date"
                    style={{ width: '100%' }}
                />
            </Item>
            <Item
                name="sex"
                label="Sex:"
                rules={[
                    {
                        required: true,
                        message: 'Sex is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingStudent}
                    placeholder="Select Sex"
                    options={options.sex}
                />
            </Item>
            <Item
                name="shs_admission_date"
                label="Date of SHS Admission:"
            >
                <SkeletonDatePicker
                    loading={loadingStudent}
                    placeholder="Select Date"
                    style={{ width: '100%' }}
                    allowClear
                />
            </Item>
            <Item
                name="track"
                label="Track:"
                rules={[
                    {
                        required: true,
                        message: 'Track is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingStudent}
                    placeholder="Select Track"
                    options={options.track}
                />
            </Item>
            <Item
                name="strand"
                label="Strand:"
                rules={[
                    {
                        required: true,
                        message: 'Strand is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingStudent}
                    placeholder="Select Strand"
                    options={options.strand}
                />
            </Item>
            <Item>
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
    );
};

export default StudentForm;