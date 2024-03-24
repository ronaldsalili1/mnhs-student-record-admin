import { Flex } from 'antd';

import TeacherForm from './components/TeacherForm';

const TeacherBasicInformationPage = (props) => {
    return (
        <Flex justify="center">
            <TeacherForm {...props}/>
        </Flex>
    );
};

export default TeacherBasicInformationPage;