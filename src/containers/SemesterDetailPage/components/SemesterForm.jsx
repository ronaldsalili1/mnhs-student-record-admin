import { Row, Form, Button, Flex, DatePicker, Select, Typography } from 'antd';

import options from '../../../constants/options';

const { Item } = Form;
const { Text } = Typography;

const SemesterForm = () => {
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
                    Semester Informations:
                </Text>
            </Row>
            <Item
                name="sy_start_year"
                label="Start Year:"
                rules={[
                    {
                        required: true,
                        message: 'Start Year is required',
                    },
                ]}
            >
                <DatePicker
                    // onChange={onChange}
                    placeholder="Select Start Year"
                    picker="year"
                    style={{ width: '100%' }}
                />
            </Item>
            <Item
                name="sy_end_year"
                label="End Year:"
                rules={[
                    {
                        required: true,
                        message: 'End Year is required',
                    },
                ]}
            >
                <DatePicker
                    // onChange={onChange}
                    placeholder="Select End Year"
                    picker="year"
                    style={{ width: '100%' }}
                />
            </Item>
            <Item
                name="sy_end_year"
                label="End Year:"
                rules={[
                    {
                        required: true,
                        message: 'End Year is required',
                    },
                ]}
            >
                <DatePicker
                    // onChange={onChange}
                    placeholder="Select End Year"
                    picker="year"
                    style={{ width: '100%' }}
                />
            </Item>
            <Item
                name="number"
                label="Semester:"
                rules={[
                    {
                        required: true,
                        message: 'Semester is required',
                    },
                ]}
            >
                <Select
                    // onChange={onChange}
                    placeholder="Select Semester"
                    options={options.semester}
                />
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
                    // onChange={onChange}
                    placeholder="Select Status"
                    options={options.semesterStatus}
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

export default SemesterForm;