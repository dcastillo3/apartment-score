import { apartmentBathroomOptions, apartmentBedroomOptions, apartmentScoreOptions } from "./apartmentConsts";

const addApartmentForm = {
    title: 'Add An Apartment',
    buttonName: 'Add Apartment',
    fieldsPerRow: 2,
    inputs: [
        {
            id: 'name',
            labelName: 'Name',
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'price',
            labelName: 'Price',
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'bedrooms',
            labelName: 'Bedrooms',
            inputType: 'select',
            defaultValue: '',
            options: apartmentBedroomOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'bathrooms',
            labelName: 'Bathrooms',
            inputType: 'select',
            defaultValue: '',
            options: apartmentBathroomOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'walkScore',
            labelName: 'Walk Score',
            inputType: 'select',
            defaultValue: '',
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'locationScore',
            labelName: 'Location Score',
            inputType: 'select',
            defaultValue: '',
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'amenityScore',
            labelName: 'Amenity Score',
            inputType: 'select',
            defaultValue: '',
            options: apartmentScoreOptions,
            additionalProps: {},
            validations: {},
            fullRow: false
        },
        {
            id: 'interiorScore',
            labelName: 'Interior Score',
            inputType: 'select',
            defaultValue: '',
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