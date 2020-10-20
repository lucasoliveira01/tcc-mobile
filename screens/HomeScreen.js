/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import {Caption} from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api';

export default function HomeScreen({navigation}) {
  const [requests, setRequests] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    async function loadRequires() {
      const response = await api.get('/request/1');

      setRequests(response.data.data);
    }

    loadRequires();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#f2f2f2"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.list}>
        <Text style={styles.title}>Minhas Solicitações</Text>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={requests}
          renderItem={({item}) => (
            <TouchableOpacity>
              <View style={styles.item}>
                <Image style={styles.listImage} source={{uri: item.image}} />
                <View style={styles.listText}>
                  <Text style={{fontWeight: 'bold', fontSize: 20}}>
                    {item.description}
                  </Text>
                  <Caption style={{fontSize: 15}}>{item.type}</Caption>
                </View>
                <View>
                  <Icon name="chevron-right" size={25} style={styles.icon} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      {/* <Text style={{color: colors.text}}>Home Screen</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
  },
  list: {
    flex: 1,
    width: '93%',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 80,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
    marginBottom: 15,
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
  },
  listImage: {
    width: 55,
    height: 55,
  },
  listText: {
    marginLeft: 15,
    width: '75%',
  },
});
