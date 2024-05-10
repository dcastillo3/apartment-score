import styled from 'styled-components';
import { Card } from './box';
import { typographyProps } from '../styledConsts';
import { buildTypography } from '../styledUtils';

export const Form = styled.form`
`;

export const Label = styled.label`
    ${(props) => buildTypography(props, typographyProps.label)}
`;

export const Input = styled.input`
    border-radius: ${({theme}) => theme.spacing(1)};
    border: solid 1px ${({theme}) => theme.palette.info.main};

    ${(props) => buildTypography(props, typographyProps.body2)}
`;

export const Textarea = styled.textarea`
    border-radius: ${({theme}) => theme.spacing(1)};
    border: solid 1px ${({theme}) => theme.palette.info.main};

    ${(props) => buildTypography(props, typographyProps.body2)}
`;

export const Select = styled.select`
    border-radius: ${({theme}) => theme.spacing(1)};
    border: solid 1px ${({theme}) => theme.palette.info.main};

    ${(props) => buildTypography(props, typographyProps.body2)}
`;

export const Option = styled.option`
`;

export const DragAndDrop = styled(Card)`
    border-radius: ${({theme}) => theme.spacing(1)};
    border: dashed 1px ${({theme}) => theme.palette.info.main};
    cursor: pointer;
`;