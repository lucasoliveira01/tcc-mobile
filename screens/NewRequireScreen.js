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
  CheckBox,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const NewRequireScreen = () => {
  const [type, setType] = useState('');
  const [avatar, setAvatar] = useState();
  const [description, setDescription] = useState();
  const screenHeight = Dimensions.get('window').height;

  const handleType = (selectedType) => {
    setType(selectedType);
  };

  const handleDescription = (text) => {
    setDescription(text);
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

  async function uploadImage() {
    const data = new FormData();

    data.append('avatar', {
      fileName: avatar.fileName,
      uri: avatar.uri,
      type: avatar.type,
    });

    console.log(data);

    // await Axios.post('http://localhost:3333/files', data);
  }

  async function uriToBlob(uri) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        // return the blob
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  }

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
                    ? ['#0F6EFF', '#4A91FE']
                    : ['#a6a6a6', '#dbdbdb']
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
                    ? ['#0F6EFF', '#4A91FE']
                    : ['#a6a6a6', '#dbdbdb']
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
                    ? ['#0F6EFF', '#4A91FE']
                    : ['#a6a6a6', '#dbdbdb']
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
                    ? ['#0F6EFF', '#4A91FE']
                    : ['#a6a6a6', '#dbdbdb']
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
                    ? ['#0F6EFF', '#4A91FE']
                    : ['#a6a6a6', '#dbdbdb']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons
                  name="ice-cream"
                  color="#fff"
                  size={40}
                />
                <Text style={styles.textSign}>Terreno</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleType('aedes')}>
              <LinearGradient
                colors={
                  type === 'aedes'
                    ? ['#0F6EFF', '#4A91FE']
                    : ['#a6a6a6', '#dbdbdb']
                }
                style={styles.requireType}>
                <MaterialCommunityIcons
                  name="ice-cream"
                  color="#fff"
                  size={40}
                />
                <Text style={styles.textSign}>Dengue</Text>
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
              onBlur={(text) => handleDescription(text)}
            />
          </View>
          <View>
            <Text style={styles.fieldTitle}>Foto do Problema</Text>
            {avatar ? (
              <Image
                source={{
                  uri: avatar
                    ? avatar.uri
                    : 'https://mltmpgeox6sf.i.optimole.com/w:761/h:720/q:auto/https://redbanksmilesnj.com/wp-content/uploads/2015/11/man-avatar-placeholder.png',
                }}
                style={styles.avatar}
              />
            ) : (
              <View />
            )}
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                ImagePicker.showImagePicker(
                  imagePickerOptions,
                  imagePickerCallback,
                )
              }>
              <Text style={styles.buttonText}>Escolher imagem</Text>
            </TouchableOpacity>
            <View style={styles.checkboxContainer}>
              <CheckBox />
              <Text style={styles.checkboxLabel}>
                Assumo que não vou enviar imagens pornográficas e/ou textos
                pejorativos.
              </Text>
            </View>
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
  },
  main: {
    flex: 1,
    width: '93%',
    alignSelf: 'center',
    height: height + 250,
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
});
