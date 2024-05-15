import React from 'react';
import { ClickAwayListener } from '@mui/material';
import { Button, buttonProps } from '../../styled';
import { ModalBackDrop, ModalComponentContainer, ModalComponentScrollContainer, ModalContainer, ModalExitIcon, ModalExitIconContainer } from './modalStyledComponents';
import { useMediaQuery } from '../../../hooks';
import { useEffect } from 'react';
import { toggleBodyScrollBar } from './modalUtils';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Modal({children, variant, showModal, handleToggleModal}) {
    const { isMobile } = useMediaQuery();

    const renderModal = showModal && (
        <ModalBackDrop $center={true}>
            <ClickAwayListener onClickAway={handleToggleModal}>
                <ModalComponentContainer $variant={variant} $isMobile={isMobile}>
                    <ModalComponentScrollContainer>
                        <ModalExitIconContainer $isMobile={isMobile} $m={[4, 6]}>
                            <Button $variant={buttonProps.variant.secondary} $size={buttonProps.size.small} onClick={handleToggleModal}>
                                <ModalExitIcon component={ArrowBackIcon} />
                            </Button>
                        </ModalExitIconContainer>

                        {children}
                    </ModalComponentScrollContainer>
                </ModalComponentContainer>
            </ClickAwayListener>
        </ModalBackDrop>
    );

    useEffect(() => {
        toggleBodyScrollBar(showModal);
    }, [showModal]);

    return (
        <ModalContainer>
            {renderModal}
        </ModalContainer>
    );
};

export default Modal;