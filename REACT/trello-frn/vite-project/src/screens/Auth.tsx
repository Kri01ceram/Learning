import  AuthBanner  from '../componenets/AuthBanner'
import  AuthCredentials  from '../componenets/AuthCredentials'
export function
Auth() {
  return (
    <div style = {{display: 'flex'}}>
      <div style = {{flex: 4}}><AuthBanner /> </div>
      <div style = {{flex: 6}}><AuthCredentials /></div>
      
      
    </div>
  )
}