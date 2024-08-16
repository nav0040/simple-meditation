import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Audio } from 'expo-av'

import meditationImages from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import CustomButton from '@/components/CustomButton'
import { MEDITATION_DATA,AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContext } from '@/context/TimerContext'

const Meditate = () => {

  const { id } = useLocalSearchParams();

  const { duration:secondsRemaining, setDuration} = useContext(TimerContext)


  // const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [playingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    
    let timerId: NodeJS.Timeout;
   
    
    // Exit
    if(secondsRemaining === 0){
      setIsMeditating(false);
      return;
    }

    if(isMeditating){
      timerId = setTimeout(()=>{
        setDuration(secondsRemaining -1);
      },1000)
      
    
    }

   
    return () => {
      clearTimeout(timerId);
    }
  }, [secondsRemaining,isMeditating]);


  // Format the time left to ensure two digits are displayed
  const formattedMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2,"0");

  const formattedSeconds = String(secondsRemaining % 60).padStart(2,"0");


  const toggleMeditationSessionStatus =async()=>{
    if(secondsRemaining === 0) setDuration(10);

    setIsMeditating(!isMeditating);

    await toggleSound();
  }

  const toggleSound = async()=>{
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if(status?.isLoaded){
      await sound.playAsync();
      setPlayingAudio(true);
    }else{
      await sound.pauseAsync();
      setPlayingAudio(false);
    }
  }

  const initializeSound = async()=>{
    const audioFileName = MEDITATION_DATA[Number(id) -1].audio;

    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[audioFileName]
    );

    setSound(sound);
    return sound;
  }


  const handleAdjustDuration =() => {
    if(isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration");
  }

  useEffect(() => {
    
  
    return () => {
      setDuration(10)
      audioSound?.unloadAsync();
    }
  }, [audioSound])
  
  
  return (
    <View className='flex-1'>
      <ImageBackground 
      source={meditationImages[Number(id)-1]}
      resizeMode='cover'
      className='flex-1'
      >
        <AppGradient
         colors={['transparent', "rgba(0,0,0,0.8)"]}
        >
          <Pressable
           onPress={()=> router.back()}
           className='absolute top-16 left-10 z-10'
          >
            <AntDesign name='leftcircleo' size={50} color={"white"} />
          </Pressable>

          <View className='flex-1 justify-center'>
            <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
              <Text className='text-3xl font-rmono'>
                {formattedMinutes}:{formattedSeconds}
              </Text>
            </View>
          </View>

          <View className='mb-5'>

          <CustomButton 
              title='Adjust duration'
              onPress={handleAdjustDuration}
            />
            <CustomButton 
              title={isMeditating ? 'Stop':'Start Meditattion'}
              onPress={toggleMeditationSessionStatus}
              containerStyle='mt-4'
            />

          </View>


        </AppGradient>

      </ImageBackground>
    </View>
  )
}

export default Meditate