import { PermissionsAndroid, Alert } from 'react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';

export const useMediaPicker = (setPhoto: (uri: string | null) => void) => {

  const handleMediaResponse = (result: { assets?: Asset[]; errorMessage?: string }) => {
    if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    } else if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri ?? null;
      setPhoto(uri); // Update the photo state with the new URI
    }
  };

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'This app needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      launchCamera({ saveToPhotos: true, mediaType: 'photo' }, handleMediaResponse);
    } else {
      Alert.alert('Camera permission denied');
    }
  };

  const openGallery = async () => {
    launchImageLibrary({ mediaType: 'photo' }, handleMediaResponse);
  };

  return { openCamera, openGallery };
};
