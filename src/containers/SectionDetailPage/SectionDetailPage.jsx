import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import SectionForm from './components/SectionForm';

const dataSource = [
    {
        key: '621d2a6e9bea8f5e982a129d',
        _id: '621d2a6e9bea8f5e982a129d',
        grade_level: 12,
        name: 'Wonderful',
        adviser: 'Teacher A',
    },
    {
        key: '621d2a6e9bea8f5e982a129e',
        _id: '621d2a6e9bea8f5e982a129e',
        grade_level: 11,
        name: 'Beautiful',
        adviser: 'Teacher B',
    },
];

const SectionDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { sectionId } = useParams();
    const navigate = useNavigate();

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
                title: sectionId ? 'Details' : 'Create',
            },
        ]);

        if (!sectionId) {
            setTitle('New Section');
        } else {
            const subject = dataSource.find(data => data._id === sectionId);
            setTitle(`Grade ${subject.grade_level} - ${subject.name}`);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex justify="center">
            <SectionForm/>
        </Flex>
    );
};

export default SectionDetailPage;