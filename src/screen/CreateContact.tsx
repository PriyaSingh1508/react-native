import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  TextInput,
} from 'react-native';
import {useMediaPicker} from '../utility/MediaPicker';
import {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';

interface ContactListProps {
  navigation: StackNavigationProp<RootStackParamList, 'ContactList'>;
}

const db = SQLite.openDatabase('contactApp.db', '1.0', '', 1);

export const CreateContact = ({navigation}: ContactListProps) => {
  useEffect(() => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_contact'",
        [],
        (tx, res) => {
          console.log(' hi item:', res.rows.length);
          if (res.rows.length <= 0) {
            // txn.executeSql('DROP TABLE IF EXISTS table_contact', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_contact(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20), mobNo VARCHAR(10), landlineNo VARCHAR(12), photo VARCHAR(255),favorite INT(1))',
              [],
            );
          }
        },
      );
    });
  }, []);

  let [name, setName] = useState('');
  let [mobNo, setMobNo] = useState('');
  let [landlineNo, setLandlineNo] = useState('');
  let [favorite, setFavorite] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  let saveContact = () => {
    //  console.log(name, mobNo, landlineNo,photo , favorite);
    if (!name || !mobNo || !landlineNo) {
      Alert.alert('Please fill all fields');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO table_contact (name, mobNo, landlineNo, photo, favorite) VALUES (?, ?, ?, ?, ?)',
        [name, mobNo, landlineNo, photo, favorite ? 1 : 0],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert('Success', 'Contact added successfully', [
              {
                text: 'Ok',
                onPress: () => navigation.navigate('ContactList'),
              },
            ]);
          } else {
            Alert.alert('Failed to add contact');
          }
        },
      );
    });
  };

  const {openCamera, openGallery} = useMediaPicker(setPhoto);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Contact</Text>

      <TextInput
        placeholder="Name of person"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />

      <TextInput
        placeholder="Mobile phone number"
        onChangeText={setMobNo}
        value={mobNo}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TextInput
        placeholder="Landline number"
        onChangeText={setLandlineNo}
        value={landlineNo}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <View style={styles.mediacontainer}>
        <TouchableOpacity onPress={openCamera} style={styles.button}>
          <Text style={styles.buttonText}>Open Camera</Text>
        </TouchableOpacity>

        <Text>OR</Text>

        <TouchableOpacity onPress={openGallery} style={styles.button}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, favorite ? styles.buttonActive : null]}
        onPress={() => setFavorite(favorite > 0 ? 0 : 1)}>
        <Text style={styles.buttonText}>
          {favorite ? 'Unmark Favorite' : 'Mark as Favorite'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={saveContact}>
        <Text style={styles.buttonText}>Save Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
  },
  mediacontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },

  button: {
    backgroundColor: '#233f49',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: '#ffd700',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});
