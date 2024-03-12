import { Form, Input, Button, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import options from '../../../constants/options';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const TeacherSearchForm = () => {
    const { xs } = Grid.useBreakpoint();

    return (
        <Form
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

export default TeacherSearchForm;