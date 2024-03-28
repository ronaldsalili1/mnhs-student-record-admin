import { useEffect, useRef, useState } from 'react';
import { Row, Form, Button, Flex, Typography } from 'antd';
import dayjs from 'dayjs';

import options from '../../../constants/options';
import SkeletonDatePicker from '../../../components/CustomUI/SkeletonDatePicker';
import SkeletonSelect from '../../../components/CustomUI/SkeletonSelect';
import SkeletonInputNumber from '../../../components/CustomUI/SkeletonInputNumber';

const { Item } = Form;
const { Text } = Typography;

const SemesterForm = (props) => {
    const formRef = useRef(null);
    const { loadingSemester, loadingSubmit, semester, createOrUpdateSemester } = props;
    const [syStartAt, setSyStartAt] = useState(null);

    useEffect(() => {
        const { start_at, end_at } = semester || {};
        formRef.current?.setFieldsValue({
            ...semester,
            ...(start_at && { start_at: dayjs(start_at) }),
            ...(end_at && { end_at: dayjs(end_at) }),
        });
    }, [semester]);

    const disabledDate = (current) => {
        if (current && syStartAt) {
            return current && current.subtract(1, 'month') <= syStartAt;
        }

        return false;
    };

    return (
        <Form
            ref={formRef}
            layout="vertical"
            onFinish={values => {
                const { start_at, end_at } = values;
                createOrUpdateSemester({
                    semesterId: semester?._id,
                    fields: {
                        ...values,
                        start_at: dayjs(start_at).startOf('month').toISOString(),
                        end_at: dayjs(end_at).endOf('month').toISOString(),
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
                label="School Year:"
                required
                style={{ margin: 0 }}
            >
                <Flex
                    justify="space-between"
                    gap={7}
                >
                    <Item
                        name="sy_start_year"
                        rules={[
                            {
                                required: true,
                                message: 'Start Year is required',
                            },
                        ]}
                    >
                        <SkeletonInputNumber
                            loading={loadingSemester}
                            placeholder="Enter Start Year"
                            style={{ width: '100%' }}
                            onChange={value => {
                                formRef.current?.setFieldValue('sy_end_year', value ? value + 1 : null);
                            }}
                        />
                    </Item>
                    <span style={{ marginTop: 4 }}> - </span>
                    <Item
                        name="sy_end_year"
                        rules={[
                            {
                                required: true,
                                message: 'End Year is required',
                            },
                        ]}
                    >
                        <SkeletonInputNumber
                            loading={loadingSemester}
                            placeholder="Enter End Year"
                            style={{ width: '100%' }}
                        />
                    </Item>
                </Flex>
            </Item>
            <Item
                name="start_at"
                label="Start At (YYYY-MM):"
                rules={[
                    {
                        required: true,
                        message: 'Start At is required',
                    },
                ]}
            >
                <SkeletonDatePicker
                    loading={loadingSemester}
                    placeholder="Select Start At"
                    picker="month"
                    style={{ width: '100%' }}
                    onChange={value => {
                        setSyStartAt(value);
                        formRef.current?.setFieldValue('end_at', value ? dayjs(value).add(5, 'month') : null);
                    }}
                />
            </Item>
            <Item
                name="end_at"
                label="End At (YYYY-MM):"
                rules={[
                    {
                        required: true,
                        message: 'End At is required',
                    },
                ]}
            >
                <SkeletonDatePicker
                    disabledDate={disabledDate}
                    loading={loadingSemester}
                    placeholder="Select End At"
                    picker="month"
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