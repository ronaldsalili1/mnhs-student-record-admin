import { Input, Skeleton } from 'antd';

const InputUI = ({ loading, ...rest }) => {
    if (loading) {
        return (
            <div className="skeleton-input-ui">
                <Skeleton.Input
                    active
                    style={{ width: '100%' }}
                />
            </div>
        );
    }
    return (
        <Input {...rest}/>
    );
};

export default InputUI;