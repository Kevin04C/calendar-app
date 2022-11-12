import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react"

export const useForm = (initalForm = {}, formValidations = {}) => {

  const [formState, setFormState] = useState(initalForm);
  const [formValidation, setFormValidation] = useState({});


  useEffect(() => {
    
    createValidation();

  }, [formState])
  

  useEffect(() => {
    
    setFormState(initalForm)

  }, [initalForm])
  


  const isFormValid = useMemo( () => {

    for (const formValue of Object.keys( formValidation )) {
        if ( formValidation[formValue] !== null ) return false;
    }

    return true;
}, [ formValidation ])
    

  const handleInputChange = ({target}) => {
    setFormState({
      ...formState,
      [target.name]: target.value
    });
  }

  const handleResetForm = () => {
    setFormState(initalForm);
  }


  const createValidation = () => {

    const formCheckedValues = {};

    for(const key of Object.keys(formValidations)){
      const [fn, errorMessage] = formValidations[key]; 
      formCheckedValues[`${key}Valid`] = fn(formState[key]) ? null : errorMessage; 

      setFormValidation(formCheckedValues);

    }

  }

  return {
    ...formState,
    formState,
    
    handleInputChange,
    isFormValid,
    handleResetForm,
    formValidation

  }

}
