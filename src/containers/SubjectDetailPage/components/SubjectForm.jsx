import { Row, Form, Button, Input, Flex, Select, Typography, theme } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import options from '../../../constants/options';

const { Item } = Form;
const { Text } = Typography;
const { List } = Form;

const SubjectForm = () => {
    const { token } = theme.useToken();

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
                    Subject Informations:
                </Text>
            </Row>
            <Item
                name="name"
                label="Name:"
                rules={[
                    {
                        required: true,
                        message: 'Name is required',
                    },
                ]}
            >
                <Input placeholder="Enter Name"/>
            </Item>
            <Item
                name="type"
                label="Type:"
                rules={[
                    {
                        required: true,
                        message: 'Type is required',
                    },
                ]}
            >
                <Select
                    placeholder="Enter Type"
                    options={options.subjectType}
                />
            </Item>
            {/* <List name="teachers">
                {(fields, { add, remove }) => (
                    <>
                        <div style={{ marginBottom: 8 }}>
                            <Text>Teachers:</Text>
                        </div>
                        {fields.map(({ key, name, ...restField }) => (
                            <Flex
                                key={key}
                                align="center"
                                gap={10}
                                style={{ marginBottom: 5 }}
                            >
                                <Item
                                    {...restField}
                                    name={[name]}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Teacher is required',
                                        },
                                    ]}
                                    style={{ margin: 0, width: '100%' }}
                                >
                                    <Select
                                        options={[
                                            {
                                                label: 'Teacher A',
                                                value: 'teacher_a',
                                            },
                                            {
                                                label: 'Teacher B',
                                                value: 'teacher_b',
                                            },
                                            {
                                                label: 'Teacher C',
                                                value: 'teacher_c',
                                            },
                                            {
                                                label: 'Teacher D',
                                                value: 'teacher_d',
                                            },
                                        ]}
                                    />
                                </Item>
                                <MinusCircleOutlined
                                    onClick={() => remove(name)}
                                    style={{ color: token.colorError }}
                                />
                            </Flex>
                        ))}
                        <Item>
                            <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add Teacher
                            </Button>
                        </Item>
                    </>
                )}
            </List> */}
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

export default SubjectForm;