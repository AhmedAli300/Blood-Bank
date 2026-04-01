import React from 'react'
import { MdOutlineBloodtype } from 'react-icons/md'

export default function Navbar() {
  return (<>
  <nav className="bg-[#FDFEFD] shadow border-b border-b-black/10   h-16 flex items-center px-10 sm:px-20 md:px-40 ">
      <div className="logo flex items-center justify-center gap-2">
        <span className="text-3xl bg-[#e9f2ed] text-[#338e5b] p-1 rounded-xl"><MdOutlineBloodtype /></span>
        <h1 className="font-bold text-2xl ">بنك الدم المصري </h1>
      </div>
    </nav>
  </>)
}
