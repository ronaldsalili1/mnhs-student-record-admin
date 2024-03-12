import { Modal, Button, Flex, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const GradeUploadModal = ({ ...rest }) => {

    return (
        <Modal
            { ...rest }
            footer={null}
        >
            <Dragger style={{ margin: '20px 0px' }}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    You can only upload one file. It must be an official document generated from this website.
                </p>
            </Dragger>
            <Flex justify="end">
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ minWidth: 80 }}
                >
                    Proceed
                </Button>
            </Flex>
        </Modal>
    );
};

export default GradeUploadModal;