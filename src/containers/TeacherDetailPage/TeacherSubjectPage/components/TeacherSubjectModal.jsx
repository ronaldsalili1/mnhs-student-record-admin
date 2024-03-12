import { Modal, Form, Button, Flex, Select } from 'antd';

const { Item } = Form;

const TeacherSubjectModal = ({ ...rest }) => {
    return (
        <Modal
            { ...rest }
            footer={null}
        >
            <Form
                layout="vertical"
                onFinish={values => console.log(values)}
                style={{
                    width: '100%',
                    marginTop: 20,
                }}
            >
                <Item
                    name="subject"
                    label="Subject:"
                    rules={[
                        {
                            required: true,
                            message: 'Subject is required',
                        },
                    ]}
                >
                    <Select placeholder="Select Subject"/>
                </Item>
                <Item
                    name="semester"
                    label="Semester:"
                    rules={[
                        {
                            required: true,
                            message: 'Semester is required',
                        },
                    ]}
                >
                    <Select placeholder="Select Semester"/>
                </Item>
                <Item style={{ margin: 0 }}>
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
        </Modal>
    );
};

export default TeacherSubjectModal;