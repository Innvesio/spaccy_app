// Function to add commas to a number for numbers >= 1000
const formatNumber = (num) => {
  if (num >= 1000) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return num.toString();
  }
};

export { formatNumber };
