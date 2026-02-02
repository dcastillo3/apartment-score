import React, { useContext, useRef, useState } from 'react';
import { Button, FlexBox, FlexBoxColumn, buttonProps, cardProps } from '../styled';
import { useMediaQuery } from '../../hooks';
import { DataManagementContainer, DataManagementButtonContainer, HiddenFileInput } from './dataManagementStyledComponents';
import { dataManagementHeading, exportButtonLabel, importButtonLabel, importingButtonLabel, importErrorMessage, fileInputType, jsonFileAccept, successExportMessage, successImportMessage, errorImportMessage } from './dataManagementConsts';
import { exportData, importData } from './dataManagementUtils';
import { ApartmentContext, SettingsContext } from 'context';
import { Heading, headingProps, Notification } from '../common';
import { notificationProps } from '../common/notification/notificationConsts';

// TODO: Add functionality to update user profile data (firstName, lastName, userName)
// and change password for email/password authenticated users

function DataManagement() {
    const { apartments, handleImportApartments } = useContext(ApartmentContext);
    const { scoreSettings, noteSettings, handleUpdateSettings } = useContext(SettingsContext);
    const { isDesktop } = useMediaQuery();
    const [isImporting, setIsImporting] = useState(false);
    const [notification, setNotification] = useState(false);
    const fileInputRef = useRef(null);
    
    const dataManagementContainerPadding = isDesktop ? [5, 8] : [2];
    const buttonSize = isDesktop ? buttonProps.size.medium : buttonProps.size.small;
    const headingMargin = isDesktop ? [0, 8] : [0, 5];
    const importLabel = isImporting ? importingButtonLabel : importButtonLabel;

    const handleHideNotification = () => {
        setNotification(false);
    };

    const handleExport = () => {
        const successExportNotification = {
            message: successExportMessage,
            variant: notificationProps.variant.success
        };

        exportData(apartments, scoreSettings, noteSettings);

        setNotification(successExportNotification);
    };

    const handleImport = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];

        if (file) {
            setIsImporting(true);

            try {
                await importData(
                    file,
                    handleImportApartments,
                    handleUpdateSettings
                );

                const successImportNotification = {
                    message: successImportMessage,
                    variant: notificationProps.variant.success
                };

                setNotification(successImportNotification);
            } catch (error) {
                const errorImportNotification = {
                    message: errorImportMessage,
                    variant: notificationProps.variant.error
                };

                console.error(importErrorMessage, error);

                setNotification(errorImportNotification);
            } finally {
                setIsImporting(false);
            }
        }
    };

    const renderNotification = notification && (
        <Notification
            message={notification.message}
            variant={notification.variant}
            handleHideNotifiction={handleHideNotification}
        />
    );

    return (
        <FlexBoxColumn>
            {renderNotification}
            
            <FlexBox $m={headingMargin} $center>
                <Heading variant={headingProps.variant.success} heading={dataManagementHeading} />
            </FlexBox>
            
            <FlexBox $center>
                <DataManagementContainer $variant={cardProps.variant.backgroundLight} $p={dataManagementContainerPadding}>
                    <DataManagementButtonContainer>
                        <Button 
                            $variant={buttonProps.variant.primary}
                            $size={buttonSize}
                            $m={[5, 3]}
                            onClick={handleExport}
                        >
                            {exportButtonLabel}
                        </Button>
                        
                        <Button 
                            $variant={buttonProps.variant.secondary}
                            $size={buttonSize}
                            $m={[5, 3]}
                            onClick={handleImport}
                            disabled={isImporting}
                        >
                            {importLabel}
                        </Button>
                    </DataManagementButtonContainer>
                </DataManagementContainer>
            </FlexBox>
            
            <HiddenFileInput
                ref={fileInputRef}
                type={fileInputType}
                accept={jsonFileAccept}
                onChange={handleFileChange}
            />
        </FlexBoxColumn>
    );
};

export default DataManagement;