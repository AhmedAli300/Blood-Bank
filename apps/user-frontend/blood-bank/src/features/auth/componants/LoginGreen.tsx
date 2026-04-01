import { MdOutlineBloodtype } from 'react-icons/md'

export default function LoginGreen() {
  return (
    <>
        <div className="md:w-1/3 bg-(--primary-color) p-10 text-white flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <MdOutlineBloodtype className="text-4xl text-white" />
                  </div>
                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold">بنك الدم المصري</h1>
                    <p className="text-sm font-light opacity-90">شارك الحياة، تبرع بالدم</p>
                  </div>
                </div>
    </>
  )
}
