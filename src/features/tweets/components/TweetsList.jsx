function TweetsList({avatar,fullname,content}) {
  return (
    <div className="h-[20%] w-full flex border-b border-gray-300 gap-4">
      <img src={avatar}  className="size-10 rounded-full"/>
      <div>
        <h2>{fullname}</h2>
        <p>{content}</p>
      </div>
    </div>
  )
}

export default TweetsList