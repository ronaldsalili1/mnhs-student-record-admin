import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { getParamsFromUrl, objectToQueryString } from '../../../helpers/general';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const SubjectSearchForm = ({ getSubjects }) => {
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const { page, limit } = query || {};
    return (
        <Form
            initialValues={query}
            onFinish={values => {
                const { type, keyword } = values;
                const queryObj = {
                    ...(page && { page }),
                    ...(limit && { limit }),
                    ...(type && { type }),
                    ...(keyword && { keyword }),
                };
                getSubjects(queryObj);
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
                name="type"
                style={{
                    ...commonItemStyle,
                    width: 150, ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    allowClear
                    placeholder="Search by Type"
                    options={options.subjectType}
                />
            </Item>
            <Item
                name="keyword"
                style={{
                    ...commonItemStyle,
                    width: 200, ...(xs && { width: '100%' }),
                }}
            >
                <Input
                    placeholder="Search by Name "
                    style={{ width: 200, ...(xs && { width: '100%' }) }}
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

export default SubjectSearchForm;