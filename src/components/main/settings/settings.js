import React, { useContext, useState } from 'react';
import { useMediaQuery } from '../../../hooks';
import { cardProps } from '../../styled';
import { SettingsContainer } from './settingStyledComponents';
import { Form, Notification } from '../../common';
import { updatePriorityRatings } from './settingForms';
import { notificationProps } from 'components/common/notification/notificationConsts';
import { successUpdateMessage, successUpdateNotificationLength } from './settingConsts';
import { fillUpdateSettingsForm, formatSettingsData } from './settingUtils';
import { ApartmentContext, SettingsContext } from 'context';
import _ from 'lodash';

function Settings() {
    const { handleUpdateAllApartments } = useContext(ApartmentContext);
    const { settings, handleUpdateSettings } = useContext(SettingsContext);
    const [successNotification, setSuccessNotification] = useState(false);
    const filledUpdateSettingsForm = !_.isEmpty(settings) ? fillUpdateSettingsForm(settings, updatePriorityRatings) : updatePriorityRatings;
    const { isDesktop } = useMediaQuery();
    const settingsContainerPadding = isDesktop ? [5, 8] : [2];
    
    const handleHideNotifiction = () => {
        setSuccessNotification(false);
    };

    const handleSubmitUpdateSettings = settingsData => {
        const formattedSettingsData = formatSettingsData(settingsData);

        handleUpdateSettings(formattedSettingsData);

        handleUpdateAllApartments(formattedSettingsData);

        setSuccessNotification(true);
    };

    const renderSuccessNotification = successNotification && (
        <Notification
            message={successUpdateMessage}
            variant={notificationProps.variant.success}
            handleHideNotifiction={handleHideNotifiction}
            notificationLength={successUpdateNotificationLength}
        />
    );

    return (
        <SettingsContainer $variant={cardProps.variant.background} $p={settingsContainerPadding}>
            {renderSuccessNotification}
            
            <Form
                formParams={filledUpdateSettingsForm}
                handleSubmit={handleSubmitUpdateSettings}
            />
        </SettingsContainer>
    );
};

export default Settings;