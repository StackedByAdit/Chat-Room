import MessageBox from './MessageBox'
import Messages from './Messages'

export const MiddleComponent = () => {
  return (
    <div style={{height:"100vh", width:"60%"}}>
        <Messages/>
        <MessageBox/>
    </div>
  )
}

export default MiddleComponent