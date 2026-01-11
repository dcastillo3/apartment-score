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

    // Adjust the font size of the nested SVG
    & svg {
        font-size: ${({theme}) => theme.typography.body2.fontSize};
    }
`;

export {
    HiddenFormFieldContainer,
    FormTextArea,
    UploadMessageText,
    FormIconContainer
};