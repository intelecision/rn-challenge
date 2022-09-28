import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BranchesInput from './src/BranchesInput';
import { SearchLocation } from './src/SearchLocation';
import Map from './src/Map';
import Spinner from './src/Spinner';
import useLoading from './src/useLoading';
import { Branch } from './src/Branch';
import { closestBranchTo } from './src/distances';
import BranchDetails from './src/BranchDetails';
import ClosestBranchProvider from "./src/ClosestBranchProvider";

export default function App() {
 // const [state, branches] = useLoading();
  //const [search, setSearch] = useState<SearchLocation>();
  //const [closest, setClosest] = useState<undefined | Branch[]>();
  //useEffect(() => {
  //  if (branches && typeof search === 'object') {
  //    setClosest(closestBranchTo(search, branches));
  //  } else {
  //    setClosest(undefined);
  //  }
  //  console.log("Branches", branches?.length);
  //   console.log('closest', branches?.closest);
  //}, [search, branches]);
  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      <ClosestBranchProvider />

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    fontFamily: 'textRegular',
    fontSize: 24,
    color: '#ED0000',
    padding: 10,
    backgroundColor: '#80808030',
  },
  centred: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
