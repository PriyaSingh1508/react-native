import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface HomeScreenProps{
  navigation:StackNavigationProp<RootStackParamList, 'Home'>;
}  



function Home({ navigation }: HomeScreenProps): React.ReactElement {
  const expenseEntries = useSelector((state:RootState) => state.expense.expenseEntries);

  const handleAddExpense = () => {
    navigation.navigate('AddExpense');
  };
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

       {/* Display budget entries */}
       <View style={styles.budgetEntriesContainer}>
        <Text style={styles.sectionTitle}>Budget Entry Listing:</Text>
        {expenseEntries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <Text>Name: {entry.name}</Text>
            <Text>Planned Amount: {entry.plannedAmount}</Text>
            <Text>Actual Amount: {entry.actualAmount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    //marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  budgetEntriesContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  entryContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});


export default Home;
