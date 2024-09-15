import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoadingTable from '../Loading/LoadingTable';
import Cookies from 'js-cookie';
import { getAllAccepted } from '../User/user';


const Question = () => {
  let auth = Cookies.get('XSRF-TOKEN')
    const config = {
        headers: {
          'X-XSRF-TOKEN': auth
        }
    };
  const [questions, setQestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [userSolvedTitle, setUserSolvedTitle]=useState([])
    useEffect(()=>{
        (async()=>{
          setUserSolvedTitle(await getAllAccepted())
          const response = await axios.get("http://localhost:8000/api/v1/getAllQuestion", 
          {
            withCredentials: true, 
          })
          console.log("questions:", response.data)
          setQestions(response.data.data)

          setLoading(false)
        })()
      }, [])// Empty dependency array ensures this effect runs only once when component mounts

  return (
    <div>
      {
        loading ? <LoadingTable/>:<div class="flex flex-col">
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="bg-gray-200 border-b">
                  <tr>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 text-left">
                      No
                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 font-semibold text-2xl uppercase tracking-wide mb-8 px-6 py-4 text-center">
                    <div class="">
                      Title
                    </div>
                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 uppercase text-center">
                      Status
                    </th>
                    <th scope="col" class="text-base font-medium text-gray-900 px-6 py-4 uppercase text-center">
                      Difficulty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => {
                    return (
                      <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td class="px-6 py-4 whitespace-nowrap font-normal text-base tracking-tight text-gray-900 dark:text-white ">{index}</td>
                        <td class="text-sm text-gray-900 font-normal text-base px-6 py-4 whitespace-nowrap">
                            <Link 
                              to={`/question/${question._id}`} onClick={()=>console.log("click: ", question._id)}>{question.title}</Link>  
                        </td>
                        <td class="text-base font-normal text-base text-gray-900 px-6 py-4 whitespace-nowrap">
                          {
                            question.statusOfSubmission ==="Not Solved" ? 
                            <div>Not Solved</div> : question.statusOfSubmission === "Accepted" ? 
                            <div>Accepted</div> : <div>Attempted</div>
                          }
                        </td>
                        <td class={`text-sm text-gray-900 font-medium text-base px-6 py-4 whitespace-nowrap 
                          ${question.difficultyLevel === "Easy" ? "text-green-900" : question.difficultyLevel === "Medium" ? "text-orange-400" : "text-red-600"}`}>
                          {question.difficultyLevel}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      }
      
    </div>
  )
}

export default Question