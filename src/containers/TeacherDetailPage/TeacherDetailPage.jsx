import { useContext, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import DetailTab from '../../components/DetailTab';
import { NavigationContext } from '../../providers/NavigationProvider';
import TeacherBasicPage from './TeacherBasicPage/TeacherBasicPage';
import TeacherSubjectPage from './TeacherSubjectPage/TeacherSubjectPage';

const dataSource = [
    {
        key: '621d2a6e9bea8f5e982a129d',
        _id: '621d2a6e9bea8f5e982a129d',
        name: 'Cadayong, Mhar Padro',
        email: 'mhar@email.com',
        status: 'enabled',
    },
    {
        key: '621d2a6e9bea8f5e982a129e',
        _id: '621d2a6e9bea8f5e982a129e',
        name: 'Magayo-ong, Almirah Mae',
        email: 'almirah@email.com',
        status: 'enabled',
    },
    {
        key: '621d2a6e9bea8f5e982a129f',
        _id: '621d2a6e9bea8f5e982a129f',
        name: 'Pantin, Juden Jay',
        email: 'juden@email.com',
        status: 'enabled',
    },
    {
        key: '621d2a6e9bea8f5e982a12a0',
        _id: '621d2a6e9bea8f5e982a12a0',
        name: 'Salili, Ronald Hamot',
        email: 'ronald@email.com',
        status: 'disabled',
    },
];

const TeacherDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { teacherId, tab } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Teachers',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/teachers');
                },
            },
            {
                title: teacherId ? 'Details' : 'Create',
            },
        ]);

        if (!teacherId) {
            setTitle('New Teacher');
        } else {
            const teacher = dataSource.find(data => data._id === teacherId);
            setTitle(teacher.name);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // const student = dataSource.find(data => data._id === studentId);
        // setTitle(student.name);

        // return () => setTitle(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!teacherId) {
        return <TeacherBasicPage/>;
    }

    return (
        <DetailTab
            activeKey={tab}
            items={[
                {
                    key: 'information',
                    label: 'Information',
                    children: <TeacherBasicPage />,
                },
                {
                    key: 'subjects',
                    label: 'Subjects',
                    children: <TeacherSubjectPage />,
                },
            ]}
            onTabClick={value => navigate(`/teachers/${teacherId}/${value}`)}
        />
    );
};

export default TeacherDetailPage;