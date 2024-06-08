import { View, Text, Image } from 'react-native'
import {images} from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

const EmptyState = ({title, subTitle}) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode='contain'/>
       <Text className="text-sm font-pmedium text-secondary-100">
          {title}
        </Text>
        <Text className="text-xl text-center font-psemibold text-white mt-2">
          {subTitle}
        </Text>
        <CustomButton title="Back to explore" handlePress={() => router.push("/search")} containerStyles="w-full mt-5"/>
    </View>
  )
}

export default EmptyState