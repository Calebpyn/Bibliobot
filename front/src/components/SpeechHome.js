import React, { useState, useRef } from 'react';
import mascot from '../imgs/cetysMascot.png';
import { BiSolidMicrophone } from 'react-icons/bi';

function SpeechHome() {

    const [listenign, setListening] = useState(false);

    const handleListeningState = () => {
        setListening(!listenign);
    }

    // const [permission, setPermission] = useState(false);
    const [stream, setStream] = useState(null);

    const getMicrophonePermission = async () => {
        if ("MediaRecorder" in window) {
            try {
                const streamData = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                });
                // setPermission(true);
                setStream(streamData);
            } catch (err) {
                alert(err.message);
            }
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };


    return (
        <div className='flex-col justify-between p-10 bg-yellow-400 h-screen w-full items-center'>

            <div className='h-2/3 w-full flex justify-center items-center'>
                <img src={mascot} className={listenign ? 'h-0 hover:scale-110 hover:cursor-pointer transitions': 'h-1/2 hover:scale-110 hover:cursor-pointer transitions'} onClick={handleListeningState}/>
                <div className={listenign ? 'h-[300px] w-[300px] bg-green-700 absolute rounded-full flex justify-center items-center transitions': 'h-0 w-0 bg-green-700 absolute rounded-full flex justify-center items-center transitions'} onClick={handleListeningState}><BiSolidMicrophone className='text-white text-9xl' /></div>
            </div>

            <div className='w-full h-1/3 flex justify-center items-center'>
                <textarea className={listenign ? 'w-3/4 transitions px-7 py-5 rounded-full' : 'w-0 transitions px-0 py-5 rounded-full'}></textarea>
            </div>
            <button onClick={getMicrophonePermission} type="button">
                Get Microphone
            </button>
            <button type="button">
                Record
            </button>

        </div>
    )
}

export default SpeechHome