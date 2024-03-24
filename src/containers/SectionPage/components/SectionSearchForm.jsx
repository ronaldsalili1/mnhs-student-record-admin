import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { filterOption, getParamsFromUrl, objectToQueryString } from '../../../helpers/general';
import SkeletonSelect from '../../../components/CustomUI/SkeletonSelect';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const SectionSearchForm = ({ teachers, loadingTeachers, getSections }) => {
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const { page, limit } = query || {};
    return (
        <Form
            initialValues={query}
            onFinish={values => {
                const { grade_level, teacher_id, keyword } = values;
                const queryObj = {
                    ...(page && { page }),
                    ...(limit && { limit }),
                    ...(grade_level && { grade_level }),
                    ...(teacher_id && { teacher_id }),
                    ...(keyword && { keyword }),
                };
                getSections(queryObj);
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
                name="grade_level"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <Select
                    placeholder="Search by Grade Level"
                    options={options.gradeLevel}
                    style={{ width: 170, ...(xs && { width: '100%' }) }}
                    allowClear
                />
            </Item>
            <Item
                name="teacher_id"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <SkeletonSelect
                    loading={loadingTeachers}
                    placeholder="Search by Adviser"
                    style={{ width: 200, ...(xs && { width: '100%' }) }}
                    allowClear
                    showSearch
                    filterOption={filterOption}
                    options={teachers.map(teacher => {
                        const { _id, last_name, first_name, suffix, middle_name } = teacher || {};
                        return ({
                            label: `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`,
                            value: _id,
                        });
                    })}
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
                    placeholder="Search by Section Name"
                    style={{ width: 200, ...(xs && { width: '100%' }) }}
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

export default SectionSearchForm;