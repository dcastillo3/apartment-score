import React, { useState } from 'react';
import { buildFormData, buildFormFields } from './formUtils';
import _ from 'lodash/core';
import { FlexBox, Form as StyledForm, Button, Card, FlexBoxColumn, cardProps } from '../../styled';
import { Heading, headingProps } from '../';
import { cancel } from './formConsts';

function Form({formParams: {title, buttonName, fieldsPerRow, inputs}, handleSubmit, handleCancel}) {
    const [formFields, setFormFields] = useState(inputs);
    const [formData, setFormData] = useState(() => buildFormData(inputs));

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
        <Button $m={[5, 3]} onClick={handleCancel}>{cancel}</Button>
    );

    return (
        <Card $variant={cardProps.variant.backgroundLight}>
            <FlexBox $center>
                <FlexBoxColumn>
                    {renderTitle}

                    <FlexBox $center>
                        <StyledForm onSubmit={handleSubmitForm}>
                            {renderFormFields}

                            <FlexBox $itemsPerRow={handleCancel ? 1 : 2}>
                                <Button $m={[5, 3]} type="submit">{buttonName}</Button>
                                
                                {renderCancel}
                            </FlexBox>
                        </StyledForm>
                    </FlexBox>
                </FlexBoxColumn>
            </FlexBox>
        </Card>
    );
};

export default Form;