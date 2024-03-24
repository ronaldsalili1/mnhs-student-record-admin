import { Flex } from 'antd';

import SubjectForm from './components/SubjectForm';

const SubjectBasicPage = (props) => {
    return (
        <Flex justify="center">
            <SubjectForm {...props}/>
        </Flex>
    );
};

export default SubjectBasicPage;