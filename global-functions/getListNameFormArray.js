const getListNameFormArray = array => {
  return array.map(item => item?.name).join(', ');
};

export default getListNameFormArray;
