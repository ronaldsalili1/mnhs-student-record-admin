import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

import { NavigationContext } from '../../providers/NavigationProvider';
import AdministratorForm from './components/AdministratorForm';
import useAdministratorDetail from '../../hooks/AdministratorDetailPage/useAdministratorDetail';

const AdministratorDetailPage = () => {
    const layoutState = useContext(NavigationContext);
    const { setBreadcrumbItems, setTitle } = layoutState;

    const { adminId } = useParams();
    const navigate = useNavigate();

    const adminProps = useAdministratorDetail(adminId);
    const { admin } = adminProps;

    useEffect(() => {
        setBreadcrumbItems([
            {
                title: 'Administrators',
                href: '',
                onClick: (e) => {
                    e.preventDefault();
                    navigate('/administrators');
                },
            },
            {
                title: admin ? 'Details' : 'Create',
            },
        ]);

        if (!admin) {
            setTitle('New Administrator');
        } else {
            const { last_name, first_name, middle_name, suffix } = admin || {};
            setTitle(`${last_name}, ${first_name}${suffix ? ', ' + suffix : '' }${middle_name ? ', ' + middle_name : ''}`);
        }

        return () => {
            setTitle(null);
            setBreadcrumbItems([]);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin]);

    return (
        <Flex justify="center">
            <AdministratorForm {...adminProps}/>
        </Flex>
    );
};

export default AdministratorDetailPage;