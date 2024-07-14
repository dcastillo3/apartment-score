import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, FlexBox, Input, Option, Select, buttonProps, cardProps, Form as StyledForm } from '../../styled';
import { useMediaQuery } from '../../../hooks';
import { ApartmentsFilterContainer, ApartmentsContainer, ApartmentsFilterContainerRight, ApartmentsFilterContainerLeft, ApartmentsMobileAddButtonContainer, ApartmentsMobileAddButtonIconContainer } from './apartmentStyledComponents';
import { categories, initialStates, orders } from '../../../utils/consts';
import { ApartmentList } from '../../apartmentList';
import { addApartmentForm } from './apartmentForms';
import { BarChart, Form, Heading, Modal, headingProps, modalProps } from '../../common';
import { apartmentListHeading, buttonNames, scrollOptions, searchPlaceholder, searchUrlQueryParam, transitionendEventName } from './apartmentConsts';
import { ApartmentContext, SettingsContext } from 'context';
import { buildCategoryLabel } from 'utils/reactUtils';
import { fillAddApartmentForm, filterApartmentsByQuery, formatApartmentsChartData } from './apartmentUtils';
import { barChartProps } from 'components/common/barChart/barChartConsts';
import _ from 'lodash';
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed';
import { useNavigate, useLocation } from 'react-router-dom';
import AddHomeIcon from '@mui/icons-material/AddHome';
import { Icon } from '@mui/material';

