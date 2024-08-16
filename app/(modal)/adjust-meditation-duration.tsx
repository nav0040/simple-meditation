import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { TimerContext } from '@/context/TimerContext'

const AdjustMeditationDuration = () => {

  const { setDuration } = useContext(TimerContext);


  const handlPress = (duration:number)=>{

     setDuration(duration);
     router.back();
  }


  return (
    <View className='flex-1 relative'>
      <AppGradient colors={["#161b2e","#0a4d4a","#766e67"]}>
        <Text>Test</Text>
        <Pressable
         onPress={()=> router.back()}
         className='absolute top-12 left-6 z-10'
        >
          <AntDesign name='leftcircleo' size={50} color={"white"} />
        </Pressable>

        <View className='justify-center h-4/5'>
          <Text className='text-center font-bold text-2xl text-white mb-8'>
            Adjust your meditation duration
          </Text>

          <View>
            <CustomButton
              title='10 seconds'
              onPress={()=> handlPress(10)}
              containerStyle='mb-5'
            />
            <CustomButton
              title='5 minutes'
              onPress={()=> handlPress(5 * 60)}
              containerStyle='mb-5'
            />
            <CustomButton
              title='10 minutes'
              onPress={()=> handlPress(10 * 60)}
              containerStyle='mb-5'
            />
            <CustomButton
              title='15 minutes'
              onPress={()=> handlPress(15 * 60)}
              containerStyle='mb-5'
            />
          </View>
        </View>
      </AppGradient>
    </View>
  )
}

export default AdjustMeditationDuration