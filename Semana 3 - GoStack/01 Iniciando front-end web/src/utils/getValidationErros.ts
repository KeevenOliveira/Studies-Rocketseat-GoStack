import { ValidationError } from 'yup';

interface Errors { 
    [key: string]: string; //qualquer propriedade pode ser uma string
}

export default function getValidationErrors(error: ValidationError): Errors {

    const validationErrors : Errors = {};

    error.inner.forEach((error) => {
        if(error.path) {
            validationErrors[error.path] = error.message;
        }
    })

    return validationErrors;
}