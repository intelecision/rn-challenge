import { StyleSheet, View, Text } from 'react-native';
import React,{useState, useEffect} from "react"
import { Branch } from './Branch';

export default function BranchDetails({ branch }: { branch: Branch })
{
  const [accessibility, setAccessibility] = useState < string | undefined>();

  useEffect(() => {
    setAccessibility(makeSentence());
  }, [branch])

  const makeSentence = ():string|undefined =>
  {
    const reg = /($[a-z])|[A-Z][^A-Z]+/g;
    const accessibility = branch?.Accessibility?.join(', ');
    return accessibility?.match(reg)?.join(" ");
  }

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: 'column' }}>
        <Text style={{ ...styles.textBold, color: 'red' }}>{branch.Name}</Text>
        <Text>{`${branch.PostalAddress.BuildingNumber}, ${branch.PostalAddress.StreetName}, ${branch.PostalAddress.TownName},  ${branch.PostalAddress.PostCode}`}</Text>
      </View>
      {branch.ServiceAndFacility && (
        <View style={styles.row}>
          <Text style={styles.text}>Services: </Text>
          <Text style={styles.textBold}>
            {branch.ServiceAndFacility.join(', ')}
          </Text>
        </View>
      )}
      {branch.Accessibility && (
        <View style={styles.row}>
          <Text style={styles.text}>Accessibility: </Text>
          <Text style={styles.textBold}>{accessibility}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    padding: 10,
    marginHorizontal: 20,
    borderBottomColor: "#ddd"
    ,borderBottomWidth:1
  },
  row: {
    flexDirection: 'row',
   // justifyContent: 'space-between',
  },
  text: {
   // fontFamily: 'textRegular',
    color: 'black',
    fontSize: 14,
   // flex: 1,
  },
  textBold: {
    fontFamily: 'textBold',
    color: 'black',
    fontSize: 14,
   // flex: 1,
  },
});
