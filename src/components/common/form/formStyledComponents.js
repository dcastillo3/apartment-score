import styled from 'styled-components';
import { Box, FlexBoxColumn, TextCaption, Textarea } from '../../styled';

const HiddenFormFieldContainer = styled(FlexBoxColumn)`
    display: none;
`;

const FormTextArea = styled(Textarea)`
    height: ${({theme}) => theme.spacing(20)};
    resize: vertical;
`;

const UploadMessageText = styled(TextCaption)`
    text-align: center;
`;

const FormIconContainer = styled(Box)`
    color: ${({theme}) => theme.palette.secondary.main};
`;

export {
    HiddenFormFieldContainer,
    FormTextArea,
    UploadMessageText,
    FormIconContainer
};