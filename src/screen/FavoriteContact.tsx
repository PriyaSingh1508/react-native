import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import SQLite from 'react-native-sqlite-2';
import {useEffect, useState} from 'react';

interface Contact {
  id: number;
  name: string;
  mobNo: number;
  landlineNo: number;
  photo: string;
  favorite: number;
}

const db = SQLite.openDatabase('contactApp.db', '1.0', '', 1);
export function FavoriteContact(): React.JSX.Element {
  let [flatListItems, setFlatListItems] = useState<Contact[]>([]);

  const sortContactsByName = (contacts: Contact[]) => {
    return contacts.sort((a, b) => a.name.localeCompare(b.name));
  };

  useEffect(() => {
    console.log(flatListItems);
  }, [flatListItems]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM table_contact WHERE favorite = 1',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(sortContactsByName(temp));
          console.log(flatListItems);
        },
      );
    });
  }, []);

  const renderItem = ({item}: {item: Contact}) => (
    <View style={styles.contactItem}>
      <TouchableOpacity style={styles.contactItem}>
        <Image source={{uri: item.photo}} style={styles.contactImage} />
        <Text style={styles.contactName}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flatListItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactItem: {
    flex: 1,
    flexDirection: 'row',
  },
  contactName: {
    paddingTop: 10,
    paddingLeft: 12,
    fontSize: 20,
  },
});
