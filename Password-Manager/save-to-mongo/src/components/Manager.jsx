import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [form, setform] = useState({ site: '', username: '', password: '', notes: '' })
    const [passwordArry, setpasswordArry] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [editId, setEditId] = useState(null)
    const ref = useRef()
    const refPassword = useRef()

    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000');
        let data = await req.json(); // Correct method to parse JSON
        console.log(data);
        setpasswordArry(data);
    }

    useEffect(() => {
        getPasswords()
    }, [])

    const showPassword = () => {
        refPassword.current.type = "password"
        if (ref.current.src.includes("icons/show-password.svg")) {
            ref.current.src = "icons/hide-password.svg"
            refPassword.current.type = "password"
        } else {
            ref.current.src = "icons/show-password.svg"
            refPassword.current.type = "text"
        }
    }

    const showMyManager = () => {
        const myManager = document.querySelector('.mymanager')
        myManager.classList.remove('hidden')
        const showMyManager = document.querySelector('.show-mymanager')
        showMyManager.style.display = 'none'
    }

    const addRecord = async () => {
        const { site, username, password, notes } = form;

        if (!site || !username || !password || !notes) {
            alert("All fields are required. Please fill in all the details.");
            return;
        }

        if (isEditing && editId) {
            const update = { id: editId, site, username, password, notes }
            try {
                const res = await fetch('http://localhost:3000', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(update) })
                if (res.ok) {
                    const updatedPasswords = passwordArry.map(item =>
                        item.id === editId ? { ...form, id: editId } : item
                    );
                    setpasswordArry(updatedPasswords);
                    toast.success('Record Updated Successfully');
                } else {
                    toast.error('Failed to update record');
                }
            } catch (error) {
                console.error('Error updating record:', error)
                toast.error('An error occurred. Please try again')
            }

            // localStorage.setItem('passwords', JSON.stringify(updatedPasswords));
            setIsEditing(false);
            setEditId(null);
        } else {
            const newRecord = { ...form, id: uuidv4() };
            setpasswordArry([...passwordArry, newRecord]);
            // localStorage.setItem('passwords', JSON.stringify([...passwordArry, newRecord]));
            try {
                const res = await fetch('http://localhost:3000', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newRecord) })
                if (res.ok) {
                    setpasswordArry([...passwordArry, newRecord]);
                    toast.success('Record Added Successfully');
                } else {
                    toast.error('Failed to add record');
                }
            } catch (error) {
                console.error('Error adding record:', error);
                toast.error('An error occurred.');
            }
        }

        clearForm();
        const myManager = document.querySelector('.mymanager')
        myManager.classList.add('hidden')
        const showMyManager = document.querySelector('.show-mymanager')
        showMyManager.style.display = 'flex'
    }

    const deleteRecord = async (id) => {
        const removerrecord = passwordArry.filter(item => item.id !== id)
        setpasswordArry(removerrecord)
        // localStorage.setItem('passwords', JSON.stringify(removerrecord))
        const res = await fetch('http://localhost:3000', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }), });
        toast.success('Record Deleted Successfully')
    }

    const updateRecord = (id) => {
        const recordToEdit = passwordArry.find(item => item.id === id);
        setform(recordToEdit);
        setIsEditing(true);
        setEditId(id);
        const myManager = document.querySelector('.mymanager')
        myManager.classList.remove('hidden')
        const showMyManager = document.querySelector('.show-mymanager')
        showMyManager.style.display = 'none'
    }

    const clearForm = () => {
        setform({ site: '', username: '', password: '', notes: '' });
    };

    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const copyText = async (text) => {
        if (!text) {
            alert("Nothing to copy. Value is empty or undefined.");
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            toast.success('Text Copied Successfully');
        } catch (error) {
            console.error("Failed to copy text: ", error);
            alert("Failed to copy. Please try again.");
        }
    };

    const filteredPasswords = passwordArry.filter(item =>
        item.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="colored"
            />

            <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className='text-2xl font-bold italic text-center'>Key<span className='text-cyan-700'>Vault</span></h1>
                <p className='text-cyan-700 font-bold text-sx text-center'>Your own secure vault for all your keys and passwords</p>
                <button onClick={showMyManager} className='my-5 show-mymanager flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                    <lord-icon
                        src="https://cdn.lordicon.com/sbnjyzil.json"
                        trigger="hover"
                        colors="primary:#cffafe,secondary:#a5f3fc">
                    </lord-icon>Add
                </button>
                <div className="flex flex-col gap-8 py-5 items-center mymanager hidden">
                    <input onChange={handelChange} value={form.site} className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="site" placeholder='example.com' required />
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
                        <input onChange={handelChange} value={form.username} className='rounded-full w-full border border-cyan-900 p-3 py-1' type="text" name="username" placeholder='Email / username' required />
                        <div className="relative w-full sm:w-1/2">
                            <input onChange={handelChange} value={form.password} ref={refPassword} className='rounded-full w-full border border-cyan-900 p-3 py-1' type="password" name="password" placeholder='password' required />
                            <span className="absolute right-[5px] top-[6px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} src="icons/hide-password.svg" alt="show-password" />
                            </span>
                        </div>
                    </div>
                    <input onChange={handelChange} value={form.notes} className='rounded-full border border-cyan-900 p-3 py-1 w-full' type="text" name="notes" placeholder='notes' required />
                    <button onClick={addRecord} className='add-record flex items-center justify-center gap-2 bg-cyan-700 text-white rounded-full p-3 py-1 w-fit border-2 hover:border-cyan-900 hover:bg-cyan-600 transition-all duration-300 ease-in-out'>
                        <lord-icon
                            src="https://cdn.lordicon.com/tsrgicte.json"
                            trigger="hover"
                            colors="primary:#cffafe,secondary:#a5f3fc">
                        </lord-icon>
                        {isEditing ? 'Update' : 'Save'}
                    </button>
                </div>
                <hr />
                <div className='pb-8'>
                    <div className='flex flex-col sm:flex-row py-5'>
                        <h2 className='font-bold text-[larger] italic w-full sm:w-1/3'>Your Saved <span className='text-cyan-700 underline'>Passwords</span></h2>
                        {filteredPasswords.length !== 0 && <input
                            type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="rounded-full border border-cyan-900 p-3 py-1 w-full"
                        />}
                    </div>
                    {filteredPasswords.length === 0 && <p className='text-center text-red-700 font-bold italic text-2xl underline'>No Passwords Found</p>}
                    {filteredPasswords.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-center border-l-[1px] border-r-[1px] border-cyan-700">
                                <thead className="bg-cyan-800 text-white">
                                    <tr>
                                        <th scope="col" className="py-2 px-4 border-b-[1px] border-cyan-700">Site</th>
                                        <th scope="col" className="py-2 px-4 border-b-[1px] border-cyan-700">Email / UserName</th>
                                        <th scope="col" className="py-2 px-4 border-b-[1px] border-cyan-700">Password</th>
                                        <th scope="col" className="py-2 px-4 border-b-[1px] border-cyan-700">Notes</th>
                                        <th scope="col" className="py-2 px-4 border-b-[1px] border-cyan-700 border-collapse">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="bg-cyan-100">
                                    {filteredPasswords.map((item, index) => (
                                        <tr key={index}>
                                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-cyan-700 hover:bg-cyan-300">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer" className="text-cyan-700 underline">
                                                    {item.site}
                                                </a>
                                            </td>
                                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-cyan-700 hover:bg-cyan-300">
                                                <div className="inline-flex items-center gap-2" onClick={() => copyText(item.username)}>
                                                    {item.username}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                        colors="primary:#0891b2,secondary:#cffafe"
                                                        className="w-5 h-5 cursor-pointer"
                                                    ></lord-icon>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-cyan-700 hover:bg-cyan-300 flex">
                                                <div className="inline-flex items-center gap-2" onClick={() => copyText(item.password)}>
                                                    <span>{item.password}</span>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                                        trigger="hover"
                                                        colors="primary:#0891b2,secondary:#cffafe"
                                                        className="w-5 h-5 cursor-pointer"></lord-icon>
                                                </div>
                                                <span className="right-[5px] top-[6px] cursor-pointer" onClick={showPassword}><img ref={ref} src="icons/hide-password.svg" alt="show-password" /></span>
                                            </td>
                                            <td className="py-2 px-4 border-b-[1px] border-r-[1px] border-cyan-700 hover:bg-cyan-300">
                                                {item.notes}
                                            </td>
                                            <td className='border-b-[1px]  border-cyan-700'>
                                                <span className='mr-4 cursor-pointer' onClick={() => updateRecord(item.id)}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/exymduqj.json"
                                                        trigger="hover"
                                                        colors="primary:#0e7490,secondary:#164e63"
                                                        className="cursor-pointer w-6 h-6">
                                                    </lord-icon>
                                                </span>
                                                <span onClick={() => deleteRecord(item.id)} className='cursor-pointer'>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/hwjcdycb.json"
                                                        trigger="hover"
                                                        colors="primary:#0e7490,secondary:#164e63"
                                                        className="cursor-pointer w-6 h-6">
                                                    </lord-icon>
                                                </span>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Manager