import { DatePicker, Skeleton } from 'antd';

const SkeletonDatePicker = ({ loading, ...rest }) => {
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
        <DatePicker {...rest}/>
    );
};

export default SkeletonDatePicker;