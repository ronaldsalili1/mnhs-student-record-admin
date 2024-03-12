import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Form, Row, Select, theme } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';

const { Item, List } = Form;
const { Text } = Typography;

const FormPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;
    const { token } = theme.useToken();
    const formRef = useRef(null);
    
    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();

    useEffect(() => {
        setTitle('Download Student Form');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex justify="center">
            <Form
                ref={formRef}
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
                        Download Student Forms:
                    </Text>
                </Row>
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
                    <Select
                        placeholder="Select Semester"
                        options={[]}
                    /> 
                </Item>
                <List name="forms">
                    {(fields, { add, remove }) => (
                        <>
                            <div style={{ marginBottom: 8 }}>
                                <Text>Forms:</Text>
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
                                                message: 'Form is required',
                                            },
                                        ]}
                                        style={{ margin: 0, width: '100%' }}
                                    >
                                        <Select
                                            options={[
                                                {
                                                    label: 'Master Grade Sheets',
                                                    value: 'master_grade_sheets',
                                                },
                                                {
                                                    label: 'Student Form 9',
                                                    value: 'sf_9',
                                                },
                                                {
                                                    label: 'Student Form 10',
                                                    value: 'sf_10',
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
                                    Add Form
                                </Button>
                            </Item>
                        </>
                    )}
                </List>
                <Item>
                    <Flex justify="end">
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ minWidth: 80 }}
                        >
                            Download
                        </Button>
                    </Flex>
                </Item>
            </Form>
        </Flex>
    );
};

export default FormPage;