function Apartment() {
    const { 
        apartments, 
        handleAddApartment, 
        handleDeleteApartment, 
        handleUpdateApartment,
        handleSortApartments 
    } = useContext(ApartmentContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [sortCategory, setSortCategory] = useState(initialStates.sortCategory);
    const [order, setOrder] = useState(initialStates.order);
    const [triggerSort, setTriggerSort] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [scrollToId, setScrollToId] = useState(null);
    const [highlightId, setHighlightId] = useState(null);
    const [search, setSearch] = useState(initialStates.search);
    const { scoreSettings, noteSettings } = useContext(SettingsContext);
    const apartmentListRef = useRef({});
    const { isDesktop } = useMediaQuery();

    const filteredApartments = filterApartmentsByQuery(apartments, search);
    const { apartmentChartData, apartmentChartRange } = formatApartmentsChartData(filteredApartments);
    const filledAddApartmentForm = !_.isEmpty(noteSettings) ? fillAddApartmentForm(noteSettings, addApartmentForm) : addApartmentForm;
    const apartmentContainerPadding = isDesktop ? [5, 8] : [2];
    const apartmentButtonHeaderContainerPadding = isDesktop ? [5, 0] : [2];
    const headingMargin = isDesktop ? [0, 8] : [0, 5];

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const addApartment = apartment => {
        handleAddApartment(apartment, scoreSettings);

        toggleModal();

        setTriggerSort(true);
    };

    const updateApartment = (id, apartment) => {
        handleUpdateApartment(id, apartment, scoreSettings);

        setTriggerSort(true);
    };

    const deleteApartment = id => {
        handleDeleteApartment(id);

        setTriggerSort(true);
    };

    const handleChangeOrder = e => {
        const { value: newOrder } = e.target;

        setOrder(newOrder);

        setTriggerSort(true);
    };

    const handleChangeSortCategory = e => {
        const { value: newSortCategory } = e.target;

        setSortCategory(newSortCategory);

        setTriggerSort(true);
    };

    const handleChangeSearch = e => {
        const { value: newSearch } = e.target;

        setSearch(newSearch);

        setTriggerSort(true);
    };

    const handleSubmitSearch = e => {
        e.preventDefault();

        const urlQueryParam = `${searchUrlQueryParam}${search}`;

        navigate(urlQueryParam);
    };
    
    const handleBarClick = bar => {
        const { id } = bar;
        
        setScrollToId(id);
    };

    // Scroll to apartment after specified changes
    useEffect(() => {
        let handleTransitionEnd;

        if (scrollToId !== null && !_.isEmpty(apartmentListRef?.current?.[scrollToId])) {
            const currApartmentElem = apartmentListRef.current[scrollToId].current;
            // Scroll to the apartment in the list
            const scrollAction = async () => {
                await smoothScrollIntoView(currApartmentElem, scrollOptions);
                // Highlight the apartment after the scroll is finished
                setHighlightId(scrollToId);
    
                handleTransitionEnd = () => {
                    // Remove the highlight when the transition has ended
                    setHighlightId(null);
                    
                    // Remove the event listener
                    currApartmentElem.removeEventListener(transitionendEventName, handleTransitionEnd);
                };
                
                // Listen for the transitionend event
                currApartmentElem.addEventListener(transitionendEventName, handleTransitionEnd);
            };
            
            scrollAction();
    
            setScrollToId(null);
        };
    
        // Cleanup function
        return () => {
            if (handleTransitionEnd) {
                const currApartmentElem = apartmentListRef.current[scrollToId]?.current;
                if (currApartmentElem) {
                    currApartmentElem.removeEventListener('transitionend', handleTransitionEnd);
                };
            };
        };
    }, [scrollToId]);

    // Sort apartments after specified changes
    useEffect(() => {
        if(!triggerSort) return;

        handleSortApartments(sortCategory, order);

        setTriggerSort(false);
    }, [triggerSort]);

    // Read search query params from URL
    useEffect(() => {
        if(!location.search) return;

        const searchParams = new URLSearchParams(location.search);
        const searchQuery = searchParams.get('search');

        setSearch(searchQuery);
    }, []);
    

    const renderApartmentList = filteredApartments.length > 0 && (
        <Box $p={[6, 0, 0, 0]} >
            <ApartmentList
                ref={apartmentListRef} 
                apartments={filteredApartments}
                highlightId={highlightId} 
                handleDeleteApartment={deleteApartment}
                handleUpdateApartment={updateApartment}
            />
        </Box>
    );

    const renderApartmentsHeader = filteredApartments.length > 0 && (
        <Box $m={headingMargin}>
            <Heading
                variant={headingProps.variant.success}
                heading={apartmentListHeading}
            />
        </Box>
    );

    const renderApartmentsSortMenuNonScoreCategories = categories.sortableNonScoreCategories.map(category => {
        const categoryLabel = buildCategoryLabel(category);

        return (
            <Option key={category} value={category}>{categoryLabel}</Option>
        );
    });

    const renderApartmentsSortMenuScoreCategories = categories.scoreCategories.map(category => {
        const categoryLabel = buildCategoryLabel(category);

        return (
            <Option key={category} value={category}>{categoryLabel}</Option>
        );
    });

    const renderApartmentsSortMenuOrderOptions = Object.values(orders).map(order => (
        <Option key={order} value={order}>{order}</Option>
    ));

    const renderApartmentsBarChart = filteredApartments.length > 0 && isDesktop && (
        <BarChart
            type={barChartProps.type.bar}
            barDirection={barChartProps.barDirection.vertical}
            data={apartmentChartData}
            range={apartmentChartRange}
            handleBarClick={handleBarClick}
        />
    );

    // TO-DO: Refactor to separate component
    const renderApartmentsSortMenu = filteredApartments.length > 0 && (
        <FlexBox $center>
            <Box $m={[0, 1, 0, 0]}>
                <Select onChange={handleChangeSortCategory} value={sortCategory}>
                    {renderApartmentsSortMenuNonScoreCategories}
                    {renderApartmentsSortMenuScoreCategories}
                </Select>
            </Box>

            <Box $m={[0, 0, 0, 1]}>
                <Select onChange={handleChangeOrder} value={order}>
                    {renderApartmentsSortMenuOrderOptions}
                </Select>
            </Box>
        </FlexBox>
    );

    const renderApartmentsSearch = filteredApartments.length > 0 && (
        <Box $m={[0, 0, 0, 2]}>
            <StyledForm onSubmit={handleSubmitSearch}>
                <Input onChange={handleChangeSearch} value={search} placeholder={searchPlaceholder} />
            </StyledForm>
        </Box>
    );

    const renderAddApartmentButton = isDesktop && (
        <Button $size={buttonProps.size.small} $m={[0, 0, 0, 2]} onClick={toggleModal}>
            {buttonNames.add}
        </Button>
    );

    const renderMobileAddApartmentButton = !isDesktop && (
        <ApartmentsMobileAddButtonContainer>
            <Button $size={buttonProps.size.small} $p={[2, 4]} onClick={toggleModal}>
                <ApartmentsMobileAddButtonIconContainer>
                    <Icon component={AddHomeIcon} />
                </ApartmentsMobileAddButtonIconContainer>
            </Button>
        </ApartmentsMobileAddButtonContainer>
    );

    // TO-DO: Build head to head comparison chart. Use AI to output conclusive statements based on data
    // TO-DO: Build feature to select winning apartment. This apartment will be used to compare against other apartments and always be sorted first.
    return (
        <ApartmentsContainer $variant={cardProps.variant.background} $p={apartmentContainerPadding}>
            {renderApartmentsHeader}

            <ApartmentsFilterContainer $hasApartments={filteredApartments.length > 0} $p={apartmentButtonHeaderContainerPadding}>
                <ApartmentsFilterContainerLeft>
                    {renderApartmentsSortMenu}
                </ApartmentsFilterContainerLeft>

                <ApartmentsFilterContainerRight>
                    {renderApartmentsSearch}

                    <Modal
                        showModal={showModal}
                        variant={modalProps.variant.backgroundLight}
                        handleToggleModal={toggleModal}
                        center
                    >
                        <Form
                            formParams={filledAddApartmentForm}
                            handleSubmit={addApartment}
                        />
                    </Modal>

                    {renderAddApartmentButton}
                    {renderMobileAddApartmentButton}
                </ApartmentsFilterContainerRight>
            </ApartmentsFilterContainer>

            {renderApartmentsBarChart}

            {renderApartmentList}
        </ApartmentsContainer>
    );
};

export default Apartment;