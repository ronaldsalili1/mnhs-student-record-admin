import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import StudentForm from './components/StudentForm';

const dataSource = [
    {
        key: '621d2a6e9bea8f5e982a129d',
        _id: '621d2a6e9bea8f5e982a129d',
        name: 'Cadayong, Mhar Padro',
        lrn: '6482947',
        birthdate: 'April 22, 1994',
        sex: 'Male',
    },
    {
        key: '621d2a6e9bea8f5e982a129e',
        _id: '621d2a6e9bea8f5e982a129e',
        name: 'Magayo-ong, Almirah Mae',
        lrn: '9467947',
        birthdate: 'June 20, 1998',
        sex: 'Female',
    },
    {
        key: '621d2a6e9bea8f5e982a129f',
        _id: '621d2a6e9bea8f5e982a129f',
        name: 'Pantin, Juden Jay',
        lrn: '3948592',
        birthdate: 'September 06, 1995',
        sex: 'Male',
    },
    {
        key: '621d2a6e9bea8f5e982a12a0',
        _id: '621d2a6e9bea8f5e982a12a0',
        name: 'Salili, Ronald Hamot',
        lrn: '1234567',
        birthdate: 'January 10, 1999',
        sex: 'Male',
    },
];

const StudentDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { studentId } = useParams();
    const navigate = useNavigate();

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
                title: studentId ? 'Details' : 'Create',
            },
        ]);

        if (!studentId) {
            setTitle('New Student');
        } else {
            const student = dataSource.find(data => data._id === studentId);
            setTitle(student.name);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <Flex justify="center">
            <StudentForm/>
        </Flex>
    );
};

export default StudentDetailPage;