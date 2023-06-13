import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

const scale = (size: number) => width > 600 ? (width / guidelineBaseWidth) * size * 0.61 : (width / guidelineBaseWidth) * size;
const scaleVertical = (size: number) => (height / guidelineBaseHeight) * size;
const scaleModerate = (size: number, factor: number = 0.5) => size + ((scale(size) - size) * factor);

export { scale, scaleVertical, scaleModerate };