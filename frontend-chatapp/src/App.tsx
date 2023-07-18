import { useEffect, useState } from 'react'
import './App.css'
import io, { Socket } from 'socket.io-client'
import MessageInput from './components/MessageInput'
import Messages from './components/Messages'

function App() {
  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<string[]>([])

  const send = (value: string) => {
    socket?.emit("message", value)
  } //this function will be called whenever we hit the send button

  //useEffect runs a function after a component has been rendered
  useEffect(() => {
    const newSocket = io("http://localhost:8001")
    setSocket(newSocket)
  }, [setSocket])

  //setting up the message listener - this function will listened to events coming from our nestjs backend, so whenever we emit an event called message from our gateway this function will be run
  const messageListener = (message: string) => {
    setMessages([...messages, message]) // we pass in an empty array to the const messages above and
  }

  useEffect(() => {
    socket?.on("message", messageListener)
    return() => {
      socket?.off("message", messageListener)
     } //cleanup function
}, [messageListener]) //passing messageListener as dependency
  return <>
    {""}
    <MessageInput send={send}/>
    <Messages messages={messages}/>
  </>
}

export default App
