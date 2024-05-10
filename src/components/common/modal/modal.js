import React from 'react';
import { ClickAwayListener } from '@mui/material';
import { Button, buttonProps } from '../../styled';
import { ModalBackDrop, ModalComponentContainer, ModalComponentScrollContainer, ModalContainer, ModalExitIcon, ModalExitIconContainer } from './modalStyledComponents';
import { useMediaQuery } from '../../../hooks';
import { useEffect } from 'react';
import { toggleBodyScrollBar } from './modalUtils';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function Modal({children, modalComponent, variant, buttonVariant, showModal, handleToggleModal}) {
    const { isMobile } = useMediaQuery();

    const renderModal = showModal && (
        <ModalBackDrop $center={true}>
            <ClickAwayListener onClickAway={handleToggleModal}>
                <ModalComponentContainer $variant={variant} $isMobile={isMobile}>
                    <ModalComponentScrollContainer>
                        <ModalExitIconContainer $isMobile={isMobile} $m={[4, 6]}>
                            <Button $size={buttonProps.size.small} onClick={handleToggleModal}>
                                <ModalExitIcon component={CloseOutlinedIcon} />
                            </Button>
                        </ModalExitIconContainer>

                        {modalComponent()}
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
            <Button $variant={buttonVariant} onClick={handleToggleModal}>
                {children}
            </Button>
            
            {renderModal}
        </ModalContainer>
    );
};

export default Modal;