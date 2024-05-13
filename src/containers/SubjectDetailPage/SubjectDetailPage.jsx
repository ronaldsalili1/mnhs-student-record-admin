import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { NavigationContext } from '../../providers/NavigationProvider';
import useSubjectDetail from '../../hooks/SubjectDetailPage/useSubjectDetail';
import DetailTab from '../../components/DetailTab';
import SubjectBasicPage from './SubjectBasicPage/SubjectBasicPage';
import SubjectTeacherPage from './SubjectTeacherPage/SubjectTeacherPage';
import SubjectStudentPage from './SubjectStudentPage/SubjectStudentPage';

const SubjectDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { subjectId, tab } = useParams();
    const navigate = useNavigate();
    const subjectProps = useSubjectDetail(subjectId);
    const { subject } = subjectProps;

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Subjects',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/subjects');
                },
            },
            {
                title: subject ? 'Details' : 'Create',
            },
        ]);

        if (!subject) {
            setTitle('New Subject');
        } else {
            setTitle(subject.name);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subject]);

    if (!subjectId) {
        return <SubjectBasicPage {...subjectProps}/>;
    }

    return (
        <DetailTab
            activeKey={tab}
            items={[
                {
                    key: 'information',
                    label: 'Information',
                    children: <SubjectBasicPage {...subjectProps}/>,
                },
                {
                    key: 'subject-teachers',
                    label: 'Teachers',
                    children: <SubjectTeacherPage />,
                },
                {
                    key: 'subject-student',
                    label: 'Students',
                    children: <SubjectStudentPage {...subjectProps} />,
                },
            ]}
            onTabClick={value => navigate(`/subjects/${subjectId}/${value}`)}
        />
    );
};

export default SubjectDetailPage;