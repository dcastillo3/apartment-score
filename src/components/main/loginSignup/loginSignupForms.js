import { buttonLabels, formLabels, headingLabels, placeholders } from "./loginSignupConsts";

const loginForm = {
    title: headingLabels.login,
    buttonName: buttonLabels.login,
    fieldsPerRow: 1,
    inputs: [
        {
            id: 'email',
            labelName: formLabels.email,
            inputType: 'email',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true,
                placeholder: placeholders.email
            },
            validations: {},
            fullRow: true
        },
        {
            id: 'password',
            labelName: formLabels.password,
            inputType: 'password',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true,
                placeholder: placeholders.password
            },
            validations: {},
            fullRow: true
        }
    ]
};

const signupForm = {
    title: headingLabels.signup,
    buttonName: buttonLabels.signup,
    fieldsPerRow: 2,
    inputs: [
        {
            id: 'email',
            labelName: formLabels.email,
            inputType: 'email',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true,
                placeholder: placeholders.email
            },
            validations: {},
            fullRow: true
        },
        {
            id: 'password',
            labelName: formLabels.password,
            inputType: 'password',
            defaultValue: '',
            options: [],
            additionalProps: {
                required: true,
                placeholder: placeholders.password
            },
            validations: {},
            fullRow: true
        },
        {
            id: 'firstName',
            labelName: formLabels.firstName,
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {
                placeholder: placeholders.firstName
            },
            validations: {},
            fullRow: false
        },
        {
            id: 'lastName',
            labelName: formLabels.lastName,
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {
                placeholder: placeholders.lastName
            },
            validations: {},
            fullRow: false
        },
        {
            id: 'userName',
            labelName: formLabels.userName,
            inputType: 'text',
            defaultValue: '',
            options: [],
            additionalProps: {
                placeholder: placeholders.userName
            },
            validations: {},
            fullRow: true
        }
    ]
};

export {
    loginForm,
    signupForm
};
