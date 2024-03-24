import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import SectionForm from './components/SectionForm';
import useSectionDetail from '../../hooks/SectionDetailPage/useSectionDetail';


const SectionDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { sectionId } = useParams();
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

    return (
        <Flex justify="center">
            <SectionForm {...sectionDetailProps}/>
        </Flex>
    );
};

export default SectionDetailPage;