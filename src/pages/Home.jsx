import {NavBar,SideBar,EmptyVideoPage} from "../components/index"
function Home() {
  return (
    <>
    <nav className="h-[10%]">
      <NavBar />
    </nav>
    <main className="h-[90%] flex">
      <SideBar />

      <EmptyVideoPage
      title={"No videos available"}
      description1={"There are no videos here available. Please try to"}
      description2={"search some thing else."} />
    </main>
    </>
  )
}

export default Home