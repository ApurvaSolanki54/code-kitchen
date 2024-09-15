import axios from 'axios';
import React, { useState } from 'react'
import { Select, Option } from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [aboutYou, setAboutYou] = useState('');
    const [gendar, setGendar] = useState('');
    const [phoneNo, setPhoeNo] = useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const data={
            username:userName,
            email,
            fullName,
            password,
            gendar,
            aboutYou,
            phoneNo
        }
        const response = await axios.post("http://localhost:8000/api/v1/users/register", data)
        console.log(response.data.data)
        navigate('/login')
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" 
                    style={{backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')"}}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="John" 
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                                        value={fullName}
                                        onChange={(e)=>{
                                            console.log(e.target.value)
                                            setFullName(e.target.value)
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">User Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Snow" 
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                        value={userName}
                                        onChange={(e)=>{
                                            console.log(e.target.value)
                                            setUserName(e.target.value)
                                        }}
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Phone number</label>
                                    <input 
                                        type="text" 
                                        placeholder="XXX-XX-XXXX-XXX" 
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                        value={phoneNo}
                                        onChange={(e)=>{
                                            console.log(e.target.value)
                                            setPhoeNo(e.target.value)
                                        }}    
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input 
                                        type="email" 
                                        placeholder="johnsnow@example.com" 
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                        value={email}
                                        onChange={(e)=>{
                                            console.log(e.target.value)
                                            setEmail(e.target.value)
                                        }}
                                    />
                                </div>
                            </div>
                                <label className="block mb-2 mt-5 text-sm text-gray-600 dark:text-gray-200">Gender</label>
                                <Select 
                                    value={gendar} onChange={(value)=>setGendar(value)}
                                    label='Select Gender'
                                    variant="standard" 
                                >
                                    <Option value="Male">Male</Option>
                                    <Option value="Female">Female</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            <div className="flex w-full flex-col mt-5 mb-5 gap-6">
                                <Textarea 
                                    variant="standard" 
                                    label="Your Descritption" 
                                    value={aboutYou}
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        setAboutYou(e.target.value)
                                    }}
                                />
                            </div>
                            <div>
                                <label className="block mb-3 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter your password" 
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" 
                                    value={password}
                                    
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        setPassword(e.target.value)
                                    }}
                                />
                            </div>


                            <button
                                className="mt-5 flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                <span>Sign Up </span>

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Register