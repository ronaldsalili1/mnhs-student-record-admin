import { useParams } from 'react-router-dom';
import { Flex } from 'antd';

import StudentShsEligibilityForm from './components/StudentShsEligibilityForm';
import useStudentShsEligibility from '../../../hooks/StudentDetailPage/useStudentShsEligibility';

const StudentShsEligibilityPage = () => {
    const { studentId } = useParams();
    const studentShsEligibilityProps = useStudentShsEligibility(studentId);

    return (
        <Flex justify="center">
            <StudentShsEligibilityForm {...studentShsEligibilityProps}/>
        </Flex>
    );
};

export default StudentShsEligibilityPage;