import { useEffect, useRef } from 'react';
import { Row, Form, Button, Flex, Typography } from 'antd';

import options from '../../../../constants/options';
import SkeletonInput from '../../../../components/CustomUI/SkeletonInput';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';

const { Item } = Form;
const { Text } = Typography;

const TeacherForm = ({ teacher, loading, loadingSubmit, createOrUpdateTeacher }) => {
    const formRef = useRef(null);

    useEffect(() => {
        formRef.current?.setFieldsValue(teacher);
    }, [teacher]);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateTeacher({
                teacherId: teacher?._id,
                fields: values,
            })}
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
                    {
                        type: 'email',
                        message: 'Email is not valid',
                    },
                ]}
            >
                <SkeletonInput
                    loading={loading}
                    placeholder="Enter Email"
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
                    loading={loading}
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
                    loading={loading}
                    placeholder="Enter First Name"
                />
            </Item>
            <Item
                name="middle_name"
                label="Middle Name:"
            >
                <SkeletonInput
                    loading={loading}
                    placeholder="Enter Middle Name"
                />
            </Item>
            <Item
                name="suffix"
                label="Suffix:"
            >
                <SkeletonInput
                    loading={loading}
                    placeholder="Enter Suffix"
                />
            </Item>
            {
                teacher &&
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
                    <SkeletonSelect
                        loading={loading}
                        placeholder="Enter Status"
                        options={options.status}
                    />
                </Item>
            }
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

export default TeacherForm;