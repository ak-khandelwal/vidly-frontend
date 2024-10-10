function EmptyVideoPage({title,description1,description2}) {
  return (
    <div className="w-[80%] h-full flex flex-col justify-center items-center text-white">
      <img src="src/assets/play.jpeg" className="size-14 mb-4" />
      <span>{title}</span>
      <p className="text-slate-300">{description1}</p>
      <p className="text-slate-300">{description2}</p>
    </div>
  )
}

export default EmptyVideoPage