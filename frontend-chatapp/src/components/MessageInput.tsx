import { useState } from "react"

export default function MessageInput({send}: { send: (val:string) => void}) {
    const [value, setValue] = useState ("")
  return (<> 
  {/* with onChange, we are telling our program to change the state of our message input*/}
    <input onChange={((e)=> setValue(e.target.value))} placeholder="Type your message..." value={value} />
    <button onClick={() => send(value)}>Send</button>
  </>)
}
