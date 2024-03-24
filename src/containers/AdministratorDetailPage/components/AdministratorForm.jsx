import { useEffect, useMemo, useRef, useState, useContext } from 'react';
import { Row, Form, Button, Flex, Select, Typography, theme } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { AuthContext } from '../../../providers/AuthProvider';
import SkeletonInput from '../../../components/CustomUI/SkeletonInput';
import SkeletonSelect from '../../../components/CustomUI/SkeletonSelect';
import SkeletonPasswordInput from '../../../components/CustomUI/SkeletonPasswordInput';

const { Item } = Form;
const { Text } = Typography;
const { List } = Form;

const AdministratorForm = (props) => {
    const formRef = useRef(null);
    const { token } = theme.useToken();
    const { admin: loggedAdmin } = useContext(AuthContext);
    const { loading, loadingSubmit, admin, createOrUpdateAdministrator } = props;

    const [selectedRoles, setSelectedRoles] = useState([undefined]);
    const [currentPass, setCurrentPass] = useState('');
    const [newPass1, setNewPass1] = useState('');
    const [newPass2, setNewPass2] = useState('');

    const disabled = useMemo(() => {
        if (loading) {
            return true;
        }

        if (loggedAdmin?._id === admin?._id) {
            return false;
        }

        return !(loggedAdmin?.roles || []).includes('superadmin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedAdmin, admin, loading]);

    const updatingPassword = useMemo(() => {
        if (
            currentPass !== ''
            || newPass1 !== ''
            || newPass2 !== ''
        ) {
            return true;
        }

        return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPass, newPass1, newPass2]);

    const canUpdatePass = useMemo(() => {
        if (admin && (loggedAdmin.roles.includes('superadmin') || loggedAdmin._id === admin._id)) {
            return true;
        }

        return false;
    }, [admin, loggedAdmin]);

    useEffect(() => {
        if(admin) {
            const { email, last_name, first_name, middle_name, status, roles, suffix } = admin;
            setSelectedRoles(roles);
            formRef.current?.setFieldsValue({
                roles,
                email,
                last_name,
                first_name,
                middle_name,
                suffix,
                status,
            });
        }
    }, [admin]);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => createOrUpdateAdministrator({ adminId: admin?._id, fields: values })}
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
                <SkeletonInput
                    loading={loading}
                    placeholder="Enter Email"
                    disabled={!loggedAdmin?.roles?.includes('superadmin')}
                />
            </Item>
            {
                canUpdatePass &&
                <>
                    <Item
                        name="current_password"
                        label="Current Password:"
                        rules={[
                            {
                                required: updatingPassword,
                                message: 'Current Password is required',
                            },
                        ]}
                    >
                        <SkeletonPasswordInput
                            loading={loading}
                            placeholder="Enter Current Password"
                            disabled={disabled}
                            onChange={e => setCurrentPass(e.target.value)}
                            allowClear
                        />
                    </Item>
                    <Item
                        name="new_password_1"
                        label="New Password:"
                        rules={[
                            {
                                required: updatingPassword,
                                message: 'New Password is required',
                            },
                        ]}
                    >
                        <SkeletonPasswordInput
                            loading={loading}
                            placeholder="Enter New Password"
                            disabled={disabled}
                            onChange={e => setNewPass1(e.target.value)}
                            allowClear
                        />
                    </Item>
                    <Item
                        name="new_password_2"
                        label="Confirm Password:"
                        rules={[
                            {
                                required: updatingPassword,
                                message: 'Confirm Password is required',
                            },
                        ]}
                    >
                        <SkeletonPasswordInput
                            loading={loading}
                            placeholder="Enter Confirm Password"
                            disabled={disabled}
                            onChange={e => setNewPass2(e.target.value)}
                            onPaste={e => {
                                e.preventDefault();
                            }}
                            allowClear
                        />
                    </Item>
                </>
            }
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
                <SkeletonInput
                    loading={loading}
                    placeholder="Enter First Name"
                    disabled={disabled}
                />
            </Item>
            <Item
                name="middle_name"
                label="Middle Name:"
            >
                <SkeletonInput
                    loading={loading}
                    placeholder="Enter Middle Name"
                    disabled={disabled}
                />
            </Item>
            <Item
                name="suffix"
                label="Suffix:"
            >
                <SkeletonInput
                    loading={loading}
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
                                    <SkeletonSelect
                                        loading={loading}
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
            }
        </Form>
    );
};

export default AdministratorForm;