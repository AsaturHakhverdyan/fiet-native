import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import {images} from "../../constants"
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [formSubmiting, setFormSubmiting] = useState(false)


 const submitHandle = async () => {
    if(!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields")
      setFormSubmiting(true)
    }try {
      await signIn(
        form.email,
        form.password,
      )
      router.replace("/home")
    } catch (error) {
      Alert.alert("Error", error.message)
    }finally{
      setFormSubmiting(false)
    }
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image source={images.logo} className="w-[115px] h-[35px]" resizeMode='contain'/>
          <Text className="text-2xl text-white mt-10 font-psemibold">Log in to Aora</Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
          />
          <CustomButton 
            title="Sign In" 
            containerStyles="mt-[60px]"
            handlePress={submitHandle}  
            isLoading={formSubmiting}
          />
          <View className="justify-center gap-2 p-5 flex-row">
            <Text className="text-lg text-gray-100 font-pregular">
                Don't have account?
            </Text>
              <Link href="/sign-up" className='text-secondary font-psemibold text-lg'>
                Sign Up
              </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
