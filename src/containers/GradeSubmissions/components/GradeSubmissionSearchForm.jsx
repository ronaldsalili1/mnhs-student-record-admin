import { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Select, Grid, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import options from '../../../constants/options';
import { getParamsFromUrl, objectToQueryString } from '../../../helpers/general';
import TeacherSelection from '../../../components/SearchFormItems/TeacherSelection';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const GradeSubmissionSearchForm = ({ getGradeSubmissions }) => {
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();
    const formRef = useRef(null);

    const { page, limit } = query || {};
    return (
        <Form
            ref={formRef}
            initialValues={query}
            onFinish={values => {
                const { status, teacher_id, submission_date_range } = values;
                const queryObj = {
                    ...(page && { page }),
                    ...(limit && { limit }),
                    ...(status && { status }),
                    ...(teacher_id && { teacher_id }),
                    ...(submission_date_range && {
                        start_at: submission_date_range[0].startOf('day').toISOString(),
                        end_at: submission_date_range[1].endOf('day').toISOString(),
                    }),
                };
                getGradeSubmissions(queryObj);
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
                    allowClear
                    placeholder="Search by Status"
                    options={options.gradeSubmissionStatus}
                    style={{ width: 170, ...(xs && { width: '100%' }) }}
                />
            </Item>
            <Item
                name="teacher_id"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <TeacherSelection
                    formRef={formRef}
                    name="teacher_id"
                />
            </Item>
            <Item
                name="submission_date_range"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <DatePicker.RangePicker style={{ width: 250, ...(xs && { width: '100%' }) }}/>
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

export default GradeSubmissionSearchForm;