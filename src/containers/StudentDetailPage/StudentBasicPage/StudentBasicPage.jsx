import { Flex } from 'antd';

import StudentForm from './components/StudentForm';

const StudentBasicPage = (props) => {
    return (
        <Flex justify="center">
            <StudentForm {...props}/>
        </Flex>
    );
};

export default StudentBasicPage;