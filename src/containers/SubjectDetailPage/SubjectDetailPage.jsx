import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import SubjectForm from './components/SubjectForm';

const dataSource = [
    {
        key: '621d2a6e9bea8f5e982a129d',
        _id: '621d2a6e9bea8f5e982a129d',
        name: 'Subject A',
        type: 'core',
    },
    {
        key: '621d2a6e9bea8f5e982a129e',
        _id: '621d2a6e9bea8f5e982a129e',
        name: 'Subject B',
        type: 'applied',
    },
];

const SubjectDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { subjectId } = useParams();
    const navigate = useNavigate();

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
                title: subjectId ? 'Details' : 'Create',
            },
        ]);

        if (!subjectId) {
            setTitle('New Subject');
        } else {
            const subject = dataSource.find(data => data._id === subjectId);
            setTitle(subject.name);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex justify="center">
            <SubjectForm/>
        </Flex>
    );
};

export default SubjectDetailPage;