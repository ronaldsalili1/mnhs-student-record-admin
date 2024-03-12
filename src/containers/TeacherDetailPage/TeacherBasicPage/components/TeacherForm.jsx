import { Row, Form, Button, Input, Flex, Select, Typography } from 'antd';

import options from '../../../constants/options';

const { Item } = Form;
const { Text } = Typography;

const TeacherForm = () => {
    return (
        <Form
            layout="vertical"
            onFinish={values => console.log(values)}
            style={{
                width: 400,
            }}
        >
            <Row>
                <Text
                    strong
                    style={{ fontSize: 18, margin: '15px 0px' }}
                >
                    Teacher Informations:
                </Text>
            </Row>
            <Item
                name="email"
                label="Email:"
                rules={[
                    {
                        required: true,
                        message: 'Email is required',
                    },
                ]}
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
                name="suffix"
                label="Suffix:"
            >
                <Input placeholder="Enter Suffix"/>
            </Item>
            <Item
                name="status"
                label="Status:"
                rules={[
                    {
                        required: true,
                        message: 'Status is required',
                    },
                ]}
            >
                <Select
                    placeholder="Enter Status"
                    options={options.status}
                />
            </Item>
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

export default TeacherForm;