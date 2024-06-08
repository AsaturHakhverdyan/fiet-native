import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import { icons } from "../constants"

const SearchInput = ({title, value, placeholder, handleChangeText,otherStyles, ...rest}) => {
  return (
    <View className="w-full h-16 px-4  bg-black-100 border-2 border-black-200 rounded-xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput 
        className="flex-1 text-base text-white font-pregular placeholder:text-gray-50"
        value={value} 
        onChangeText={handleChangeText} 
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"  
      />
        <TouchableOpacity>
          <Image source={icons.search} className="w-5 h-5" resizeMode='contain'/>
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput