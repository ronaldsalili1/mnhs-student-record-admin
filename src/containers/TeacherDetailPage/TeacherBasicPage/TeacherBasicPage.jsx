import { useContext, useEffect } from 'react';
import  { useNavigate, useParams } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../../providers/NavigationProvider';
import TeacherForm from './components/TeacherForm';
import useTeacherDetail from '../../../hooks/TeacherDetailPage/useTeacherDetail';

const TeacherBasicInformationPage = (props) => {
    const { setBreadcrumbItems } = useContext(NavigationContext);
    const navigate = useNavigate();
    const { teacherId } = useParams();

    const { teacher, loading, loadingSubmit, getTeacherById, createOrUpdateTeacher } = props;

    return (
        <Flex justify="center">
            <TeacherForm
                loading={loading}
                loadingSubmit={loadingSubmit}
                createOrUpdateTeacher={createOrUpdateTeacher}
                teacher={teacher}
            />
        </Flex>
    );
};

export default TeacherBasicInformationPage;