import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActive } from "../../app/slices/dashboard"

const ContentPlaylist = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActive([0,1,0]))
  })
  return (
    <div>ContentPlaylist</div>
  )
}

export default ContentPlaylist
