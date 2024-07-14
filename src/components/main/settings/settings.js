import React, { useContext, useState } from 'react';
import { useMediaQuery } from '../../../hooks';
import { cardProps } from '../../styled';
import { SettingsContainer } from './settingStyledComponents';
import { Form, Notification } from '../../common';
import { updatePriorityRatingsForm } from './settingForms';
import { notificationProps } from 'components/common/notification/notificationConsts';
import { successUpdateMessage, successUpdateNotificationLength } from './settingConsts';
import { fillUpdatePriorityRatingsForm, formatSettingsData } from './settingUtils';
import { ApartmentContext, SettingsContext } from 'context';
import _ from 'lodash';

function Settings() {
    const { handleUpdateAllApartments } = useContext(ApartmentContext);
    const { scoreSettings, noteSettings, handleUpdateScoreSettings, handleUpdateNoteSettings } = useContext(SettingsContext);
    const [successNotification, setSuccessNotification] = useState(false);
    const { isDesktop } = useMediaQuery();
    
    const filledUpdatePriorityRatingsForm = (!_.isEmpty(scoreSettings) || !_.isEmpty(noteSettings)) ? fillUpdatePriorityRatingsForm(scoreSettings, noteSettings, updatePriorityRatingsForm) : updatePriorityRatingsForm;
    const settingsContainerPadding = isDesktop ? [5, 8] : [2];
    
    const handleHideNotifiction = () => {
        setSuccessNotification(false);
    };

    const handleSubmitUpdateSettings = settingsData => {
        const { 
            noteSettings: newNoteSettings, 
            scoreSettings: newScoreSettings 
        } = formatSettingsData(settingsData);

        handleUpdateScoreSettings(newScoreSettings);

        handleUpdateNoteSettings(newNoteSettings);

        handleUpdateAllApartments(newScoreSettings);

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
                formParams={filledUpdatePriorityRatingsForm}
                handleSubmit={handleSubmitUpdateSettings}
            />
        </SettingsContainer>
    );
};

export default Settings;