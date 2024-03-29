/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-undef */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  PermissionsAndroid,
  Icon,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';

import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import RNFS from 'react-native-fs';
import functions from '@react-native-firebase/functions';

const NewRequireScreen = () => {
  const [type, setType] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [position, setPosition] = useState({
    latitude: -22.408404,
    longitude: -47.56052,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [description, setDescription] = useState();
  const screenHeight = Dimensions.get('window').height;

  const reference = storage().ref('poste.jpg');

  const axios = require('axios').default;

  const handleType = (selectedType) => {
    setType(selectedType);
  };

  const handleDescription = (text) => {
    setDescription(text);
    console.log(text);
  };

  const imagePickerOptions = {
    title: 'Selecione uma imagem',
  };

  function imagePickerCallback(data) {
    if (data.didCancel) {
      return;
    }

    if (data.error) {
      return;
    }

    if (data.customButton) {
      return;
    }

    if (!data.uri) {
      return;
    }

    setAvatar(data);
  }

  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    const {uri} = image;

    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    setUploading(true);
    setTransferred(0);

    const data = await RNFS.readFile(uri, 'base64');

    const task = storage().ref(filename).putString(data, 'base64');

    // set progress state
    task.on('state_changed', (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);

    setImage(null);

    const url = await storage().ref(filename).getDownloadURL();

    axios
      .post(
        'https://us-central1-fiscaliza-8b2f4.cloudfunctions.net/api/request',
        {
          id: Math.floor(Math.random() * 1000 + 1),
          user: 1,
          type: type,
          description: description,
          image: url,
          latitude: position.latitude,
          longitude: position.longitude,
          status: 1,
        },
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    Alert.alert(
      'Solicitação Enviada!',
      'Sua solicitação foi enviada com sucesso!',
    );

    return url;
  };

  const request_location_runtime_permission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização',
          message: 'A aplicação precisa da permissão de localização.',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (pos) => {
            setPosition({
              ...position,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          (error) => {
            console.log(error);
            Alert.alert('Houve um erro ao pegar a latitude e longitude.');
          },
        );
      } else {
        Alert.alert('Permissão de localização não concedida');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Solicitação</Text>
      <ScrollView>
        <View style={styles.main}>
          <View style={styles.requireTypes}>
            <TouchableOpacity onPress={() => handleType('illumination')}>
              <LinearGradient
                colors={
                  type === 'illumination'
                    ? ['#4A91FE', '#0F6EFF']
                    : ['#dbdbdb', '#a6a6a6']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons
                  name="white-balance-incandescent"
                  color="#fff"
                  size={40}
                />
                <Text style={styles.textSign}>Iluminação</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleType('water')}>
              <LinearGradient
                colors={
                  type === 'water'
                    ? ['#4A91FE', '#0F6EFF']
                    : ['#dbdbdb', '#a6a6a6']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons name="water" color="#fff" size={40} />
                <Text style={styles.textSign}>Água</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleType('traffic-light')}>
              <LinearGradient
                colors={
                  type === 'traffic-light'
                    ? ['#4A91FE', '#0F6EFF']
                    : ['#dbdbdb', '#a6a6a6']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons
                  name="traffic-light"
                  color="#fff"
                  size={40}
                />
                <Text style={styles.textSign}>Semáforo</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.requireTypes}>
            <TouchableOpacity onPress={() => handleType('road')}>
              <LinearGradient
                colors={
                  type === 'road'
                    ? ['#4A91FE', '#0F6EFF']
                    : ['#dbdbdb', '#a6a6a6']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons name="road" color="#fff" size={40} />
                <Text style={styles.textSign}>Asfalto</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleType('terreno')}>
              <LinearGradient
                colors={
                  type === 'terreno'
                    ? ['#4A91FE', '#0F6EFF']
                    : ['#dbdbdb', '#a6a6a6']
                }
                style={styles.requireType}>
                <MaterialIcons name="grass" color="#fff" size={40} />
                <Text style={styles.textSign}>Terreno</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleType('aedes')}>
              <LinearGradient
                colors={
                  type === 'aedes'
                    ? ['#4A91FE', '#0F6EFF']
                    : ['#dbdbdb', '#a6a6a6']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons name="alert" color="#fff" size={40} />
                <Text style={styles.textDengue}>Foco de Dengue</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <Text style={styles.fieldTitle}>Descrição do Problema</Text>
            <TextInput
              placeholder="O que está errado?"
              style={styles.textInput}
              autoCapitalize="none"
              multiline
              maxLength={50}
              onChangeText={(text) => handleDescription(text)}
            />
          </View>
          <View>
            <Text style={styles.fieldTitle}>Foto do Problema</Text>
            <TouchableOpacity style={styles.button} onPress={selectImage}>
              <Text style={styles.buttonText}>Escolha uma imagem</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {image !== null ? (
                <Image source={{uri: image.uri}} style={styles.imageBox} />
              ) : null}
              {uploading ? (
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={300} />
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={{height: 500}}>
            <Text style={styles.fieldTitle}>Indique no mapa o local do problema</Text>
            <MapView
              style={styles.map}
              region={position}
              onPress={(e) =>
                setPosition({
                  ...position,
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                })
              }>
              <Marker
                coordinate={position}
                title={'Marcador'}
                description={'Testando o marcador no mapa'}
              />
            </MapView>
            <View style={styles.positonBox}>
              <Text style={styles.positonBoxTitle}>
                Estou no local do problema
              </Text>
            </View>
            <TouchableOpacity
              style={styles.locationButton}
              onPress={() => {
                request_location_runtime_permission();
              }}>
              <MaterialIcons name="my-location" color={'#fff'} size={30} />
            </TouchableOpacity>
            {/* <View style={styles.logo}>
              <Text style={styles.logoText}>Samurai</Text>
              <Text style={[styles.logoText, {color: '#e74c3c'}]}>Map</Text>
            </View> */}
          </View>
          {/* <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.checkboxLabel}>
              Assumo que não vou enviar imagens pornográficas e/ou textos
              pejorativos.
            </Text>
          </View> */}
          <View style={{marginTop: 50}}>
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
              <Text style={styles.buttonText}>Enviar Solicitação</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewRequireScreen;
const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    height: height,
  },
  main: {
    flex: 1,
    width: '93%',
    alignSelf: 'center',
  },
  map: {
    marginTop: 20,
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 13,
    alignSelf: 'flex-start',
  },
  requireTypes: {
    flexDirection: 'row',
  },
  requireType: {
    width: 110,
    height: 110,
    marginBottom: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column',
  },
  signIn: {
    width: '30%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'column',
    padding: 20,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textDengue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    fontSize: 18,
    height: 80,
    color: '#a6a6a6',
  },
  form: {
    height: 120,
    marginTop: 20,
    marginBottom: 15,
  },
  avatar: {
    width: '100%',
    height: 250,
    marginTop: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 3,
    backgroundColor: '#0F6EFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  text: {
    fontSize: 42,
  },
  fieldTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginRight: 20,
    marginTop: 20,
  },
  checkboxLabel: {
    marginTop: 2,
    marginRight: 5,
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
  logo: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 15,
    elevation: 5,
    marginTop: -730,
    alignSelf: 'center',
    marginRight: 10,
    flexDirection: 'row',
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  positonBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    opacity: 0.75,
    marginTop: -110,
    marginHorizontal: 40,
    padding: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  positonBoxTitle: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    color: '#000',
  },
  positonBoxLatLon: {flexDirection: 'row', justifyContent: 'space-between'},
  locationButton: {
    backgroundColor: '#0F6EFF',
    borderRadius: 150,
    marginTop: -25,
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 8,
  },
});
