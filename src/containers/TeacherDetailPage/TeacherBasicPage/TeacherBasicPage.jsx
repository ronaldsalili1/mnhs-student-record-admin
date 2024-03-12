import { useContext, useEffect } from 'react';
import  { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../../providers/NavigationProvider';
import TeacherForm from '../components/TeacherForm';

const TeacherBasicInformationPage = () => {
    const { setBreadcrumbItems } = useContext(NavigationContext);
    const navigate = useNavigate();

    return (
        <Flex justify="center">
            <TeacherForm />
        </Flex>
    );
};

export default TeacherBasicInformationPage;