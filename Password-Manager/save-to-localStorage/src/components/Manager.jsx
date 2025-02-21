import React from 'react'
import { useRef } from 'react'

const Manager = () => {
    const ref = useRef()
    const showPassword = () => {
        console.log(ref.current.src)
        if (ref.current.src.includes("icons/show-password.svg")) {
            ref.current.src = "icons/hide-password.svg"
        } else {
            ref.current.src = "icons/show-password.svg"
        }
    }

    const showMyManager = () => {
        const myManager = document.querySelector('.mymanager')
        myManager.classList.remove('hidden')
        const showMyManager = document.querySelector('.show-mymanager')
        showMyManager.style.display = 'none'
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

            <div className="max-w-4xl mycontainer ">
                <h1 className='text-2xl font-bold italic text-center'>Key<span className='text-cyan-700'>Vault</span></h1>
                <p className='text-cyan-700 font-bold text-sx'>Your own secure vault for all your keys and passwords</p>
                <button onClick={showMyManager} className='show-mymanager flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#cffafe,secondary:#a5f3fc">
                    </lord-icon>Add
                </button>
                <div className="flex flex-col gap-8 py-5 px-10 items-center mymanager hidden">
                    <input className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="" id="" placeholder='example.com' />
                    <div className="flex gap-4 w-full justify-between">
                        <input className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="" id="" placeholder='username' />
                        <div className="relative w-1/2">
                            <input className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="" id="" placeholder='password' />
                            <span className="absolute right-[5px] top-[6px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} src="icons/hide-password.svg" alt="show-password" />
                            </span>
                        </div>
                    </div>
                    <input className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="" id="" placeholder='notes' />
                    <button className='add-record flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"
                            colors="primary:#cffafe,secondary:#a5f3fc">
                        </lord-icon>Add
                    </button>
                </div>
            </div>

        </>
    )
}

export default Manager
