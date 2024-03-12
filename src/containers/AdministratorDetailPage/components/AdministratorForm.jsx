import { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Row, Form, Button, Input, Flex, Select, Typography, theme } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { AuthContext } from '../../../providers/AuthProvider';

const { Item } = Form;
const { Text } = Typography;
const { List } = Form;

const AdministratorForm = ({ admin, createOrUpdateAdministrator }) => {
    const formRef = useRef(null);
    const { token } = theme.useToken();
    const { email, last_name, first_name, middle_name, status } = admin || {};

    const [selectedRoles, setSelectedRoles] = useState([undefined]);
    const { admin: loggedAdmin } = useContext(AuthContext);

    const disabled = useMemo(() => {
        if (!loggedAdmin) {
            return false;
        }

        return !(loggedAdmin.roles || []).includes('superadmin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedAdmin]);

    useEffect(() => {
        if(admin) {
            setSelectedRoles(admin.roles);
            formRef.current?.setFieldValue('roles', admin.roles);
        }
    }, [admin]);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateAdministrator({ adminId: admin?._id, fields: values })}
            initialValues={{
                roles: selectedRoles,
                ...(admin && {
                    email,
                    last_name,
                    first_name,
                    middle_name,
                    status,
                }),
            }}
            style={{
                width: 400,
            }}
        >
            <Row>
                <Text
                    strong
                    style={{ fontSize: 18, margin: '15px 0px' }}
                >
                    Administrator Informations:
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
                ]}
            >
                <Input
                    placeholder="Enter Email"
                    disabled={disabled}
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
                <Input
                    placeholder="Enter Last Name"
                    disabled={disabled}
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
                <Input
                    placeholder="Enter First Name"
                    disabled={disabled}
                />
            </Item>
            <Item
                name="middle_name"
                label="Middle Name:"
            >
                <Input
                    placeholder="Enter Middle Name"
                    disabled={disabled}
                />
            </Item>
            <Item
                name="suffix"
                label="Suffix:"
            >
                <Input
                    placeholder="Enter Suffix"
                    disabled={disabled}
                />
            </Item>
            {
                admin &&
                <Item
                    name="status"
                    label="Status:"
                >
                    <Select
                        placeholder="Select Status"
                        options={options.status}
                        disabled={disabled}
                    />
                </Item>
            }
            <List name="roles">
                {(fields, { add, remove }) => (
                    <>
                        <div style={{ marginBottom: 8 }}>
                            <Text className="label-required">Roles:</Text>
                        </div>
                        {fields.map(({ key, name, ...restField }, index) => (
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
                                            message: 'Role is required',
                                        },
                                    ]}
                                    style={{ margin: 0, width: '100%' }}
                                >
                                    <Select
                                        placeholder="Select Role"
                                        disabled={disabled}
                                        options={options.adminRoles.map(role => {
                                            return {
                                                ...role,
                                                disabled: selectedRoles.includes(role.value),
                                            };
                                        })}
                                        onChange={value => {
                                            const newSelectedRoles = [...selectedRoles];
                                            newSelectedRoles[index] = value;
                                            setSelectedRoles(newSelectedRoles);
                                        }}
                                    />
                                </Item>
                                <MinusCircleOutlined
                                    onClick={() => {
                                        !disabled && selectedRoles.length > 1 && remove(name);
                                        const newSelectedRoles = [...selectedRoles];
                                        newSelectedRoles.splice(index, 1);
                                        setSelectedRoles(newSelectedRoles);
                                    }}
                                    style={{
                                        color: selectedRoles.length < 2 || disabled ? token.colorTextDisabled : token.colorError,
                                        ...(selectedRoles.length < 2 && { cursor: 'not-allowed' }),
                                    }}
                                />
                            </Flex>
                        ))}
                        <Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    add();
                                    setSelectedRoles([...selectedRoles, undefined]);
                                }}
                                block
                                icon={<PlusOutlined />}
                                disabled={disabled}
                            >
                                Add Role
                            </Button>
                        </Item>
                    </>
                )}
            </List>
            {
                !disabled &&
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
            }
        </Form>
    );
};

export default AdministratorForm;