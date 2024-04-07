import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Typography, Button, Flex, Grid, Badge } from 'antd';
import { PlusSquareFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

import { formatFullName, getParamsFromUrl, objectToQueryString } from '../../../helpers/general';
import SectionAdviserModal from './components/SectionAdviserModal';
import useSectionAdviser from '../../../hooks/SectionDetailPage/useSectionAdviser';

dayjs.extend(isSameOrAfter);

const { Link } = Typography;

const SectionAdviserPage = () => {
    const [modal, setModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const query = getParamsFromUrl();
    const { xs } = Grid.useBreakpoint();
    const sectionAdviserProps = useSectionAdviser();
    const {
        meta,
        setSectionAdviser,
        getSectionAdvisers,
        getSectionAdviserById,
        loadingSectionAdvisers,
        sectionAdvisers,
        sectionAdviser,
        total,
        page,
        limit,
    } = sectionAdviserProps;

    useEffect(() => {
        if (meta?.code === 200) {
            setModal(false);
        }
    }, [meta]);

    const columns = [
        {
            title: 'Name (Last, First, Middle, Suffix)',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => formatFullName(record?.teacher),
        },
        {
            title: 'Start At',
            dataIndex: 'start_at',
            key: 'start_at',
            render: data => dayjs(data).format('YYYY-MM-DD'),
        },
        {
            title: 'End At',
            dataIndex: 'end_at',
            key: 'end_at',
            render: data => data ? dayjs(data).format('YYYY-MM-DD') : '-',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                const { status } = record || {};

                if (status !== 'active') {
                    return 'Inactive';
                }

                return (
                    <Badge
                        status="success"
                        text="Active"
                    />
                );
            },
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => {
                return (
                    <Link
                        onClick={() => {
                            getSectionAdviserById(record._id);
                            setModal(true);
                        }}
                    >
						Edit
                    </Link>   
                );
            },
        },
    ];

    const dataSource = useMemo(() => {
        let finalData = [];

        const activeAdvisers = sectionAdvisers
            .filter(adviser => {
                const { start_at, end_at } = adviser || {};
                const now = dayjs();
            
                return now.isSameOrAfter(dayjs(start_at)) && (!end_at || now.isBefore(dayjs(end_at)));
            })
            .map(activeAdviser => ({ ...activeAdviser, status: 'active' }));
        
        if (activeAdvisers.length > 0) {
            const inactiveAdvisers = sectionAdvisers.filter(adviser => !activeAdvisers.map(activeAdviser => activeAdviser._id).includes(adviser._id));
            finalData = [...activeAdvisers, ...inactiveAdvisers];
        } else {
            finalData = sectionAdvisers;
        }

        return finalData.map(data => ({ ...data, key: data._id }));
    }, [sectionAdvisers]);

    return (
        <Flex
            vertical
            style={{ width: '100%' }}
        >
            <Flex
                justify="end"
                wrap="wrap"
                gap={10}
                style={{ margin: '10px 0px' }}
            >
                <Button
                    type="primary"
                    icon={<PlusSquareFilled />}
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={() => setModal(true)}
                >
                    Add Adviser
                </Button>
            </Flex>
            <Table
                loading={loadingSectionAdvisers}
                scroll={ { x: true } }
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    current: page,
                    showSizeChanger: true,
                    onChange: (current, pageSize) => {
                        const queryObj = { ...query, page: current, limit: pageSize };
                        getSectionAdvisers(queryObj);
                        const queryString = objectToQueryString(queryObj);
                        navigate(`${location.pathname}${queryString}`);
                    },
                    position: ['bottomRight'],
                    total,
                    pageSize: limit,
                }}
            />
            <SectionAdviserModal
                title={sectionAdviser ? formatFullName(sectionAdviser?.teacher) : 'Add Adviser'}
                destroyOnClose={true}
                width={450}
                open={modal}
                onCancel={() => {
                    setModal(false);
                    setSectionAdviser(null);
                }}
                sectionAdviserProps={sectionAdviserProps}
            />
        </Flex>
    );
};

export default SectionAdviserPage;