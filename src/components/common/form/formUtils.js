import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import _ from 'lodash/core';
import { Box, Card, DragAndDrop, FlexBox, FlexBoxColumn, Input, Label, Option, Select, Text, TextSmall, cardProps } from '../../styled';
import { uploadMessage } from './formConsts';
import { FormIconContainer, FormTextArea, HiddenFormFieldContainer, UploadMessageText } from './formStyledComponents';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Icon, Tooltip } from '@mui/material';

const buildFormData = inputs => {
    const formData = inputs.reduce((prevInputs, input) => {
        if(input.inputType === 'group') return { ...prevInputs, ...buildFormData(input.inputs) };
        
        return { ...prevInputs, [input.id]: input.defaultValue };
    }, {});

    return formData;
};

const buildFormFields = (formFields, formData, handleChangeField, fieldsPerRow) => {
    const renderedFormFields = [];
    let fieldsPerCurrRow = fieldsPerRow;
    let inputStack = [];
    let idx = 0;
    const addFormRow = () => {
        const formRow = (
            <FlexBox $itemsPerRow={fieldsPerRow} key={idx}>
                {inputStack}
            </FlexBox>
        );

        inputStack = [];
        fieldsPerCurrRow = fieldsPerRow;
        renderedFormFields.push(formRow);
    };

    while (idx < formFields.length) {
        const formField = formFields[idx];
        const { inputType, fullRow } = formField;

        //Maintain fields per row display when a field is hidden
        if(inputType === 'hidden') fieldsPerCurrRow += 1;
        //Display full row fields as entire row
        if(fullRow) {
            //If row has fields, push row
            if(inputStack.length) addFormRow();
            
            //Add textarea field to own row
            fieldsPerCurrRow = 1;
        };
        
        const input = buildInput(formField, formData, handleChangeField);

        inputStack.push(input);

        const rowIsFull = inputStack.length === fieldsPerCurrRow;
        const lastFormField = (idx === (formFields.length - 1));
        
        idx += 1;

        if(rowIsFull || lastFormField) addFormRow();
    };

    return renderedFormFields;
};

