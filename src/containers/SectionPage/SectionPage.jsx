import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';

import { NavigationContext } from '../../providers/NavigationProvider';
import useSection from '../../hooks/useSection';
import { getParamsFromUrl, objectToQueryString } from '../../helpers/general';
import SectionSearchForm from './components/SectionSearchForm';

const { Link } = Typography;

const SectionPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setTitle } = layoutState;

    const navigate = useNavigate();
    const { xs } = Grid.useBreakpoint();
    const query = getParamsFromUrl();
    const location = useLocation();
    const { loadingSections, loadingTeachers, teachers, sections, total, page, limit, getSections } = useSection();

    useEffect(() => {
        setTitle('Sections');

        return () => setTitle(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Grade Level',
            dataIndex: 'grade_level',
            key: 'grade_level',
        },
        {
            title: 'Adviser',
            dataIndex: 'adviser',
            key: 'adviser',
            render: (_, record) => {
                const { last_name, first_name, suffix, middle_name } = record?.teacher || {};
                return `${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`;
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => navigate(`/sections/${record._id}`)}
                    >
						Edit
                    </Link>   
                );
            },
        },
    ];

    return (
        <>
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                <SectionSearchForm
                    teachers={teachers}
                    loadingTeachers={loadingTeachers}
                    getSections={getSections}
                />
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    htmlType="submit"
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => navigate('/sections/create')}
                >
                    New Section
                </Button>
            </Flex>
            <Table
                loading={loadingSections}
                scroll={ { x: true } }
                dataSource={sections.map(section => {
                    return { ...section, key: section._id };
                })}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getSections(queryObj);
                        const queryString = objectToQueryString(queryObj);
                        navigate(`${location.pathname}${queryString}`);
                    },
                    position: ['bottomRight'],
                    total,
                    pageSize: limit,
                }}
            />
        </>
    );
};

export default SectionPage;