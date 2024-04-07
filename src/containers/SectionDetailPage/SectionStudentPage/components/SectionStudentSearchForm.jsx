import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Grid } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { getParamsFromUrl, objectToQueryString } from '../../../../helpers/general';
import SkeletonSelect from '../../../../components/CustomUI/SkeletonSelect';

const { Item } = Form;

const commonItemStyle = {
    margin: 0,
};

const SectionStudentSearchForm = (props) => {
    const searchFormRef = useRef(null);
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const navigate = useNavigate();
    const location = useLocation();

    const { loadingSemesters, semesters, getSectionStudents } = props;
    const { limit } = query || {};


    useEffect(() => {
        const activeSemester = semesters.find(semester => semester.status === 'active');
        if (!query.semester_id && activeSemester) {
            searchFormRef.current?.setFieldsValue({
                semester_id: activeSemester._id,
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semesters]);

    return (
        <Form
            ref={searchFormRef}
            initialValues={query}
            onFinish={values => {
                const { semester_id } = values;
                const queryObj = {
                    page: 1,
                    ...(limit && { limit }),
                    ...(semester_id && { semester_id }),
                };
                getSectionStudents(queryObj);
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
                name="semester_id"
                style={{
                    ...commonItemStyle,
                    ...(xs && { width: '100%' }),
                }}
            >
                <SkeletonSelect
                    loading={loadingSemesters}
                    placeholder="Search by Semester"
                    style={{ width: 260, ...(xs && { width: '100%' }) }}
                    options={semesters.map(semester => {
                        const { sy_start_year, sy_end_year, term } = semester;
                        return {
                            label: `S.Y. ${sy_start_year} - ${sy_end_year} | ${term === 1 ? '1st' : '2nd'} Semester`,
                            value: semester._id,
                        };
                    })}
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

export default SectionStudentSearchForm;