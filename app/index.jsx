import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from "../constants";
import CustomButton from '../components/CustomButton';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn} = useContext(GlobalContext)
    if(!isLoading && isLoggedIn) {
      return <Redirect href="/home"/>
    }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="w-full justify-center items-center min-h-[84vh] px-4">
          <Image source={images.logo} className="w-[180px] h-[84px]" resizeMode='contain'/>
          <Image source={images.cards} className="w-[380px] h-[300px]" resizeMode='contain'/>
          <View className="mt-5">
            <Text className="text-3xl text-white font-bold text-center">
                Discover Endless Possibilities with {''}
                <Text className="text-secondary-200">
                  Aora
                </Text>
            </Text>
            <Image className="w-[136px] h-[15px] absolute -bottom-2 -right-8" source={images.path} resizeMode='contain'/>
          </View>
          <Text className="text-sm text-center text-gray-100 font-pregular mt-7">
            Where creativity meets innovation: embark ona joureny of limitless exploration with Aora
          </Text>
          <CustomButton 
            title="Continue with E-mail" 
            containerStyles="mt-7 w-full" 
            handlePress={()=>router.push("/sign-in")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}

