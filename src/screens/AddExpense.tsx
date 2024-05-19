import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text,TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../App';
import {saveExpense} from '../slices/expenseSlice.ts';
import { useDispatch } from 'react-redux';


interface AddExpenseProps{
  navigation:StackNavigationProp<RootStackParamList, 'AddExpense'>;
}  

function AddExpense({navigation}:AddExpenseProps): React.JSX.Element {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [plannedAmount, setPlannedAmount] = useState('');
  const [actualAmount, setActualAmount] = useState('');
  const handleSave = () => {
    dispatch(saveExpense({ name, plannedAmount, actualAmount }));
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
    <Text style={styles.label}>Name:</Text>
    <TextInput
      style={styles.input}
      onChangeText={setName}
      value={name}
    />
    <Text style={styles.label}>Planned Amount:</Text>
    <TextInput
      style={styles.input}
      onChangeText={setPlannedAmount}
      value={plannedAmount}
      keyboardType="numeric"
    />
     <Text style={styles.label}>Actual Amount:</Text>
    <TextInput
      style={styles.input}
      onChangeText={ setActualAmount}
      value={actualAmount}
      keyboardType="numeric"
    />
    <TouchableOpacity style={styles.button} onPress={handleSave}>
      <Text style={styles.buttonText}>Save</Text>
    </TouchableOpacity>
  </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddExpense;
