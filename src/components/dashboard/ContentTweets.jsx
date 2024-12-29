import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setActive } from "../../app/slices/dashboard"

const ContentTweets = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActive([0,0,1]))
  })
  return (
    <div>ContentTweets</div>
  )
}

export default ContentTweets
