import {useState} from 'react';

const useForm = (
  callback = function () {
    console.log('Callback fired!');
  }
) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Handling change!');
    e.preventDefault();
    const target = e.target;
    const property = target.name;
    const value = target.value;

    // validate(property, value);

    setValues({
      ...values,
      [property]: value,
    });
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    callback();
    console.log('Submitted');
  };

  return {values, errors, handleChange, handleSubmit};
};

export default useForm;
