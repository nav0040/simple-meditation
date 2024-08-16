import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import beachImage from '@/assets/meditation-images/beach.webp'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';
import AppGradient from '@/components/AppGradient';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View className='flex-1'>
      <ImageBackground
        source={beachImage}
        resizeMode='cover'
        className='flex-1'
      >

        <AppGradient
        colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
        >
       

          <SafeAreaView className='flex-1 px-1 justify-between'>
            <View>
              <Text className='text-center text-white font-bold text-4xl'>
                Simply Meditation
              </Text>
              <Text className='text-center text-white text-regular text-xl'>
                Simplifying Meditation for Everyone
              </Text>
            </View>

            <View>
               <CustomButton
                 onPress={()=> router.push('/nature-meditate')}
                  title="Get Started"
               />
            </View>

            <StatusBar style="light" />
          </SafeAreaView>
        
        </AppGradient>
      </ImageBackground>
    </View>
  )
}


// const styles = StyleSheet.create({
//     container:{
//         alignItems:'center',
//         flex:1,
//         justifyContent:'center',
//         backgroundColor:'white'
//     }
// })