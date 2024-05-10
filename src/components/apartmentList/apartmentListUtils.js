import { score } from "./apartmentListConsts";


const fillApartmentForm = (apartment, updateApartmentForm) => {
    const filledInputs = updateApartmentForm?.inputs?.map(formField => {
        return {
            ...formField,
            defaultValue: apartment[formField.id]
        };
    });

    const filledUpdateApartmentForm = {
        ...updateApartmentForm,
        inputs: filledInputs
    };

    return filledUpdateApartmentForm;
};

const getTotalScore = apartmentData => Object.keys(apartmentData)
.filter(key => key.includes(score))
.reduce((acc, key) => acc + parseInt(apartmentData[key]), 0);

export { 
    fillApartmentForm ,
    getTotalScore
};