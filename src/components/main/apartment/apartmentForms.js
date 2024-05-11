import { apartmentBathroomOptions, apartmentBedroomOptions, apartmentScoreOptions } from "./apartmentConsts";

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
            id: 'price',
            labelName: 'Price',
            inputType: 'number',
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
        {
            id: 'bedrooms',
            labelName: 'Bedrooms',
            inputType: 'select',
            defaultValue: 1,
            options: apartmentBedroomOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'bathrooms',
            labelName: 'Bathrooms',
            inputType: 'select',
            defaultValue: 1,
            options: apartmentBathroomOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'walkScore',
            labelName: 'Walk Score',
            inputType: 'select',
            defaultValue: 1,
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'locationScore',
            labelName: 'Location Score',
            inputType: 'select',
            defaultValue: 1,
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'amenityScore',
            labelName: 'Amenity Score',
            inputType: 'select',
            defaultValue: 1,
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'interiorScore',
            labelName: 'Interior Score',
            inputType: 'select',
            defaultValue: 1,
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        }
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