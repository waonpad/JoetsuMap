import { Platform } from 'react-native';

import type { PickedImage } from '@/types';

// Blobが使えない?よくわからない
export const createFormData = async (
  images: {
    [key: string]: PickedImage;
  },
  body: { [key: string]: any },
) => {
  const data = new FormData();

  Object.keys(images).forEach((key) => {
    const uri = Platform.OS === 'ios' ? images[key].uri.replace('file://', '') : images[key].uri;

    const blob = new Blob([uri], { type: images[key].type });

    data.append(key, blob, images[key].fileName || 'test.jpg');
  });

  data.append('body', new Blob([JSON.stringify(body)], { type: 'application/json' }));

  console.log(JSON.stringify(data));

  return data;
};
