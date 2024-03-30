import { useEffect, useRef } from 'react';
import { Row, Col, Form, Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import options from '../../../../constants/options';
import SkeletonInput from '../../../../components/CustomUI/SkeletonInput';
import SkeletonDatePicker from '../../../../components/CustomUI/SkeletonDatePicker';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import SkeletonInputNumber from '../../../../components/CustomUI/SkeletonInputNumber';
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
                width: 800,
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
            <Row
                justify="space-between"
                gutter={30}
            >
                <Col
                    xs={24}
                    md={12}
                    lg={24}
                    xl={12}
                >
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
                </Col>
                <Col
                    xs={24}
                    md={12}
                    lg={24}
                    xl={12}
                >
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
                    <Item label="High School Completer:">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Item
                                    name="hs_completer"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonSelect
                                        loading={loadingStudent}
                                        placeholder="Yes/No"
                                        options={options.yN}
                                        allowClear
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="hs_gen_avg"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonInputNumber
                                        loading={loadingStudent}
                                        placeholder="Enter General Average"
                                        style={{ width: '100%' }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                    </Item>
                    <Item label="Junior High School Completer:">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Item
                                    name="jhs_completer"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonSelect
                                        loading={loadingStudent}
                                        placeholder="Yes/No"
                                        options={options.yN}
                                        allowClear
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="jhs_gen_avg"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonInputNumber
                                        loading={loadingStudent}
                                        placeholder="Enter General Average"
                                        style={{ width: '100%' }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                    </Item>
                    <Item
                        name="completion_date"
                        label="Date of Graduation/Completion:"
                    >
                        <SkeletonDatePicker
                            loading={loadingStudent}
                            placeholder="Select Date"
                            style={{ width: '100%' }}
                            allowClear
                        />
                    </Item>
                    <Item
                        name="school_name"
                        label="Name of School:"
                    >
                        <SkeletonInput
                            loading={loadingStudent}
                            placeholder="Enter Name of School"
                            allowClear
                        />
                    </Item>
                    <Item
                        name="school_address"
                        label="School Address:"
                    >
                        <SkeletonInput
                            loading={loadingStudent}
                            placeholder="Enter School Address"
                            allowClear
                        />
                    </Item>
                    <Item label="PEPT Passer:">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Item
                                    name="pept_passer"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonSelect
                                        loading={loadingStudent}
                                        placeholder="Yes/No"
                                        options={options.yN}
                                        allowClear
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="pept_rating"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonInput
                                        loading={loadingStudent}
                                        placeholder="Enter Rating"
                                        style={{ width: '100%' }}
                                        allowClear
                                    />
                                </Item>
                            </Col>
                        </Row>
                    </Item>
                    <Item label="ALS A&E Passer:">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Item
                                    name="als_ae_passer"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonSelect
                                        loading={loadingStudent}
                                        placeholder="Yes/No"
                                        options={options.yN}
                                        allowClear
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="als_ae_rating"
                                    style={{ margin: 0 }}
                                >
                                    <SkeletonInput
                                        loading={loadingStudent}
                                        placeholder="Enter Rating"
                                        style={{ width: '100%' }}
                                        allowClear
                                    />
                                </Item>
                            </Col>
                        </Row>
                    </Item>
                    <Item
                        name="others"
                        label="Others (Please Specify):"
                    >
                        <SkeletonInput
                            loading={loadingStudent}
                            placeholder="Enter Here"
                            allowClear
                        />
                    </Item>
                    <Item
                        name="assesment_date"
                        label="Date of Examination/Assessment:"
                    >
                        <SkeletonDatePicker
                            loading={loadingStudent}
                            placeholder="Select Date"
                            style={{ width: '100%' }}
                            allowClear
                        />
                    </Item>
                    <Item
                        name="clc_name_address"
                        label="Name and Address of Community Learning Center:"
                    >
                        <SkeletonInput
                            loading={loadingStudent}
                            placeholder="Enter Name and Address of Community Learning Center"
                            allowClear
                        />
                    </Item>
                </Col>
            </Row>
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