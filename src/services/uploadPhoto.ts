import {PhotoIdentifier} from '@react-native-camera-roll/camera-roll';

export const uploadPhoto = async (photos: PhotoIdentifier[]) => {
  const formData = new FormData();
  photos.forEach(photo => {
    formData.append('file', {
      uri: photo.node.image.uri,
      type: 'image/*',
      name: photo.node.image.filename,
    });
  });
  const response = await fetch('http://localhost:1323/api/photo/upload', {
    method: 'POST',
    body: formData,
  });
  return response.json();
};
