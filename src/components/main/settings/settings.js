import React, { useContext, useState } from 'react';
import { useMediaQuery } from '../../../hooks';
import { cardProps } from '../../styled';
import { SettingsContainer } from './settingStyledComponents';
import { Form, Notification } from '../../common';
import { DataManagement } from '../../dataManagement';
import { updatePriorityRatingsForm } from './settingForms';
import { notificationProps } from 'components/common/notification/notificationConsts';
import { successUpdateMessage } from './settingConsts';
import { fillUpdatePriorityRatingsForm, formatSettingsData, generateFormKey } from './settingUtils';
import { ApartmentContext, SettingsContext } from 'context';
import _ from 'lodash';

function Settings() {
    const { handleUpdateAllApartments } = useContext(ApartmentContext);
    const { scoreSettings, noteSettings, handleUpdateScoreSettings, handleUpdateNoteSettings } = useContext(SettingsContext);
    const [successNotification, setSuccessNotification] = useState(false);
    const { isDesktop } = useMediaQuery();
    
    const filledUpdatePriorityRatingsForm = (!_.isEmpty(scoreSettings) || !_.isEmpty(noteSettings)) ? fillUpdatePriorityRatingsForm(scoreSettings, noteSettings, updatePriorityRatingsForm) : updatePriorityRatingsForm;
    const settingsContainerPadding = isDesktop ? [5, 8] : [2];
    // Creates a unique key from settings data to tell React when to refresh the form
    // When settings change (from import or context update), the key changes and Form remounts with new values
    const formKey = generateFormKey(scoreSettings, noteSettings);
    
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
        />
    );

    return (
        <SettingsContainer $variant={cardProps.variant.background} $p={settingsContainerPadding}>
            {renderSuccessNotification}
            
            <DataManagement />
            
            <Form
                key={formKey}
                formParams={filledUpdatePriorityRatingsForm}
                handleSubmit={handleSubmitUpdateSettings}
            />
        </SettingsContainer>
    );
};

export default Settings;