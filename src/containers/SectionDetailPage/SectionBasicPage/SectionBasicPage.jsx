import { Flex } from 'antd';

import SectionForm from './components/SectionForm';

const SectionBasicPage = (props) => {
    return (
        <Flex justify="center">
            <SectionForm {...props}/>
        </Flex>
    );
};

export default SectionBasicPage;