import { useContext } from 'react';
import { Modal, Flex, Button, Grid, Typography } from 'antd';

import { formatSemester } from '../../../../helpers/semester';
import { AuthContext } from '../../../../providers/AuthProvider';

const StudentConfirmationModal = ({ subject, loadingSubmit, onConfirm, ...rest }) => {
    const { xs } = Grid.useBreakpoint();
    const { activeSemester } = useContext(AuthContext);

    return (
        <Modal
            { ...rest }
            footer={null}
        >
            <Typography.Text>
                Are you sure you want to add the selected students to section {subject?.name || ''}{activeSemester ? ` for ${formatSemester(activeSemester)}` : ''}?
            </Typography.Text>
            <Flex
                justify="end"
                style={{ marginTop: 20 }}
            >
                <Button
                    loading={loadingSubmit}
                    type="primary"
                    style={{ ...(xs && { width: '100%' }) }}
                    onClick={onConfirm}
                >
                    Confirm
                </Button>
            </Flex>
        </Modal>
    );
};

export default StudentConfirmationModal;