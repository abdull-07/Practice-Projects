import React from 'react'
import { useRef, useState, useEffect } from 'react'

const Manager = () => {

    const [form, setform] = useState({ site: '', username: '', password: '', notes: '' })
    const [passwordArry, setpasswordArry] = useState([])

    useEffect(() => {
        let data = localStorage.getItem('passwords')
        if (data) {
            setpasswordArry(JSON.parse(data))
        }

    }, [])


    const ref = useRef()
    const showPassword = () => {
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

    const addRecord = () => {
        setpasswordArry([...passwordArry, form])
        localStorage.setItem('passwords', JSON.stringify([...passwordArry, form]))
        console.log([...passwordArry, form])
        const myManager = document.querySelector('.mymanager')
        myManager.classList.add('hidden')
        const showMyManager = document.querySelector('.show-mymanager')
        showMyManager.style.display = 'flex'
    }

    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

            <div className="max-w-4xl mycontainer ">
                <h1 className='text-2xl font-bold italic text-center'>Key<span className='text-cyan-700'>Vault</span></h1>
                <p className='text-cyan-700 font-bold text-sx'>Your own secure vault for all your keys and passwords</p>
                <button onClick={showMyManager} className='mb-5 show-mymanager flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#cffafe,secondary:#a5f3fc">
                    </lord-icon>Add
                </button>
                <div className="flex flex-col gap-8 py-5 items-center mymanager hidden">
                    <input onChange={handelChange} value={form.site} className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="site" id="" placeholder='example.com' />
                    <div className="flex gap-4 w-full justify-between">
                        <input onChange={handelChange} value={form.username} className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="username" id="" placeholder='username' />
                        <div className="relative w-1/2">
                            <input onChange={handelChange} value={form.password} className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="password" id="" placeholder='password' />
                            <span className="absolute right-[5px] top-[6px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} src="icons/hide-password.svg" alt="show-password" />
                            </span>
                        </div>
                    </div>
                    <input onChange={handelChange} value={form.notes} className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="notes" id="" placeholder='notes' />
                    <button onClick={addRecord} className='add-record flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"
                            colors="primary:#cffafe,secondary:#a5f3fc">
                        </lord-icon>Add
                    </button>
                </div>
                <hr />
                <div>
                    <h2 className='py-5 font-bold text-[larger] italic'>Your Saved <span className='text-cyan-700 underline'>Passwords</span></h2>
                    <table class="table-auto w-full text-center border-l-[1px] border-r-[1px] border-cyan-700">
                        <thead class="bg-cyan-800 text-white">
                            <tr>
                                <th scope="col" class="py-2 border-b-[1px] border-cyan-700">Site</th>
                                <th scope="col" class="py-2 border-b-[1px] border-cyan-700">UserName</th>
                                <th scope="col" class="py-2 border-b-[1px] border-cyan-700">Password</th>
                                <th scope="col" class="py-2 border-b-[1px] border-cyan-700">Notes</th>
                            </tr>
                        </thead>
                        <tbody class="bg-cyan-50">
                            <tr>
                                <td class="py-2 border-b-[1px] border-r-[1px] border-cyan-700">The Sliding Mr. Bones</td>
                                <td class="py-2 border-b-[1px] border-r-[1px]  border-cyan-700">Malcolm Lockyer</td>
                                <td class="py-2 border-b-[1px] border-r-[1px]  border-cyan-700">1961</td>
                                <td class="py-2 border-b-[1px] border-r-[1px] border-cyan-700">Lorem ipsum dolor sit amet.</td>
                            </tr>
                            <tr>
                                <td class="py-2 border-b-[1px] border-r-[1px] border-cyan-700">The Sliding Mr. Bones</td>
                                <td class="py-2 border-b-[1px] border-r-[1px]  border-cyan-700">Malcolm Lockyer</td>
                                <td class="py-2 border-b-[1px] border-r-[1px]  border-cyan-700">1961</td>
                                <td class="py-2 border-b-[1px] border-r-[1px] border-cyan-700">Lorem ipsum dolor sit amet.</td>
                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>

        </>
    )
}

export default Manager
