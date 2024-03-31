import { useEffect, useRef } from 'react';
import { Row, Col, Form, Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import SkeletonDatePicker from '../../../../components/CustomUI/SkeletonDatePicker';
import SkeletonInput from '../../../../components/CustomUI/SkeletonInput';
import SkeletonInputNumber from '../../../../components/CustomUI/SkeletonInputNumber';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import options from '../../../../constants/options';
import { removeObjNilValues } from '../../../../helpers/general';

const { Item } = Form;
const { Text } = Typography;

const StudentShsEligibilityForm = (props) => {
    const formRef = useRef(null);
    const { loadingStudentShsEligibility, loadingSubmit, studentShsEligibility, createOrUpdateStudentShsEligibility } = props;

    useEffect(() => {
        const {
            completion_date,
            assesment_date,
            als_ae_passer,
            hs_completer,
            jhs_completer,
            pept_passer,
        } = studentShsEligibility || {};
        
        formRef.current?.setFieldsValue({
            ...studentShsEligibility,
            completion_date: completion_date ? dayjs(completion_date) : null,
            assesment_date: assesment_date ? dayjs(assesment_date) : null,
            als_ae_passer: als_ae_passer ? 'yes' : 'no',
            hs_completer: hs_completer ? 'yes' : 'no',
            jhs_completer: jhs_completer ? 'yes' : 'no',
            pept_passer: pept_passer ? 'yes' : 'no',
        });
    }, [studentShsEligibility]);
    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateStudentShsEligibility({ studentShsEligibilityId: createOrUpdateStudentShsEligibility?._id, fields: removeObjNilValues(values) })}
            style={{
                width: 400,
            }}
        >
            <Row>
                <Text
                    strong
                    style={{ fontSize: 18, margin: '15px 0px' }}
                >
                    Senior High School Eligibility:
                </Text>
            </Row>
            <Item label="High School Completer:">
                <Row gutter={12}>
                    <Col span={12}>
                        <Item
                            name="hs_completer"
                            style={{ margin: 0 }}
                        >
                            <SkeletonSelect
                                loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                    loading={loadingStudentShsEligibility}
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
                    loading={loadingStudentShsEligibility}
                    placeholder="Enter Name of School"
                    allowClear
                />
            </Item>
            <Item
                name="school_address"
                label="School Address:"
            >
                <SkeletonInput
                    loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                                loading={loadingStudentShsEligibility}
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
                    loading={loadingStudentShsEligibility}
                    placeholder="Enter Here"
                    allowClear
                />
            </Item>
            <Item
                name="assesment_date"
                label="Date of Examination/Assessment:"
            >
                <SkeletonDatePicker
                    loading={loadingStudentShsEligibility}
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
                    loading={loadingStudentShsEligibility}
                    placeholder="Enter Name and Address of Community Learning Center"
                    allowClear
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

export default StudentShsEligibilityForm;