function SubscriberList({avatar, fullname, subscribers}) {
  return (
    <div className="w-full h-[30%] flex justify-between m-4">
      <div className="flex gap-6">
        <img src={avatar} alt="logo" className="size-10 rounded-full" />
        <div>
          <div>{fullname}</div>
        <div>{subscribers} subscribers</div>
        </div>
      </div>
      <button
              className="w-32 my-1 text-black bg-[#ae7aff] active:translate-x-1 active:translate-y-1 flex items-center justify-center mr-9 select-none"
            >
              Subscribe
            </button>
    </div>
  )
}

export default SubscriberList