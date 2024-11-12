function GradientBg({style1,style2,style3,children}) {
  return (
    <div className={`relative  h-full `+style1} >
      <div
        className={"absolute -inset-px bg-gradient-to-tl to-[#562F7C] to-[70%] from-[#D52F79] " + style2}
        aria-hidden="true"
      ></div>
      <div
        className={"absolute inset-0 bg-zinc-900 text-white "+style3}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

export default GradientBg