import React, { useEffect, useState } from 'react'
import mascot from '../imgs/cetysMascot.png'
import io from 'socket.io-client'
import { socket } from '../socket'

function Home() {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    socket.emit('connection')

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);


  return (
    <div className='bg-yellow-300 h-screen w-full flex-col justify-center items-center'>

      <div className='h-2/3 flex-col justify-between'>

        <div className='flex w-full justify-center items-center h-1/4'>
          <div className='bg-yellow-400 rounded-full flex justify-center items-center px-10 py-4 shadow-xl'>
            <h1 className='font-black text-xl text-yellow-900'>Presiona para hablar...</h1>
          </div>
          <div className='bg-yellow-400 rounded-full flex justify-center items-center ml-9 px-10 py-4 shadow-xl hover:scale-110 transitions hover:cursor-pointer'>
            <h1 className='font-black text-xl text-yellow-900'>Ayuda</h1>
          </div>
        </div>

        <div className='w-full h-3/4 flex justify-center'>
          <img src={mascot} className='h-full hover:cursor-pointer hover:scale-110 transitions' />
        </div>

      </div>

      <div className='flex w-full justify-between h-1/3 p-8'>

        <div className='w-1/2 flex justify-center'>
          <textarea className='w-4/5 mb-10 rounded-3xl shadow-xl p-5 border-2 border-gray-400 focus:outline-none'></textarea>
        </div>

        <div className='w-1/2 flex justify-center'>
          <textarea className='w-4/5 mb-10 rounded-3xl shadow-xl p-5 border-2 border-gray-400 focus:outline-none'></textarea>
        </div>

      </div>

    </div>
  )
}

export default Home