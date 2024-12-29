import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActive } from "../../app/slices/dashboard"

const ContentVideo = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActive([1,0,0]))
  })
  return (
    <div>ContentVideo</div>
  )
}

export default ContentVideo
