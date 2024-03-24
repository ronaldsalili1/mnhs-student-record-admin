import { useEffect, useRef, useState } from 'react';
import { Row, Form, Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import options from '../../../constants/options';
import SkeletonDatePicker from '../../../components/CustomUI/SkeletonDatePicker';
import SkeletonSelect from '../../../components/CustomUI/SkeletonSelect';

const { Item } = Form;
const { Text } = Typography;

const SemesterForm = (props) => {
    const formRef = useRef(null);
    const { loadingSemester, loadingSubmit, semester, createOrUpdateSemester } = props;

    useEffect(() => {
        const { sy_start_year, sy_end_year } = semester || {};
        formRef.current?.setFieldsValue({
            ...semester,
            ...(sy_start_year && { sy_start_year: dayjs(sy_start_year) }),
            ...(sy_end_year && { sy_end_year: dayjs(sy_end_year) }),
        });
    }, [semester]);

    const disabledDate = (current) => {
        if (current && syStartYear) {
            return current && current.year() <= syStartYear.year();
        }

        return false;
    };

    const [syStartYear, setSyStartYear] = useState(null);

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => {
                const { sy_start_year, sy_end_year } = values;
                createOrUpdateSemester({
                    semesterId: semester?._id,
                    fields: {
                        ...values,
                        sy_start_year: dayjs(sy_start_year).startOf('year').toISOString(),
                        sy_end_year: dayjs(sy_end_year).startOf('year').toISOString(),
                    },
                });
            }}
            style={{
                width: 400,
            }}
        >
            <Row>
                <Text
                    strong
                    style={{ fontSize: 18, margin: '15px 0px' }}
                >
                    Semester Informations:
                </Text>
            </Row>
            <Item
                name="sy_start_year"
                label="Start Year:"
                rules={[
                    {
                        required: true,
                        message: 'Start Year is required',
                    },
                ]}
            >
                <SkeletonDatePicker
                    loading={loadingSemester}
                    placeholder="Select Start Year"
                    picker="year"
                    style={{ width: '100%' }}
                    onChange={value => {
                        setSyStartYear(value);
                        formRef.current?.setFieldValue('sy_end_year', dayjs(value).add(1, 'year'));
                    }}
                />
            </Item>
            <Item
                name="sy_end_year"
                label="End Year:"
                rules={[
                    {
                        required: true,
                        message: 'End Year is required',
                    },
                ]}
            >
                <SkeletonDatePicker
                    disabledDate={disabledDate}
                    loading={loadingSemester}
                    placeholder="Select End Year"
                    picker="year"
                    style={{ width: '100%' }}
                />
            </Item>
            <Item
                name="term"
                label="Semester:"
                rules={[
                    {
                        required: true,
                        message: 'Semester is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingSemester}
                    placeholder="Select Semester"
                    options={options.semesterTerm}
                />
            </Item>
            <Item
                name="status"
                label="Status:"
                rules={[
                    {
                        required: true,
                        message: 'Status is required',
                    },
                ]}
            >
                <SkeletonSelect
                    loading={loadingSemester}
                    placeholder="Select Status"
                    options={options.semesterStatus}
                />
            </Item>
            <Item>
                <Flex justify="end">
                    <Button
                        loading={loadingSubmit}
                        type="primary"
                        htmlType="submit"
                        style={{ minWidth: 80 }}
                    >
                        Save
                    </Button>
                </Flex>
            </Item>
        </Form>
    );
};

export default SemesterForm;