import styled from 'styled-components';
import { Box, Card, FlexBox, FlexBoxColumn } from '../../styled';
import { Icon } from '@mui/material';

const ModalContainer = styled(Box)`
    position: relative;
`;

const ModalBackDrop = styled(FlexBox)`
    position: fixed;
    z-index: ${({theme}) => theme.zIndex.modal};
    background: ${({theme}) => `${theme.palette.info.main}7a`};
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`;

const ModalComponentContainer = styled(Card)`
    position: relative;
    display: flex;
    width: ${({$isMobile}) => $isMobile ? '100%' : '80vw'};
    height: ${({$isMobile}) => $isMobile ? '100%' : '70vh'};
    ${({theme, $isMobile}) => !$isMobile && `border-radius: ${theme.spacing(1)}`}
`;

const ModalComponentScrollContainer = styled(FlexBoxColumn)`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`;

const ModalExitIconContainer = styled(FlexBox)`
`;

const ModalExitIcon = styled(Icon)`
    position: relative;
    top: 3px;
    font-size: ${({theme}) => theme.typography.caption.fontSize} !important;
`;

export {
    ModalContainer,
    ModalBackDrop,
    ModalComponentContainer,
    ModalComponentScrollContainer,
    ModalExitIconContainer,
    ModalExitIcon
};