export const validate = (form, errors) => {
  if (errors) {
    Object.keys(errors).forEach((key) => {
      form.states[key] = false;
      form.errors[key] = errors[key].length && errors[key][0];
    });
  }
}

export const reset = (form) => {
  Object.keys(form.states).forEach((key) => {
    form.states[key] = null;
    form.errors[key] = null;
  });
}