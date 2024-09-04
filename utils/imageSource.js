const imageSource = obj => (typeof obj === 'object' ? obj : { uri: obj });
export default imageSource;
