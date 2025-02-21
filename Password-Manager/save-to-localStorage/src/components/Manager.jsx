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
        const { site, username, password, notes } = form;

        if (!site || !username || !password || !notes) {
            alert("All fields are required. Please fill in all the details.");
            return;
        }

        clearForm();

        setpasswordArry([...passwordArry, form])
        localStorage.setItem('passwords', JSON.stringify([...passwordArry, form]))
        console.log([...passwordArry, form])
        const myManager = document.querySelector('.mymanager')
        myManager.classList.add('hidden')
        const showMyManager = document.querySelector('.show-mymanager')
        showMyManager.style.display = 'flex'
    }

    const clearForm = () => {
        setform({ site: '', username: '', password: '', notes: '' });
    };

    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

            <div className="max-w-5xl mycontainer ">
                <h1 className='text-2xl font-bold italic text-center'>Key<span className='text-cyan-700'>Vault</span></h1>
                <p className='text-cyan-700 font-bold text-sx'>Your own secure vault for all your keys and passwords</p>
                <button onClick={showMyManager} className='my-5 show-mymanager flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#cffafe,secondary:#a5f3fc">
                    </lord-icon>Add
                </button>
                <div className="flex flex-col gap-8 py-5 items-center mymanager hidden">
                    <input onChange={handelChange} value={form.site} className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="site" id="" placeholder='example.com' required />
                    <div className="flex gap-4 w-full justify-between">
                        <input onChange={handelChange} value={form.username} className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="username" id="" placeholder='Email / username' required />
                        <div className="relative w-1/2">
                            <input onChange={handelChange} value={form.password} className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="password" id="" placeholder='password' required />
                            <span className="absolute right-[5px] top-[6px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} src="icons/hide-password.svg" alt="show-password" />
                            </span>
                        </div>
                    </div>
                    <input onChange={handelChange} value={form.notes} className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="notes" id="" placeholder='notes' required />
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
                    {passwordArry.length === 0 && <p className='text-center text-red-700 font-bold italic text-2xl underline'>No Passwords Saved Yet</p>}
                    {passwordArry.length !== 0 && <table className="table-auto w-full text-center border-l-[1px] border-r-[1px] border-cyan-700">
                        <thead className="bg-cyan-800 text-white">
                            <tr>
                                <th scope="col" className="py-2 border-b-[1px] border-cyan-700">Site</th>
                                <th scope="col" className="py-2 border-b-[1px] border-cyan-700">Email / UserName</th>
                                <th scope="col" className="py-2 border-b-[1px] border-cyan-700">Password</th>
                                <th scope="col" className="py-2 border-b-[1px] border-cyan-700">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-cyan-50">
                            {passwordArry.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="py-2 border-b-[1px] border-r-[1px] border-cyan-700"><a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a></td>
                                        <td className="py-2 border-b-[1px] border-r-[1px] border-cyan-700">{item.username}</td>
                                        <td className="py-2 border-b-[1px] border-r-[1px] border-cyan-700">{item.password}</td>
                                        <td className="py-2 border-b-[1px] border-r-[1px] border-cyan-700">{item.notes}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>}

                </div>

            </div>

        </>
    )
}

export default Manager
