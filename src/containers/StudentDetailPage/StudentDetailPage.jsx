import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { NavigationContext } from '../../providers/NavigationProvider';
import useStudentDetail from '../../hooks/StudentDetailPage/useStudentDetail';
import DetailTab from '../../components/DetailTab';
import StudentBasicPage from './StudentBasicPage/StudentBasicPage';
// import StudentSubjectGradePage from './StudentSubjectGradePage/StudentSubjectGradePage';
import StudentShsEligibilityPage from './StudentShsEligibilityPage/StudentShsEligibilityPage';

const StudentDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { studentId, tab } = useParams();
    const navigate = useNavigate();
    const studentProps = useStudentDetail(studentId);
    const { student } = studentProps;

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Students',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/students');
                },
            },
            {
                title: student ? 'Details' : 'Create',
            },
        ]);

        if (!student) {
            setTitle('New Student');
        } else {
            const { last_name, first_name, middle_name, suffix } = student || {};
            setTitle(`${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [student]);

    if (!studentId) {
        return <StudentBasicPage {...studentProps}/>;
    }
    
    return (
        <DetailTab
            activeKey={tab}
            items={[
                {
                    key: 'information',
                    label: 'Information',
                    children: <StudentBasicPage {...studentProps}/>,
                },
                {
                    key: 'shs-eligibility',
                    label: 'SHS Eligibility',
                    children: <StudentShsEligibilityPage />,
                },
                // {
                //     key: 'subject-grades',
                //     label: 'Subject Grades',
                //     children: <StudentSubjectGradePage />,
                // },
            ]}
            onTabClick={value => navigate(`/students/${studentId}/${value}`)}
        />
    );
};

export default StudentDetailPage;