import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const NewRequireScreen = () => {
  const [type, setType] = useState('');

  const handleType = (selectedType) => {
    setType(selectedType);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova Solicitação</Text>
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
              <MaterialCommunityIcons name="ice-cream" color="#fff" size={40} />
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
              <MaterialCommunityIcons name="ice-cream" color="#fff" size={40} />
              <Text style={styles.textSign}>Dengue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholder="Seu Usuário"
            style={styles.textInput}
            autoCapitalize="none"
          />
        </View>
      </View>
    </View>
  );
};

export default NewRequireScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
  main: {
    flex: 1,
    width: '93%',
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
    flex: 1,
    paddingLeft: 10,
    borderBottomWidth: 1,
    color: 'black',
  },
  form: {
    height: 50,
  },
});
