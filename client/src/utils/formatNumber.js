const formatNumber = (number) => {
  if (typeof number !== "number" && isNaN(number)) {
    return "Invalid input";
  }
  const formattedNumber = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 10,
  }).format(number);
  return formattedNumber;
};

export default formatNumber;
