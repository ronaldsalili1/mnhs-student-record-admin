import { useContext, useEffect, useRef } from 'react';
import { Row, Form, Button, Flex, Typography } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import useSchool from '../../hooks/useSchool';
import SkeletonInput from '../../components/CustomUI/SkeletonInput';

const { Item } = Form;
const { Text } = Typography;

const SchoolInformationPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    const formRef = useRef(null);

    const { school, loading, loadingSubmit, createOrUpdateSchool } = useSchool();

    useEffect(() => {
        setTitle('School Information');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { name, school_id } = school || {};
    
    useEffect(() => {
        const form = formRef.current;
        if (form) {
            form.setFieldsValue({
                name,
                school_id,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [school]);

    return (
        <Flex justify="center">
            <Form
                ref={formRef}
                layout="vertical"
                onFinish={values => createOrUpdateSchool({ fields: values })}
                style={{
                    width: 400,
                }}
            >
                <Row>
                    <Text
                        strong
                        style={{ fontSize: 18, margin: '15px 0px' }}
                    >
                        School Information:
                    </Text>
                </Row>
                <Item
                    name="name"
                    label="School Name:"
                    rules={[
                        {
                            required: true,
                            message: 'School Name is required',
                        },
                    ]}
                >
                    <SkeletonInput
                        loading={loading}
                        placeholder="Enter School Name"
                    />
                </Item>
                <Item
                    name="school_id"
                    label="School ID:"
                    rules={[
                        {
                            required: true,
                            message: 'School ID is required',
                        },
                    ]}
                >
                    <SkeletonInput
                        loading={loading}
                        placeholder="Enter School ID"
                    />
                </Item>
                <Item>
                    <Flex justify="end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loadingSubmit}
                            style={{ minWidth: 80 }}
                        >
                            Save
                        </Button>
                    </Flex>
                </Item>
            </Form>
        </Flex>
    );
};

export default SchoolInformationPage;