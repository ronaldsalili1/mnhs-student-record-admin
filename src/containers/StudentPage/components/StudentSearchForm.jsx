import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { getParamsFromUrl, objectToQueryString } from '../../../helpers/general';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const StudentSearchForm = ({ getStudents }) => {
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const { page, limit } = query || {};
    return (
        <Form
            initialValues={query}
            onFinish={values => {
                const { sex, keyword } = values;
                const queryObj = {
                    ...(page && { page }),
                    ...(limit && { limit }),
                    ...(sex && { sex }),
                    ...(keyword && { keyword }),
                };
                getStudents(queryObj);
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
                name="sex"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    allowClear
                    placeholder="Search by Sex"
                    options={options.sex}
                    style={{ width: 150, ...(xs && { width: '100%' }) }}
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
                    allowClear
                    placeholder="Search by Name and LRN"
                    style={{ width: 220, ...(xs && { width: '100%' }) }}
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

export default StudentSearchForm;