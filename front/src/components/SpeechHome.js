import React, { useState, useRef } from 'react';
import mascot from '../imgs/cetysMascot.png';
import { BiSolidMicrophone } from 'react-icons/bi';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

function SpeechHome() {

    const [listening, setListening] = useState(false);

    const handleListeningState = () => {
        setListening(!listening);
    }

    const recorderControls = useAudioRecorder({
        noiseSuppression: true,
        echoCancellation: true
    },(err) => console.table(err));


    const addAudioElement = (blob) => {
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        // audio.controls = true;
        document.body.appendChild(audio);

        const formData = new FormData();
        formData.append('audio', blob, 'test.wav');
      
        // Realizar una solicitud POST al servidor para enviar el blob
        fetch('http://127.0.0.1:5000/recognize', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Manejar la respuesta del servidor
            console.log(data.resultado);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

      };


    // //Audio visual

    // const analyserCanvas = React.useRef(null);

    // const audioTest = async () => {
    //     if (navigator.mediaDevices.getUserMedia !== null) {
    //         const options = {
    //           video: false,
    //           audio: true,
    //         };
    //          try {
    //             const stream = await navigator.mediaDevices.getUserMedia(options);
    //          }catch (err) {
    //           // error handling
    //           }
    // }


    return (
        <div className='flex-col justify-between p-10 bg-yellow-400 h-screen w-full items-center'>

            <div className='h-1/2 w-full flex justify-center items-center'>
                <img src={mascot} className={listening ? 'h-0 hover:scale-110 hover:cursor-pointer transitions': 'h-2/3 hover:scale-110 hover:cursor-pointer transitions'} onClick={() => {
                    handleListeningState()
                    if(listening){
                        recorderControls.stopRecording()
                    }else{
                        recorderControls.startRecording()
                    }

                }}/>
                <div className={listening ? 'h-[300px] w-[300px] bg-green-700 absolute rounded-full flex justify-center items-center transitions hover:cursor-pointer': 'h-0 w-0 bg-green-700 absolute rounded-full flex justify-center items-center transitions hover:cursor-pointer'} onClick={() => {
                    handleListeningState()
                    recorderControls.stopRecording()
                }}><BiSolidMicrophone className='text-white text-9xl' /></div>
            </div>

            <div className='w-full h-2/6 flex justify-center items-center'>
                <textarea className={listening ? 'w-3/4 transitions px-7 py-5 rounded-full' : 'w-0 transitions px-0 py-5 rounded-full'}></textarea>
            </div>

            <div className='flex justify-start w-full h-1/6 items-center'>

                <AudioRecorder
                    onRecordingComplete={(blob) => addAudioElement(blob)}
                    recorderControls={recorderControls}
                    downloadOnSavePress={true}
                    downloadFileExtension="wav"
                    showVisualizer={true}
                />

            </div>
            


        </div>
    )
}

export default SpeechHome