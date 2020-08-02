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

// format number with comma and decimal place
export const formatNumber = (value, decimal = 2) => {
  let val = (value/1).toFixed(decimal)
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const showNotification = (instance, variant, msg, title) => {
  instance.$bvToast.toast(msg, {
    title: title || "Notification",
    variant: variant,
    solid: true,
    autoHideDelay: 4000,
  })
}