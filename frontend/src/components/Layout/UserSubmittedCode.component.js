import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import React, { useState } from 'react'
import Description from './Description.component';
import axios from 'axios';
import ListOfStatus from './ListOfStatus.componenet';

const UserSubmittedCode = ({buttonClicked, setClickedButton, questionId}) => {
    const [codesAndStatus, setCodesAndStatus] = useState([])
    const [activeTab, setActiveTab] = useState("description")
    async function handleFunction(value){
        setActiveTab(value)
        console.log("active tab: ", value)
        if(value==="submission"){
            const response = await axios.post('http://localhost:8000/api/v1/userCodes', 
                {questionId}, {withCredentials: true,}
            );
            console.log("question-codes: handl ", response.data);
            setCodesAndStatus(response.data.data);
        }
    }
    const dataArray = [
        {
            label: "Description",
            value: "description",
            desc: <Description buttonClicked={buttonClicked} setClickedButton={setClickedButton}/>
        
        },
        {
            label: "Submission",
            value: "submission",
            desc: codesAndStatus,
        },
      ];

  return (
    <div>
        <Tabs className='mt-3 ml-6 w-11/12' id="custom-animation" key={activeTab} value={activeTab}>
            <TabsHeader indicatorProps={{
                className: "bg-gray-900/10 shadow-none !text-gray-900",
            }}
            className='bg-white'
            >
            {dataArray.map(({ label, value }) => (
                <Tab 
                    key={value} 
                    value={value} 
                    onClick={() => handleFunction(value)}>
                    {label}
                </Tab>
            ))}
            </TabsHeader>
            <TabsBody
                className='bg-gray-50 rounded-xl mt-3'
                animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                }}
            >
            {dataArray.map(({ value, desc }) => (  
                <TabPanel key={value} value={value} >
                {
                    (Array.isArray(desc)) ?   
                    <ListOfStatus dataArray={desc}/> : desc
                }
                </TabPanel>
            ))}
            </TabsBody>
        </Tabs>
    </div>
  )
}
export default UserSubmittedCode