import { Row, Col, Form, Button, Input, Flex, DatePicker, Select, InputNumber, Typography } from 'antd';

import options from '../../../constants/options';

const { Item } = Form;
const { Text } = Typography;

const StudentForm = () => {
    return (
        <Form
            layout="vertical"
            onFinish={values => console.log(values)}
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
                    >
                        <Input placeholder="Enter Email"/>
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
                        <Input placeholder="Enter Last Name"/>
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
                        <Input placeholder="Enter First Name"/>
                    </Item>
                    <Item
                        name="middle_name"
                        label="Middle Name:"
                    >
                        <Input placeholder="Enter Middle Name"/>
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
                        <Input placeholder="Enter Learner Reference Number (LRN)"/>
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
                        <DatePicker
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
                        <Select
                            placeholder="Select Sex"
                            options={options.sex}
                        />
                    </Item>
                    <Item
                        name="shs_admission_date"
                        label="Date of SHS Admission:"
                        rules={[
                            {
                                required: true,
                                message: 'Date of SHS Admission is required',
                            },
                        ]}
                    >
                        <DatePicker
                            placeholder="Select Date"
                            style={{ width: '100%' }}
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
                        <Select
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
                        <Select
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
                    <Item label="High School Completer:">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Item
                                    name="hs_completer"
                                    style={{ margin: 0 }}
                                >
                                    <Select
                                        placeholder="Yes/No"
                                        options={options.yN}
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="hs_gen_avg"
                                    style={{ margin: 0 }}
                                >
                                    <InputNumber
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
                                    <Select
                                        placeholder="Yes/No"
                                        options={options.yN}
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="jhs_gen_avg"
                                    style={{ margin: 0 }}
                                >
                                    <InputNumber
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
                        <DatePicker
                            placeholder="Select Date"
                            style={{ width: '100%' }}
                        />
                    </Item>
                    <Item
                        name="school_name"
                        label="Name of School:"
                    >
                        <Input placeholder="Enter Name of School"/>
                    </Item>
                    <Item
                        name="school_address"
                        label="School Address:"
                    >
                        <Input placeholder="Enter School Address"/>
                    </Item>
                    <Item label="PEPT Passer:">
                        <Row gutter={12}>
                            <Col span={12}>
                                <Item
                                    name="pept_passer"
                                    style={{ margin: 0 }}
                                >
                                    <Select
                                        placeholder="Yes/No"
                                        options={options.yN}
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="pept_rating"
                                    style={{ margin: 0 }}
                                >
                                    <Input
                                        placeholder="Enter Rating"
                                        style={{ width: '100%' }}
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
                                    <Select
                                        placeholder="Yes/No"
                                        options={options.yN}
                                    />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item
                                    name="als_ae_rating"
                                    style={{ margin: 0 }}
                                >
                                    <Input
                                        placeholder="Enter Rating"
                                        style={{ width: '100%' }}
                                    />
                                </Item>
                            </Col>
                        </Row>
                    </Item>
                    <Item
                        name="others"
                        label="Others (Please Specify):"
                    >
                        <Input placeholder="Enter Here"/>
                    </Item>
                    <Item
                        name="assesment_date"
                        label="Date of Examination/Assessment:"
                    >
                        <DatePicker
                            placeholder="Select Date"
                            style={{ width: '100%' }}
                        />
                    </Item>
                    <Item
                        name="clc_name_address"
                        label="Name and Address of Community Learning Center:"
                    >
                        <Input placeholder="Enter Name and Address of Community Learning Center"/>
                    </Item>
                </Col>
            </Row>
            <Item>
                <Flex justify="end">
                    <Button
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