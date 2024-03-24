import { useEffect, useRef } from 'react';
import { Row, Form, Button, Flex, Typography } from 'antd';

import options from '../../../../constants/options';
import SkeletonInput from '../../../../components/CustomUI/SkeletonInput';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';

const { Item } = Form;
const { Text } = Typography;

const SubjectForm = (props) => {
    const formRef = useRef(null);
    const { loadingSubject, loadingSubmit, subject, createOrUpdateSubject } = props;

    useEffect(() => {
        formRef.current?.setFieldsValue(subject);
    }, [subject]);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateSubject({ subjectId: subject?._id, fields: values })}
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
                <SkeletonInput
                    loading={loadingSubject}
                    placeholder="Enter Name"
                />
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
                <SkeletonSelect
                    loading={loadingSubject}
                    placeholder="Select Type"
                    options={options.subjectType}
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

export default SubjectForm;