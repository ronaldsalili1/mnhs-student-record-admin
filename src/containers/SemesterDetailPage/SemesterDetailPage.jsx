import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import SemesterForm from './components/SemesterForm';

const dataSource = [
    {
        key: '621d2a6e9bea8f5e982a129d',
        _id: '621d2a6e9bea8f5e982a129d',
        school_year: '2023-2024',
        number: 2,
    },
    {
        key: '621d2a6e9bea8f5e982a129e',
        _id: '621d2a6e9bea8f5e982a129e',
        school_year: '2022-2023',
        number: 1,
    },
];

const SemesterDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { semesterId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Semesters',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/semesters');
                },
            },
            {
                title: semesterId ? 'Details' : 'Create',
            },
        ]);

        if (!semesterId) {
            setTitle('New Semester');
        } else {
            const semester = dataSource.find(data => data._id === semesterId);
            let semesterNum = '';

            switch (semester.number) {
                case 1:
                    semesterNum = '1st';
                    break;
                case 2:
                    semesterNum = '2nd';
                    break;
                default:
                    break;
            }
            setTitle(`S.Y. ${semester.school_year} - ${semesterNum} Semester`);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Flex justify="center">
            <SemesterForm/>
        </Flex>
    );
};

export default SemesterDetailPage;