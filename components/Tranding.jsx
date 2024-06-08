import { Text, FlatList } from 'react-native';

const Tranding = ({posts}) => {
  return (
    <FlatList 
      data={posts} 
      keyExtractor={(item) => item.id} 
      renderItem={({item}) => (
        <Text className="text-white text-lg">
          {item.id}
        </Text>
      )}
      horizontal
    />
  )
}

export default Tranding;