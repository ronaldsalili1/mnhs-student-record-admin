import { Flex } from 'antd';

import TeacherForm from './components/TeacherForm';

const TeacherBasicInformationPage = (props) => {
    const { teacher, loading, loadingSubmit, createOrUpdateTeacher } = props;

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