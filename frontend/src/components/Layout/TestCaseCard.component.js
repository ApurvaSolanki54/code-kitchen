import React, { useState } from 'react'

const TestCaseCard = ({input, output, buttonClicked, setClickedButton}) => {
    const handleButton = (input) =>{
        setClickedButton(true)
        buttonClicked(input)
    }
    return (
        <div>
            <div className='grid grid-cols-2 gap-5'>
                <div className="relative mt-6 text-gray-700 bg-white  bg-clip-border rounded-xl w-full">
                    <div className="p-6 grid grid-cols-2 gap-5 text-wrap">
                        <div className='flex'>
                            <h5 className="text-left block mb-2 mr-2 font-sans antialiased font-bold text-base leading-snug tracking-normal text-blue-gray-900">
                                Input: 
                            </h5>
                            <div className='font-light text-base'>{input}</div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={() => handleButton(input)}
                                className="flex items-center justify-center w-5 h-5 bg-gray-800 rounded-full"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z" />
                                </svg>
                            </button>
                        </div>

                    </div>
                </div>
                <div className="relative mt-6 text-gray-700 bg-white  bg-clip-border rounded-xl w-full">
                    <div className="p-6 text-wrap">
                        <div className='flex'>
                            <h5 className="text-left block font-sans font-bold text-base mr-2 antialiased leading-snug tracking-normal text-blue-gray-900">
                                Output: 
                            </h5>
                            <div className='font-light text-base'>
                                {output}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default TestCaseCard