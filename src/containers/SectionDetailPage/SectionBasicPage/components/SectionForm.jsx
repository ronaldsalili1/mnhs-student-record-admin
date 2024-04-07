import { Row, Form, Button, Flex, Typography } from 'antd';

import options from '../../../../constants/options';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';
import SkeletonInput from '../../../../components/CustomUI/SkeletonInput';
import { useEffect, useRef } from 'react';

const { Item } = Form;
const { Text } = Typography;

const SubjectForm = (props) => {
    const formRef = useRef(null);
    const { loadingSection, loadingSubmit, section, createOrUpdateSection } = props;

    useEffect(() => {
        formRef.current?.setFieldsValue(section);
    }, [section]);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateSection({ sectionId: section?._id, fields: values })}
            style={{
                width: 400,
            }}
        >
            <Row>
                <Text
                    strong
                    style={{ fontSize: 18, margin: '15px 0px' }}
                >
                    Section Informations:
                </Text>
            </Row>
            <Item
                name="grade_level"
                label="Grade Level:"
                rules={[
                    {
                        required: true,
                        message: 'Grade Level is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingSection}
                    placeholder="Select Grade Level"
                    options={options.gradeLevel}
                />
            </Item>
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
                    loading={loadingSection}
                    placeholder="Enter Name"
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