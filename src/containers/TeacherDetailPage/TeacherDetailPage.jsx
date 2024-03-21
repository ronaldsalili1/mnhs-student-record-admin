import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import DetailTab from '../../components/DetailTab';
import { NavigationContext } from '../../providers/NavigationProvider';
import TeacherBasicPage from './TeacherBasicPage/TeacherBasicPage';
import TeacherSubjectPage from './TeacherSubjectPage/TeacherSubjectPage';
import useTeacherDetail from '../../hooks/TeacherDetailPage/useTeacherDetail';

const TeacherDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { teacherId, tab } = useParams();
    const navigate = useNavigate();

    const teacherProps = useTeacherDetail(teacherId);

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
            // const teacher = dataSource.find(data => data._id === teacherId);
            // setTitle(teacher?.name);
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
        return <TeacherBasicPage {...teacherProps}/>;
    }

    return (
        <DetailTab
            activeKey={tab}
            items={[
                {
                    key: 'information',
                    label: 'Information',
                    children: <TeacherBasicPage {...teacherProps}/>,
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