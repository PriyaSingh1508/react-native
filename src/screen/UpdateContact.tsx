import { Text,View,StyleSheet,TouchableOpacity,Image,Alert,Button,TextInput,} from 'react-native';
import {useMediaPicker} from '../utility/MediaPicker';
import {useEffect, useState} from 'react';
import SQLite from 'react-native-sqlite-2';
import {RootStackParamList} from '../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
 
type UpdateContactRouteProp = RouteProp<RootStackParamList, 'UpdateContact'>;
 
interface ContactListProps {
  route: UpdateContactRouteProp;
  navigation: StackNavigationProp<RootStackParamList, 'ContactList'>;
}
 
const db = SQLite.openDatabase('contactApp.db', '1.0', '', 1);
 
export const UpdateContact = ({route,navigation}: ContactListProps) => {
 
  let [name, setName] = useState('');
  let [mobNo, setMobNo] = useState('');
  let [landlineNo, setLandlineNo] = useState('');
  let [favorite, setFavorite] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  let id:number;
  const [MyId, setId] = useState<number>(route.params.contactId);
  //const [id, setId] = useState(0); 
  
 
useEffect(() => {
  id=MyId;
  //id=route.params.contactId;
  searchContact(id);
}, [MyId]);

  let updateAllStates = (name:string, mobNo:string, landlineNo:string, photo:string, favorite:number) => {
    setName(name);
    setMobNo(mobNo);
    setLandlineNo(landlineNo);
    setPhoto(photo);
    setFavorite(favorite);
    //console.log("Inside updatestate",name, mobNo, landlineNo, photo,favorite  );
  };
 
  let searchContact = (id:number) => {
   // console.log(id);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name, mobNo, landlineNo, favorite, photo FROM table_contact where id = ?',
        [id],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.name, res.mobNo, res.landlineNo, res.photo, res.favorite  
            );
          } else {
            Alert.alert('No user found');
            updateAllStates('', '', '','',0);
          }
        }
      );
    });
  };
  let updateContact = (id: number) => {
    console.log(id,name, mobNo, landlineNo, photo, favorite);
    if (!name && !mobNo && !landlineNo) {
      Alert.alert('Please fill all fields');
      return;
    }
 
    db.transaction((tx) => {

      tx.executeSql(
        'UPDATE table_contact set name=?, mobNo=? , landlineNo=?, photo=?, favorite=? where id=?',
         [name, mobNo, landlineNo, photo, favorite ? 1 : 0,id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected >= 0) {
            Alert.alert(
              'Success',
              'Contact updated successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ContactList'),
                },
              ],
              { cancelable: false }
            );
          } else Alert.alert('Contact Updation Failed');
        }
      );
    });
  };
 
  let deleteContact = (id: number) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_contact where id=?',
        [id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Contact deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ContactList'),
                },
              ],
              { cancelable: false }
            );
          } else {
            Alert.alert('Please insert a valid User Id');
          }
        }
      );
    });
  };
 
 
 
  const { openCamera, openGallery } = useMediaPicker(setPhoto);
  return (
    <View style={styles.container}>
 
 
      <TextInput
        placeholder="Name of person"
        onChangeText={setName}
        value={name}
        style={styles.input}
      />
 
      <TextInput
        placeholder="Mobile phone number"
        value={mobNo}
        onChangeText={setMobNo}
       
       // keyboardType="phone-pad"
        style={styles.input}
      />
 
      <TextInput
        placeholder="Landline number"
        onChangeText={setLandlineNo}
        value={landlineNo}
        keyboardType="phone-pad"
        style={styles.input}
      />
{photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}

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
 
      <TouchableOpacity style={styles.button} onPress={() => updateContact(MyId)}>
  <Text style={styles.buttonText}>Update Contact</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={() => deleteContact(MyId)}>
  <Text style={styles.buttonText}>Delete Contact</Text>
</TouchableOpacity>

    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    marginLeft:5,
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