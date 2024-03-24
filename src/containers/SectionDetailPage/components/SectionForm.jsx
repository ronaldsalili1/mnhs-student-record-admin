import { Row, Form, Button, Flex, Typography } from 'antd';

import options from '../../../constants/options';
import SkeletonSelect from '../../../components/CustomUI/SkeletonSelect';
import SkeletonInput from '../../../components/CustomUI/SkeletonInput';
import { filterOption } from '../../../helpers/general';
import { useEffect, useRef } from 'react';

const { Item } = Form;
const { Text } = Typography;

const SubjectForm = (props) => {
    const formRef = useRef(null);
    const { loadingSection, loadingTeachers, section, teachers, createOrUpdateSection } = props;

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
            <Item
                name="teacher_id"
                label="Adviser:"
                rules={[
                    {
                        required: true,
                        message: 'Adviser is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingSection || loadingTeachers}
                    placeholder="Select Adviser"
                    showSearch
                    filterOption={filterOption}
                    options={teachers.map(teacher => {
                        const { _id, last_name, first_name, suffix, middle_name } = teacher || {};
                        return ({
                            label: `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`,
                            value: _id,
                        });
                    })}
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

export default SubjectForm;