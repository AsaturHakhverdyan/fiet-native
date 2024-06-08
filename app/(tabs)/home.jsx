import { View, Text, Image, FlatList, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../../constants"
import SearchInput from '../../components/SearchInput';
import Tranding from '../../components/Tranding';
import EmptyState from '../../components/EmptyState';
import { useEffect, useState } from 'react';
import { getAllPosts } from '../../lib/appwrite';
import useAppwrite from '../../lib/useAppwrite';
import VideoCart from '../../components/VideoCart';
const Home = () => {
  const {data: posts, isLoading, refetch} = useAppwrite(getAllPosts)
  const [refrashing, setRefrashing] = useState(false);
  const onRefrash = async () => {
      setRefrashing(true);
      await refetch()
      setRefrashing(false)
  }
  
  return (
    <SafeAreaView className="w-full h-full bg-primary">
      <FlatList 
        data={posts} 
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <View key={item.$id}>
            <VideoCart video={item}/>
          </View>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View className="">
                <Text className="text-sm font-pmedium text-secondary-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  JSMastery
                </Text>
              </View>
              <Image source={images.logoSmall} className="w-9 h-10" resizeMode='contain'/>
            </View>
            <SearchInput />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Tranding posts={[{id: 1}, {id:2}, {id:3}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No videos found" subTitle="Be the first on to upload the video"/>
        )}
        refreshControl={<RefreshControl refreshing={refrashing} onRefresh={onRefrash}/>}
      />
    </SafeAreaView>
  )
}

export default Home;
