import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Branch } from "./Branch";
import { SearchLocation } from "./SearchLocation";
import BranchDetails from "./BranchDetails";
import BranchesInput from "./BranchesInput";
import useLoading from "./useLoading";
import { closestBranchTo } from "./distances";
import Map from './Map';

type Props = {
  closest: Branch[]|undefined
};

const ClosestBranchProvider= React.memo(() =>
{
   const [closest, setClosest] = useState<undefined | Branch[]>();
  const [ search, setSearch ] = useState<SearchLocation>();
  const [ state, branches ] = useLoading();
   useEffect(() => {
     if (branches && typeof search === 'object') {
       setClosest(closestBranchTo(search, branches));
     } else {
       setClosest(undefined);
     }

   }, [search, branches]);

  const renderClosest = ({ item}) =>
  {
    return <BranchDetails  branch={item} />;
  }
  console.log('Branches', branches?.length);
  console.log('closest', closest?.length);
  return (
    <View style={{ flex: 1 }}>
      <View style={{flex:1}}>

        <Map closest={closest} />
      </View>

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <BranchesInput search={search} setSearch={setSearch} />
        <FlatList
          data={closest}
          renderItem={renderClosest}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}
);
export default ClosestBranchProvider

const styles = StyleSheet.create({})
