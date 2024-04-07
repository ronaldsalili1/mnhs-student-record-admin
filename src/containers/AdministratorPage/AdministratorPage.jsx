import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Badge } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import { AuthContext } from '../../providers/AuthProvider';
import useAdministrator from '../../hooks/useAdministrator';
import options from '../../constants/options';
import { formatFullName, getParamsFromUrl, objectToQueryString } from '../../helpers/general';

const { Link } = Typography;

const AdministratorPage = () => {
    const layoutState = useContext(NavigationContext);
    const { admin } = useContext(AuthContext);
    const { setTitle } = layoutState;
    const adminRoles = admin?.roles || [];

    const navigate = useNavigate();
    const location = useLocation();
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();

    const { admins, loading, page, total, limit, getAdministrators } = useAdministrator();

    useEffect(() => {
        setTitle('Administrators');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Name (Last, First, Middle, Suffix)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => formatFullName(record),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Roles',
            dataIndex: 'roles',
            key: 'roles',
            render: data => {
                const roles = data.map(value => options.adminRoles.find(role => role.value === value).label);
                const rolesStr = roles.join(', ');
                return rolesStr;
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: data => {
                const status = data === 'enabled' ? 'success' : 'error';
                const adminStatus = options.status.find(s => s.value === data);
                return (
                    <Badge
                        status={status}
                        text={adminStatus.label}
                    />
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/administrators/${record._id}`)}
                    >
                        {adminRoles.includes('superadmin') ? 'Edit' : 'View'}
                    </Link>   
                );
            },
        },
    ];

    return (
        <>
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                {
                    adminRoles.includes('superadmin') &&
                    <Button
                        type="primary"
                        icon={<PlusSquareFilled />}
                        htmlType="submit"
                        style={{ ...(xs && { width: '100%' }) }}
                        onClick={() => navigate('/administrators/create')}
                    >
                        New Administrator
                    </Button>
                }
            </Flex>
            <Table
                scroll={ { x: true } }
                dataSource={admins.map(admin => {
                    return ({
                        ...admin,
                        key: admin._id,
                    });
                })}
                columns={columns}
                loading={loading}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getAdministrators(queryObj);
                        const queryString = objectToQueryString(queryObj);
                        navigate(`${location.pathname}${queryString}`);
                    },
                    position: ['bottomRight'],
                    total,
                    pageSize: limit,
                }}
            />
        </>
    );
};

export default AdministratorPage;