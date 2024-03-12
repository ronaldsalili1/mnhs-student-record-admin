import { Form, Input, Button, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const GradeSearchForm = () => {
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
                name="teacher"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    placeholder="Search by Teacher"
                    options={[]}
                />
            </Item>
            <Item
                name="semester"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    placeholder="Search by Semester"
                    options={[]}
                />
            </Item>
            <Item
                name="student"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    placeholder="Search by Student"
                    options={[]}
                />
            </Item>
            <Item
                name="subject"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    placeholder="Search by Subject"
                    options={[]}
                />
            </Item>
            <Item
                name="grade"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Input
                    placeholder="Search by Grade"
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

export default GradeSearchForm;