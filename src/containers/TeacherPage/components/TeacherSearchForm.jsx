import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { getParamsFromUrl, objectToQueryString } from '../../../helpers/general';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const TeacherSearchForm = ({ getTeachers }) => {
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const { page, limit } = query || {};
    return (
        <Form
            initialValues={query}
            onFinish={values => {
                const { status, keyword } = values;
                const queryObj = {
                    ...(page && { page }),
                    ...(limit && { limit }),
                    ...(status && { status }),
                    ...(keyword && { keyword }),
                };
                getTeachers(queryObj);
                const queryString = objectToQueryString(queryObj);
                navigate(`${location.pathname}${queryString}`);
            }}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
            }}
        >
            <Item
                name="status"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    placeholder="Search by Status"
                    options={options.status}
                    style={{ width: 170, ...(xs && { width: '100%' }) }}
                    allowClear
                />
            </Item>
            <Item
                name="keyword"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Input
                    placeholder="Search by Name and Email"
                    style={{ width: 220, ...(xs && { width: '100%' }) }}
                    allowClear
                />
            </Item>
            <Item
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Button
                    type="primary"
                    icon={<SearchOutlined/>}
                    htmlType="submit"
                    style={{ ...(xs && { width: '100%' }) }}
                >
                    Search
                </Button>
            </Item>
        </Form>
    );
};

export default TeacherSearchForm;