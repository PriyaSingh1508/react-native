import { Text,View,StyleSheet,FlatList,Image,TouchableOpacity, Alert,} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Swipeable } from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import SQLite from 'react-native-sqlite-2';
import {useEffect, useState,useRef} from 'react';
import  Icon  from 'react-native-vector-icons/Entypo';

interface ContactListProps {
  navigation: StackNavigationProp<
    RootStackParamList,
    'CreateContact' | 'UpdateContact'
  >;
}
interface Contact {
  id: number;
  name: string;
  mobNo: number;
  landlineNo: number;
  photo: string;
  favorite: number;
}

const db = SQLite.openDatabase('contactApp.db', '1.0', '', 1);
export function ContactList({navigation}: ContactListProps): React.JSX.Element {
  const ref=useRef();
  let [flatListItems, setFlatListItems] = useState<Contact[]>([]);

  const sortContactsByName = (contacts: Contact[]) => {
    return contacts.sort((a, b) => a.name.localeCompare(b.name));
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

  useEffect(() => {
    // console.log(flatListItems);
  }, [flatListItems]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_contact ', [], (tx, results) => {
        var temp: Contact[] = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(sortContactsByName(temp));
        // console.log(flatListItems);
      });
    });
  }, []);

  const renderItem = ({item}: {item: Contact}) => (

    <Swipeable renderRightActions={()=>rightButtons(item.id)} rightThreshold={10} overshootLeft={false} overshootRight={false}>
    <View style={styles.contactItem}>
       
      <TouchableOpacity
        style={styles.contactItem}
        onPress={() =>
          navigation.navigate('UpdateContact', {contactId: item.id})
        }>
        <Image source={{uri: item.photo}} style={styles.contactImage} />
        <Text style={styles.contactName}>{item.name}</Text>
      </TouchableOpacity>
    </View>
    </Swipeable>
   
  );

//   const rightButtons = (item:number)=>{
//     console.log("Id of item",item);
//     const itemId=item;
//     return(
//       <View style={styles.rightButton}>    
//    <TouchableOpacity onPress={() => { console.log('Navigating to UpdateContact with ID:', itemId); navigation.navigate('UpdateContact', {contactId: item})}} > 
//         <Text style={styles.button}>Update</Text>
//     </TouchableOpacity>
//     <TouchableOpacity onPress={() => deleteContact(item.id)}>
//   <Text style={styles.button}>Delete</Text>
// </TouchableOpacity>

//       </View>
//     )
//   }
const rightButtons = (item:number) => {
  const handlePressUpdate = () => {
    console.log('Navigating to UpdateContact with ID:', item);
    navigation.navigate('UpdateContact', { contactId: item});
  };

  const handlePressDelete = () => {
    console.log('Deleting contact with ID:', item);
    deleteContact(item);
  };

  return (
    <View style={styles.rightButton}>
      {/* <Icon
    name="edit" size={19} color="black" onPress={()=>navigation.navigate('UpdateContact', { contactId: item})} style={{marginTop:18,marginRight:4}}/> */}
      <TouchableOpacity onPress={handlePressDelete}>
        <Text style={styles.button}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePressUpdate}>
        <Text style={styles.button}>Update</Text>
      </TouchableOpacity>
     
    </View>
  );
};

  return (
 
    <View style={styles.container}>  
      <FlatList
        data={flatListItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
     
   
      <View style={styles.favContainer}>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('CreateContact')}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:370,
   // borderLeftColor:'red',
    //borderLeftWidth:2,
  },
  favContainer: {
   // flex: 1,
   
    // position: 'relative',
   // alignSelf: 'flex-end',
    
   marginLeft: 365,
   marginBottom:5
  },
  fab: {
    width: 36,
    height: 36,
    backgroundColor: '#03A9F4',
    borderRadius: 16,
    elevation: 8,
  },
  fabIcon: {
    left: 10,
    fontSize: 26,
    color: 'white',
  },
  contactImage: {
    marginLeft:10,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  contactItem: {
    flex: 1,
    flexDirection: 'row',
   
  },
  contactName: {
    paddingTop: 10,
    paddingLeft: 12,
    fontSize: 16,
  },
  button:{
    flex:1,
    marginTop:12,
    marginRight:4,
    width:50,
    height:28,
    backgroundColor:'purple',
    color:'white',
    borderCurve:'circular',
    borderRadius:5
  },
  rightButton:{
    marginRight:0,
    //width: 52, 
    // height: '100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end'
  }
});
