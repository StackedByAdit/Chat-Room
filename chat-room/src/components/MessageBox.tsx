import React, {useRef} from 'react'

export const MessageBox = () => {
  const inputMessage = useRef<HTMLInputElement| null>(null);

  function handleInput() {
    if(!inputMessage.current){
      return;
    }
    console.log(inputMessage.current.value)
  }
  return (
    <div>
        <div style={{display:'flex', gap:10}}>
        <input ref={inputMessage} style={{padding:10, borderRadius:15, boxShadow: '2px 2px 5px red, -2px -2px 5px blue', width:"90%"}} type='text' placeholder='say Hello'></input>
        <button onClick={handleInput} style={{padding:1, borderRadius:15, boxShadow: '2px 2px 5px red, -2px -2px 5px blue', width:"10%" }}>Send</button>
        </div>
    </div>
  )
}

export default MessageBox