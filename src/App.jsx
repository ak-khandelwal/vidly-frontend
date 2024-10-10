import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
       <main className='h-screen bg-[#111111]'>
          <Outlet/>
      </main>
    </>
  )
}

export default App
