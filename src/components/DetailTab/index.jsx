import { Flex, Tabs } from 'antd';

const DetailTab = ({ items, activeKey, onTabClick }) => {
    const styledItems = items.map(item => {
        return ({
            ...item,
            children: (
                <Flex justify="center">
                    {item.children}
                </Flex>
            ),
        });
    });

    return (
        <Tabs
            activeKey={activeKey}
            tabPosition="right"
            items={styledItems}
            onTabClick={onTabClick}
            style={{ width: '100%' }}
        />
    );
};

export default DetailTab;