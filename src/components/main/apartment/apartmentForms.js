import { buildApartmentNonScoreSortableCategoryInputs, buildApartmentScoreCategoryInputs } from "./apartmentUtils";

const categorySortableNonScoreInputs = buildApartmentNonScoreSortableCategoryInputs();

const categoryScoreInputs = buildApartmentScoreCategoryInputs();

const addApartmentForm = {
    title: 'Add An Apartment',
    buttonName: 'Add Apartment',
    fieldsPerRow: 2,
    inputs: [
        {
            id: 'address',
            labelName: 'Address',
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true
            },
            validations: {},
            fullRow: false
        },
        {
            id: 'link',
            labelName: 'Link',
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true
            },
            validations: {},
            fullRow: false
        },
        {
            id: 'imageLink',
            labelName: 'Image Link',
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true
            },
            validations: {},
            fullRow: false
        },
        ...categorySortableNonScoreInputs,
        ...categoryScoreInputs
    ]
};

const updateApartmentForm = {
    ...addApartmentForm,
    title: '',
    buttonName: 'Update'
};

export {
    addApartmentForm,
    updateApartmentForm
};