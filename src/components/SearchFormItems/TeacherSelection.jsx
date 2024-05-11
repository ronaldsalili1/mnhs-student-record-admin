import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Empty, Spin } from 'antd';

import { get } from '../../helpers/request';
import SkeletonSelect from '../CustomUI/SkeletonSelect';
import { formatFullName } from '../../helpers/general';

const TeacherSelection = ({ formRef, name, width, query }) => {
    const { xs } = Grid.useBreakpoint();
    const navigate = useNavigate();

    const [loadingTeachers, setLoadingTeachers] = useState(false);
    const [loadingTeachersInit, setLoadingTeachersInit] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const [teacherSearchKey, setTeacherSearchKey] = useState('');

    const getTeacherOptions = async () => {
        setLoadingTeachers(true);

        const response = await get({
            uri: '/admin/teachers/options',
            navigate,
            location,
            query: {
                ...query,
                ...(teacherSearchKey !== '' && { keyword: teacherSearchKey }),
            },
        });
        if (response?.meta?.code !== 200) {
            setLoadingTeachers(false);
            return;
        }

        setTeachers(response?.data?.teachers);
        setLoadingTeachers(false);
        setLoadingTeachersInit(false);
    };

    useEffect(() => {
        let timeout;
        timeout = setTimeout(() => {
            getTeacherOptions();
        }, 500);

        return () => timeout && clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacherSearchKey]);
    
    return (
        <SkeletonSelect
            loading={loadingTeachersInit}
            placeholder="Select Teacher"
            allowClear
            showSearch
            notFoundContent={loadingTeachers ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
            filterOption={false}
            onSearch={value => setTeacherSearchKey(value)}
            options={teachers.map(teacher => ({
                label: formatFullName(teacher),
                value: teacher._id,
            }))}
            onChange={value => {
                const form = formRef?.current;
                if (name && form) {
                    form.setFieldValue(name, value);
                }
            }}
            onClear={() => {
                setTeacherSearchKey('');
                getTeacherOptions();
            }}
            style={{ width: width || 200, ...(xs && { width: '100%' }) }}
        />
    );
};

export default TeacherSelection;