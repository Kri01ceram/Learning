import  AuthBanner  from '../componenets/AuthBanner'
import  AuthCredentials  from '../componenets/AuthCredentials'
export function
Auth() {
  return (
    <div style = {{display: 'flex'}}>
      <div style = {{flex: 1}}><AuthBanner /> </div>
      <div style = {{flex: 1}}><AuthCredentials /></div>
      
      
    </div>
  )
}