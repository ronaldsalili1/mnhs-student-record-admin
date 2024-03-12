import { useContext, useEffect } from 'react';
import { Row, Form, Button, Input, Flex, Typography } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';

const { Item } = Form;
const { Text } = Typography;

const SchoolInformationPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;

    useEffect(() => {
        setTitle('School Information');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex justify="center">
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
                    <Input placeholder="Enter School Name"/>
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
                    <Input placeholder="Enter School ID"/>
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
        </Flex>
    );
};

export default SchoolInformationPage;