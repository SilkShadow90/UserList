import { ImageURISource } from 'react-native';

enum ImageList {
  chevron_forward = 'chevron_forward',
}

export const Images: Record<ImageList, ImageURISource> = (() =>
  Object.entries(ImageList).reduce((set, [key, value]) => ({ ...set, [key]: { uri: value } }), {}) as Record<
    ImageList,
    ImageURISource
  >)();
