import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { NavigationContext } from '../../providers/NavigationProvider';
import useSectionDetail from '../../hooks/SectionDetailPage/useSectionDetail';
import DetailTab from '../../components/DetailTab';
import SectionBasicPage from './SectionBasicPage/SectionBasicPage';
import SectionAdviserPage from './SectionAdviserPage/SectionAdviserPage';
import SectionStudentPage from './SectionStudentPage/SectionStudentPage';

const SectionDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { sectionId, tab } = useParams();
    const navigate = useNavigate();

    const sectionDetailProps = useSectionDetail(sectionId);
    const { section } = sectionDetailProps;

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Sections',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/sections');
                },
            },
            {
                title: section ? 'Details' : 'Create',
            },
        ]);

        if (!section) {
            setTitle('New Section');
        } else {
            setTitle(`Grade ${section.grade_level} - ${section.name}`);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [section]);

    if (!sectionId) {
        return <SectionBasicPage {...sectionDetailProps}/>;
    }

    return (
        <DetailTab
            activeKey={tab}
            items={[
                {
                    key: 'information',
                    label: 'Information',
                    children: <SectionBasicPage {...sectionDetailProps}/>,
                },
                {
                    key: 'section-advisers',
                    label: 'Advisers',
                    children: <SectionAdviserPage />,
                },
                {
                    key: 'section-students',
                    label: 'Students',
                    children: <SectionStudentPage />,
                },
            ]}
            onTabClick={value => navigate(`/sections/${sectionId}/${value}`)}
        />
    );
};

export default SectionDetailPage;