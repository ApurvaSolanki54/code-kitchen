import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import TestCaseCard from './TestCaseCard.component';
import DataStructureRelated from './DataStructureRelated.component';

const Description = ({buttonClicked, setClickedButton}) => {
    const { questionId } = useParams();
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [testcases, setTestcases] = useState([])
    const [topics, setTopics] = useState([])
    const [level, setLevel] = useState("")

    useEffect(()=>{
        (async()=>{
            const response = await axios.post("http://localhost:8000/api/v1/getQuestion", {questionId},{withCredentials: true})

            setTitle(response.data.data.title)
            setDescription(response.data.data.description)
            setTopics(response.data.data.topics)
            setLevel(response.data.data.difficultyLevel)
            const testcasesArray = response.data.data.testcase;
            const testcaseObj=[]
            for(let i=0; i<testcasesArray.length; i++){
                const data = {
                    testcaseId: testcasesArray[i]
                }
                const response2 = await axios.post("http://localhost:8000/api/v1/getTestcase", data)
                console.log(response2.data)
                testcaseObj.push(response2.data.data)
            }
            setTestcases(testcaseObj)
        })()
    }, []);

  return (
    <div>
        <div >
            <h1 className='ml-2 flex flex-row text-2xl font-semibold mb-3 font-sans'>{title}</h1>
            <div className='flex'>
                <div class={`${level === "Easy" ? "bg-green-600" : level === "Medium" ? "bg-amber-500" : "bg-red-700"} ml-2 mr-5 relative w-24 grid select-none items-center whitespace-nowrap rounded-lg py-1.5 px-3 font-sans text-xs font-bold uppercase text-white mb-5`}>
                    <span class="">{level}</span>
                </div>
                <DataStructureRelated topics={topics}/>                
            </div>
            <p className='ml-2 flex flex-row font-sans'>
                {description}
            </p>
            <ul>
                {
                    testcases.map((testcase)=>(
                        <li key={testcase._id}>
                            <TestCaseCard 
                                input={testcase.input} 
                                output={testcase.output} 
                                buttonClicked={buttonClicked}
                                setClickedButton={setClickedButton}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}

export default Description