const buildInput = (formField, formData, handleChangeField) => {
    const { 
        id, 
        labelName, 
        inputType,
        additionalProps,
        validations,
        tooltip,
        options
    } = formField;
    const inputValue = formData[id];
    // TO-DO: Build tooltip into switch statement options

    switch(inputType) {
        case 'group': {
            const { inputs } = formField;
            const renderedGroup = inputs.map(input => buildInput(input, formData, handleChangeField));

            return (
                <Card $variant={cardProps.variant.backgroundLight} $m={[1]} key={id} $wrap={true}>
                    {renderedGroup}
                </Card>
            );
        };
        case 'text': {
            const renderTooltip = tooltip && (
                <Tooltip title={tooltip} placement="right" arrow>
                    <FormIconContainer $p={[0, 1]}>
                        <Icon component={InfoOutlinedIcon} />
                    </FormIconContainer>
                </Tooltip>
            );
            
            return (
                <FlexBoxColumn $m={[3]} key={id} $wrap={true}>
                    <FlexBox>
                        <Label>{labelName}</Label>

                        {renderTooltip}
                    </FlexBox>

                    <Input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            );
        };

        case 'number': {
            const renderTooltip = tooltip && (
                <Tooltip title={tooltip} placement="right" arrow>
                    <FormIconContainer $p={[0, 1]}>
                        <Icon component={InfoOutlinedIcon} />
                    </FormIconContainer>
                </Tooltip>
            );
            
            return (
                <FlexBoxColumn $m={[3]} key={id} $wrap={true}>
                    <FlexBox>
                        <Label>{labelName}</Label>

                        {renderTooltip}
                    </FlexBox>

                    <Input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            );
        };

        case 'email': {
            const renderTooltip = tooltip && (
                <Tooltip title={tooltip} placement="right" arrow>
                    <FormIconContainer $p={[0, 1]}>
                        <Icon component={InfoOutlinedIcon} />
                    </FormIconContainer>
                </Tooltip>
            );
            
            return (
                <FlexBoxColumn $m={[3]} key={id} $wrap={true}>
                    <FlexBox>
                        <Label>{labelName}</Label>

                        {renderTooltip}
                    </FlexBox>

                    <Input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            );
        };

        case 'password': {
            const renderTooltip = tooltip && (
                <Tooltip title={tooltip} placement="right" arrow>
                    <FormIconContainer $p={[0, 1]}>
                        <Icon component={InfoOutlinedIcon} />
                    </FormIconContainer>
                </Tooltip>
            );
            
            return (
                <FlexBoxColumn $m={[3]} key={id} $wrap={true}>
                    <FlexBox>
                        <Label>{labelName}</Label>

                        {renderTooltip}
                    </FlexBox>

                    <Input onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            );
        };

        case 'textarea': {
            const renderTooltip = tooltip && (
                <Tooltip title={tooltip} placement="right" arrow>
                    <FormIconContainer $p={[0, 1]}>
                        <Icon component={InfoOutlinedIcon} />
                    </FormIconContainer>
                </Tooltip>
            );

            return (
                <FlexBoxColumn $m={[3]} key={id} $wrap={true}>
                    <FlexBox>
                        <Label>{labelName}</Label>

                        {renderTooltip}
                    </FlexBox>
                    
                    <FormTextArea onChange={handleChangeField} value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </FlexBoxColumn>
            );
        };

        case 'select': {
            const renderTooltip = tooltip && (
                <Tooltip title={tooltip} placement="right" arrow>
                    <FormIconContainer $p={[0, 1]}>
                        <Icon component={InfoOutlinedIcon} />
                    </FormIconContainer>
                </Tooltip>
            );
            
            return (
                <FlexBoxColumn $m={[3]} key={id} $wrap={true}>
                    <FlexBox>
                        <Label>{labelName}</Label>

                        {renderTooltip}
                    </FlexBox>
                    
                    <Select onChange={handleChangeField} value={inputValue} id={id} name={id} {...additionalProps}>
                        {options.map(option => (
                            <Option key={option.value} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </FlexBoxColumn>
            );
        };

        case 'hidden': {
            return (
                <HiddenFormFieldContainer $m={[3]} key={id}>
                    <Label>{labelName}</Label>
                    <Input value={inputValue} type={inputType} id={id} name={id} {...additionalProps} />
                </HiddenFormFieldContainer>
            );
        };
        
        case 'upload': {
            //format data for handleChangeField
            const onDrop = useCallback(acceptedFiles => {
                const mockEvent = {
                    target: {
                        name: id,
                        value: acceptedFiles
                    }
                };

                return handleChangeField(mockEvent);
            });
            const validationProps = getValidationProps(validations);
            const dropZoneParams = {
                onDrop,
                ...validationProps
            };
            const {
                fileRejections,
                getRootProps,
                getInputProps
            } = useDropzone(dropZoneParams);
            const rootProps = getRootProps();
            const inputProps = getInputProps();

            const renderUploadContainer = (
                <DragAndDrop $p={[5]} hover $variant={cardProps.variant.backgroundLight} {...rootProps}>
                    <Input {...inputProps} {...additionalProps} />
                    <UploadMessageText>
                        {uploadMessage}
                    </UploadMessageText>
                </DragAndDrop>
            );

            const renderUploadItems = !_.isEmpty(inputValue) && inputValue.map(file => (
                <Box $m={[1, 0]} $p={[1, 2]} key={file.name}>
                    <Text $truncate={true}>
                        {file.name}
                    </Text>
                </Box>
            ));

            const renderUploadPreview = !_.isEmpty(inputValue) && (
                <Card $m={[2]} $variant={cardProps.variant.success}>
                    <FlexBoxColumn>
                        {renderUploadItems}
                    </FlexBoxColumn>
                </Card>
            );

            const renderUploadErrors = !_.isEmpty(fileRejections) && fileRejections.map(({ file, errors }) => {
                const errorMessages = errors.map(e => (
                    <Box $m={[1, 0]} $p={[1, 2]} key={e.code}>
                        <TextSmall $truncate={true}>
                            {e.message}
                        </TextSmall>
                    </Box>
                ));

                return (
                    <Card $m={[2]} $variant={cardProps.variant.warning}>
                        <FlexBoxColumn key={file.path}>
                            <Box $m={[1, 0]} $p={[1, 2]}>
                                {file.path}
                            </Box>

                            <FlexBoxColumn>
                                {errorMessages}
                            </FlexBoxColumn>
                        </FlexBoxColumn>
                    </Card>
                );
            });

            return (
                <FlexBoxColumn $m={[3]} key={id}>
                    <Label>{labelName}</Label>
                    {renderUploadContainer}

                    {renderUploadPreview}

                    {renderUploadErrors}
                </FlexBoxColumn>
            );
        };
    };
};

const buildSelectOptionsFromRange = ({ min, max }) => {
    const selectOptions = [];

    for(let i = min; i <= max; i++) {
        const label = i.toString();
        const value = i;
        const selectOption = {
            label,
            value
        };

        selectOptions.push(selectOption);
    };

    return selectOptions;
};

// TO-DO: buildSelectOptionsFromArr

const getValidationProps = validations => {
    let validationProps = {};

    //Attach file type validation
    if(validations?.fileTypes?.length) {
        validations.fileTypes.forEach(validation => {
            validationProps.accept = {
                [validation]: [],
                ...validationProps.accept
            };
        });
    };

    //Attach max files validation
    if(validations?.maxFiles) {
        const { maxFiles } = validations;
        
        validationProps = {maxFiles, ...validationProps}
    };

    return validationProps;
};

export {
    buildFormData,
    buildFormFields,
    buildSelectOptionsFromRange
};