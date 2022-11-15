import {useState} from 'react';

const useForm = (
  callback = function () {
    console.log('No callback found, but we fired it.');
  }
) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target;
    const property = target.name;
    const value = target.value;

    validate(property, value);

    setValues({
      ...values,
      [property]: value,
    });
  };

  const validate = (property, value) => {
    const errorSetter = (property, message) => {
      setErrors({
        ...errors,
        [property]: message,
      });
    };

    const errorRemover = property => {
      const newErrors = delete errors[property];
      setErrors(newErrors);
    };

    let regex;
    switch (property) {
      case 'email':
        regex = /^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/;
        regex.test(value)
          ? errorRemover(property)
          : errorSetter(property, 'Please enter a valid email.');
        break;

      case 'pass':
        regex = /^(?=.*\d).{8,}$/;
        regex.test(value)
          ? errorRemover(property)
          : errorSetter(
              property,
              'Must contain at least 1 digit and be at least 8 characters long.'
            );
        break;

      case 'passconf':
        value === values['pass']
          ? errorRemover(property)
          : errorSetter(property, 'Passwords must match.');
        break;
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length === 0 && Object.keys(values).length > 0) {
      callback();
      console.log('Submitted');
    } else {
      console.log("Didn't pass validation, did nothing.");
    }
  };

  return {values, errors, handleChange, handleSubmit};
};

export default useForm;
