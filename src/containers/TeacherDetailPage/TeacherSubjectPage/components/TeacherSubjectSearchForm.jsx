import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { filterOption, getParamsFromUrl, objectToQueryString } from '../../../../helpers/general';

import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const TeacherSubjectSearchForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const { loadingSubjects, subjects, page, limit, getSubjectTeachers } = props;

    return (
        <Form
            initialValues={query}
            onFinish={values => {
                const { subject_id } = values;
                const queryObj = {
                    ...(page && { page }),
                    ...(limit && { limit }),
                    ...(subject_id && { subject_id }),
                };
                getSubjectTeachers(queryObj);
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
                name="subject_id"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <SkeletonSelect
                    loading={loadingSubjects}
                    placeholder="Search by Subject"
                    showSearch
                    filterOption={filterOption}
                    style={{ width: 200, ...(xs && { width: '100%' }) }}
                    options={subjects.map(subject => ({
                        label: subject.name,
                        value: subject._id,
                    }))}
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

export default TeacherSubjectSearchForm;