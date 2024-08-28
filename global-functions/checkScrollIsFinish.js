const checkScrollIsFinish = eventScroll => {
  const { nativeEvent = {} } = eventScroll || {};
  const {
    contentOffset = {},
    layoutMeasurement = {},
    contentSize = {},
  } = nativeEvent;
  console.log(
    'finsish',
    (contentOffset.y || 0) + (layoutMeasurement.height || 0) ===
      (contentSize.height || 0)
  );
  return (
    (contentOffset.y || 0) + (layoutMeasurement.height || 0) ===
    (contentSize.height || 0)
  );
};

export default checkScrollIsFinish;
