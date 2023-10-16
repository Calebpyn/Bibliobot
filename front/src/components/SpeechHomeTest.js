import React, { useState } from 'react'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import mascot from '../imgs/cetysMascot.png';
import { BiSolidMicrophone } from 'react-icons/bi';
import AudioBufferToWav from 'audiobuffer-to-wav';
import { v4 as uuidv4 } from 'uuid';

function SpeechHomeTest() {

    const [recogText, setRecogText] = useState('')

    const [listening, setListening] = useState(false)

    const handleListeningState = () => {
        setListening(!listening)
    }

    const [recordState, setRecordState] = useState(RecordState.STOP);

    const startRecording = () => {
        setRecordState(RecordState.START);
    };
      
    const stopRecording = () => {
        setRecordState(RecordState.STOP);
    };

    // const onStop = (audioData) => {
    //     console.log('audioData', audioData);
        
    //     // 1. Crear una URL de objeto para el Blob
    //     // 2. Crear un enlace en el DOM
    //     const a = document.createElement('a');
    //     a.style.display = 'none';
    //     a.href = audioData.url;
    //     a.download = 'grabacion.wav'; // Nombre del archivo .wav que se descargará

    //     // 3. Simular un clic en el enlace para descargar el archivo
    //     document.body.appendChild(a);
    //     a.click();

    //     // 4. Limpiar después de la descarga (opcional)
    //     document.body.removeChild(a);
    //     // URL.revokeObjectURL(blobURL);
    // };
      
    const speechToText = async (fileName) => {
        try {

            await fetch('http://127.0.0.1:5000/recognize', {
                method: 'POST',
                body: JSON.stringify(fileName),
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors'
            })

        } catch(err) {
            console.log(err)
        }
    }


    const onStop = async (audioData) => {
      
        // Obtén el Blob de audio
        const audioBlob = audioData.blob;
      
        // Convertir el Blob en un ArrayBuffer
        const arrayBuffer  = await audioBlob.arrayBuffer();
      
        // Crear un objeto AudioBuffer a partir del ArrayBuffer
        const audioContext = new AudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      
        // Convertir el AudioBuffer a mono
        const audioBufferMono = convertToMono(audioBuffer);
      
        // Crear un Blob a partir del AudioBuffer mono
        const wavBlob = AudioBufferToWav(audioBufferMono);
      
        // Crear una URL de objeto para el Blob mono
        const blobURL = URL.createObjectURL(new Blob([wavBlob], { type: 'audio/wav' }));
      
        // Crear un enlace en el DOM para descargar el archivo mono
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobURL;
        
        const uniqueId = uuidv4()
        const fileName = `${uniqueId}.wav`

        a.download = fileName; // Nombre del archivo .wav mono
      
        // Simular un clic en el enlace para descargar el archivo
        document.body.appendChild(a);
        a.click();


        
        // Limpiar después de la descarga (opcional)
        document.body.removeChild(a);
        URL.revokeObjectURL(blobURL);


        

        const data = {
            "path": `/Users/calebpayan/Downloads/${fileName}`
        }

        speechToText(data);

        

        // fetch('http://127.0.0.1:5000/recognize', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data),
        //     mode: 'no-cors'
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data.result); // El resultado de la función recognize en el servidor
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    };

    function convertToMono(audioBuffer) {
        const channels = audioBuffer.numberOfChannels;
        if (channels === 1) return audioBuffer; // Ya es mono
        
        const audioContext = new AudioContext();
        const frameCount = audioBuffer.length;
        const newAudioBuffer = audioContext.createBuffer(1, frameCount, audioBuffer.sampleRate);
        const channelData = audioBuffer.getChannelData(0);
        newAudioBuffer.copyToChannel(channelData, 0);
        
        return newAudioBuffer;
    }



    return (
        <div className='flex-col justify-between p-10 bg-yellow-400 h-screen w-full items-center'>

            <div className='h-1/2 w-full flex justify-center items-center'>
                <img src={mascot} className={listening ? 'h-0 hover:scale-110 hover:cursor-pointer transitions' : 'h-2/3 hover:scale-110 hover:cursor-pointer transitions'} onClick={() => {
                    handleListeningState()
                    if (!listening) {
                        startRecording()
                    }

                }} />
                <div className={listening ? 'h-[300px] w-[300px] bg-green-700 absolute rounded-full flex justify-center items-center transitions hover:cursor-pointer' : 'h-0 w-0 bg-green-700 absolute rounded-full flex justify-center items-center transitions hover:cursor-pointer'} onClick={() => {
                    handleListeningState()
                    stopRecording()
                }}><BiSolidMicrophone className='text-white text-9xl' /></div>
            </div>

            <div className='w-full h-2/6 flex justify-center items-center'>
                <textarea className={listening ? 'w-3/4 transitions px-7 py-5 rounded-full' : 'w-0 transitions px-0 py-5 rounded-full'}></textarea>
            </div>

            <div className='flex justify-start w-full h-1/6 items-center'>


            </div>
            
            <div className='hidden'>
                <AudioReactRecorder state={recordState} onStop={onStop}/>
            </div>

        </div>
    )
}

export default SpeechHomeTest