import React, { useState } from 'react'
// import { useSpeechRecognition } from 'react-speech-recognition'
import {useSpeechSynthesis} from 'react-speech-kit'

function SpeechRec() {

  const [value, setValue] = useState('')

  const {speak} = useSpeechSynthesis();

  return (
    <div className='flex justify-center items-center h-screen w-full'>

        <div className='flex-col justify-between h-1/2 w-1/2 items-center'>
            <div className='flex items-center shadow-lg mb-7 p-10 rounded-lg'>
                <textare
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
            </div>
            <div className='flex justify-between mt-6'>
                <button className='bg-green-900 text-green-200 px-5 py-3 rounded-lg shadow-lg' onClick={() => {
                  speak({text: value})
                }}>Start Listening</button>
                <button className='bg-red-900 text-red-200 px-5 py-3 rounded-lg shadow-lg'>Stop Listening</button>
            </div>

        </div>
        
    </div>
  )
}

export default SpeechRec