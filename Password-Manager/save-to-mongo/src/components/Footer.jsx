import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-cyan-100 absolute bottom-0 w-full overflow-x-hidden'>
            <div className="mycontainer flex flex-col md:flex-row text-black justify-between items-center font-bold italic py-2 max-w-4xl mx-auto">
                <div>
                    <h1>Key<span className='text-cyan-700'>Vault</span></h1>
                </div>
                <div className='mt-2 md:mt-0 text-center md:text-left'>
                    <h1>
                        Made with ❤ by <span className='text-cyan-700 font-bold italic'>Abdul</span>.
                        <span className='text-yellow-700 font-bold italic'> Stay secure</span>,
                        <span className='text-green-700 font-bold italic'> stay safe!</span>
                    </h1>
                </div>
            </div>
        </footer>
    )
}

export default Footer
