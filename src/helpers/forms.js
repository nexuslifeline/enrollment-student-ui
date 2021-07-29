import format from 'date-fns/format';

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
  let val = (value / 1).toFixed(decimal)
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatAccountingNumber = (value, decimal = 2) => {
  if (Math.sign(value) < 0) {
    return `(${formatNumber(Math.abs(value), decimal)})`;
  }

  return formatNumber(value, decimal);
}

export const showNotification = (instance, variant, msg, title) => {
  instance.$bvToast.toast(msg, {
    title: title || "Notification",
    variant: variant,
    solid: true,
    autoHideDelay: 4000,
  })
}

export const getCurrentDateTime = () => {
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date +' '+ time;
  return dateTime;
}

export const toReadableDate = (date, dateFormat = 'MMMM dd, yyyy') => format(new Date(date), dateFormat);