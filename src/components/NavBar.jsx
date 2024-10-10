import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className="h-full  border-b border-white flex justify-between items-center px-2">
      <img src="src/assets/ytlogo.jpeg" className="h-[60%]" />

      <div className="border border-white h-[60%] w-2/6  flex">
        <div className="w-[10%] h-full  pr-1 flex flex-col items-center justify-center">
          <img src="src/assets/search.svg" className="w-[50%]"/>
        </div>
        <input type="text" placeholder="Search" className="text-white bg-transparent outline-none w-[80%]" />
      </div>

      <div className="h-[60%] flex select-none">
          <Link to={"/Login"}>
        <div className="w-20 h-[90%] hover:bg-[#3432326b] text-white flex flex-col text-center justify-center">Log in</div>
          </Link>
        <Link to={"/register"}>
        <div className="w-20 h-[90%] bg-[#ae7aff] text-black font-bold shadow-[5px_5px_#4f4e4e] active:shadow-none active:translate-x-1 active:translate-y-1 flex flex-col text-center justify-center ">Sign up</div>
        </Link>
      </div>

    </div>
  )
}

export default NavBar