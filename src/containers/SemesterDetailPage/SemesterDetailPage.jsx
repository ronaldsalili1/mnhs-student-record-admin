import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';
import dayjs from 'dayjs';

import { NavigationContext } from '../../providers/NavigationProvider';
import SemesterForm from './components/SemesterForm';
import useSemesterDetail from '../../hooks/SemesterDetailPage/SemesterDetailPage';


const SemesterDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { semesterId } = useParams();
    const navigate = useNavigate();
    const semesterProps = useSemesterDetail(semesterId);
    const { semester } = semesterProps;

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
                title: semester ? 'Details' : 'Create',
            },
        ]);

        if (!semester) {
            setTitle('New Semester');
        } else {
            const {
                sy_start_year,
                sy_end_year,
                term,
            } = semester || {};
            let semesterNum = '';

            switch (term) {
                case 1:
                    semesterNum = '1st';
                    break;
                case 2:
                    semesterNum = '2nd';
                    break;
                default:
                    break;
            }
            setTitle(`S.Y. ${dayjs(sy_start_year).year()} - ${dayjs(sy_end_year).year()} | ${semesterNum} Semester`);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [semester]);

    return (
        <Flex justify="center">
            <SemesterForm {...semesterProps}/>
        </Flex>
    );
};

export default SemesterDetailPage;