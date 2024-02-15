import UserData from "./components/UserData"
import useVisitorData from "./hooks/userInformation"

function App() {
 const {country} = useVisitorData()

  return (
  <div>
     <UserData/>
  </div>
  )
}

export default App
