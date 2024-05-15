import React, { useState } from 'react';
import { buildFormData, buildFormFields } from './formUtils';
import _ from 'lodash/core';
import { FlexBox, Form as StyledForm, Button, FlexBoxColumn, Box, buttonProps } from '../../styled';
import { Heading, headingProps } from '../';
import { cancel } from './formConsts';
import { useMediaQuery } from '../../../hooks';

function Form({formParams: {title, buttonName, fieldsPerRow, inputs}, handleSubmit, handleCancel}) {
    const { isDesktop } = useMediaQuery();
    const [formFields, setFormFields] = useState(inputs);
    const [formData, setFormData] = useState(() => buildFormData(inputs));
    const buttonSize = isDesktop ? buttonProps.size.medium : buttonProps.size.small;

    const handleChangeField = e => {
        const { name, value } = e.target;
        const newFormData = {
            ...formData,
            [name]: value
        };

        setFormData(newFormData);
    };

    const handleSubmitForm = e => {
        e.preventDefault();

        handleSubmit(formData);
    };

    const renderFormFields = (!_.isEmpty(formFields) && !_.isEmpty(formData))
        && buildFormFields(formFields, formData, handleChangeField, fieldsPerRow);

    const renderTitle = title && (
        <FlexBox $m={[5]}>
            <Heading variant={headingProps.variant.success} heading={title} />
        </FlexBox>
    );

    const renderCancel = handleCancel && (
        <Button $size={buttonSize} $m={[5, 3]} onClick={handleCancel}>{cancel}</Button>
    );

    return (
        <Box>
            <FlexBox $center>
                <FlexBoxColumn>
                    {renderTitle}

                    <FlexBox $center>
                        <StyledForm onSubmit={handleSubmitForm}>
                            {renderFormFields}

                            <FlexBox $itemsPerRow={handleCancel ? 1 : 2}>
                                <Button $size={buttonSize} $m={[5, 3]} type="submit">{buttonName}</Button>
                                
                                {renderCancel}
                            </FlexBox>
                        </StyledForm>
                    </FlexBox>
                </FlexBoxColumn>
            </FlexBox>
        </Box>
    );
};

export default Form;