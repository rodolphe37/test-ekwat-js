export const getYears = (data) => {
  const result = [];
  if (data) {
    data?.map((one) => {
      const year = new Date(one?.date).getFullYear();
      if (!result.find((element) => element === year)) {
        result.push(year);
      }
      return result;
    });
  }
  return result;
};
