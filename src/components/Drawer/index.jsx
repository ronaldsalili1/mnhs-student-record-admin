import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Flex } from 'antd';
import {
    UserOutlined,
    ClockCircleOutlined,
    HomeOutlined,
    SendOutlined,
    IdcardOutlined,
    SolutionOutlined,
    SnippetsOutlined,
    CalculatorOutlined,
    FormOutlined,
} from '@ant-design/icons';

import mnhsLogo from '../../images/mnhs-logo.webp';

const { Sider } = Layout;

function getItem(label, key, icon, children, theme) {
    return {
        key,
        icon,
        children,
        label,
        theme,
    };
}

const items = [
    getItem('Grade Submissions', 'grade-submissions', <SendOutlined />),
    getItem('Student Forms', 'forms', <FormOutlined />),
    getItem('Semesters', 'semesters', <ClockCircleOutlined />),
    getItem('Subjects', 'subjects', <CalculatorOutlined />),
    getItem('Students', 'students', <IdcardOutlined />),
    getItem('Teachers', 'teachers', <SolutionOutlined />),
    getItem('Sections', 'sections', <SnippetsOutlined />),
    getItem('Administrators', 'administrators', <UserOutlined />),
    getItem('School Information', 'school-info', <HomeOutlined />),
];

const getActiveItem = ({ pathname }) => {
    switch (true) {
        case /\/grade-submissions/.test(pathname):
            return ['grade-submissions'];
        case /\/students/.test(pathname):
            return ['students'];
        case /\/teachers/.test(pathname):
            return ['teachers'];
        case /\/semesters/.test(pathname):
            return ['semesters'];
        case /\/subjects/.test(pathname):
            return ['subjects'];
        case /\/sections/.test(pathname):
            return ['sections'];
        case /\/school-info/.test(pathname):
            return ['school-info'];
        case /\/forms/.test(pathname):
            return ['forms'];
        case /\/administrators/.test(pathname):
            return ['administrators'];
        default:
            return [];
    }
};

const Drawer = ({ collapsed, setCollapsed }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const activeItem = useMemo(() => {
        return getActiveItem({ pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <Sider
            theme="light"
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            breakpoint="lg"
            width={300}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                boxShadow: '5px 0 5px -5px rgba(0, 0, 0, 0.3)',
                overflow: 'auto',
            }}
        >
            <Flex
                justify="center"
                style={{ margin: '20px 0px' }}
            >
                <img
                    src={mnhsLogo}
                    alt="MNHS Logo"
                    style={{ height: collapsed ? 70 : 100 }}
                />
            </Flex>
            <Menu
                theme="light"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
                selectedKeys={activeItem}
                onClick={({ key }) => {
                    navigate(`/${key}`);
                }}
                style={{ paddingBottom: 50 }}
            />
        </Sider>
    );
};

export default Drawer;