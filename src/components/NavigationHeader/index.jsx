import { useContext } from 'react';
import { Layout, Flex, Typography, Row, Col, Popover, theme, Avatar } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';

import './NavigationHeader.css';
import useAuth from '../../hooks/useAuth';
import { AuthContext } from '../../providers/AuthProvider';

const { Header } = Layout;
const { Title, Text } = Typography;

const NavigationHeader = () => {
    const { token } = theme.useToken();
    const { logout } = useAuth();
    const { admin } = useContext(AuthContext);
    const { first_name, last_name, email } = admin || {};

    const avatar = (
        <Avatar
            size="large"
            style={{ backgroundColor: token.colorPrimary }}
        >
            {first_name ? first_name.charAt(0) : ''}
        </Avatar>
    );

    return (
        <Header
            style={{ backgroundColor: token.colorWhite }}
            className="nav-header"
        >
            <Flex
                justify="space-between"
                align="center"
                style={{ height: '100%' }}
            >
                <Title
                    level={1}
                    style={{ fontSize: 20, color: token.colorPrimary }}
                >
                    MNHS Student Records
                </Title>
                <div>
                    <Popover
                        placement="bottomRight"
                        content={
                            <>
                                <Row>
                                    <Col>
                                        {avatar}
                                    </Col>
                                    <Col>
                                        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                            <Text strong>{first_name} {last_name}</Text>
                                            <Text style={{ marginTop: -5 }}>{email}</Text>
                                        </div>
                                    </Col>
                                </Row>
                                <div
                                    className="divider"
                                    style={{ margin: '15px 0px' }}
                                />
                                <Row
                                    justify="space-between"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => logout()}
                                >
                                    <Text>Sign Out</Text>
                                    <LogoutOutlined />
                                </Row>
                            </>
                        }
                    >
                        <Row gutter={6}>
                            <Col>
                                {avatar}
                            </Col>
                            <Col className="admin-name">
                                {first_name} {last_name}
                            </Col>
                            <Col>
                                <DownOutlined style={{ width: 10 }} />
                            </Col>
                        </Row>
                    </Popover>
                </div>
            </Flex>
        </Header>
    );
};

export default NavigationHeader;