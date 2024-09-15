import React from 'react'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import 'prismjs/themes/prism.css';

const DisplayTestcase = ({dataArray}) => {
    let firstId=0;
    if(dataArray.length !== 0){
      firstId=dataArray[0]._id
    }
    const [activeTab, setActiveTab] = React.useState(firstId);

  const decode = (str) => {
      return Buffer.from(str, 'base64').toString()
  }
  return (
    <div>
  
        <Tabs id="custom-animation" value={activeTab}>
            <TabsHeader>
                {dataArray.map(({ cases, _id }) => (
                <Tab
                    key={_id}
                    value={_id}
                    onClick={() => setActiveTab(_id)}
                >
                    Testcase: {cases}
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody>
                {dataArray.map(({ _id, description, yourCodeOutput, testcaseId, compilationOutput }) => (
                <TabPanel key={_id} value={_id} >
                    <div>
                    <h1 className={`flex font-bold text-lg mb-3 ${description === "Accepted" ? "text-green-500":"text-red-500"}`}>
                        {description}
                    </h1>
                    <div className='flex bg-white rounded-lg h-10 mb-3'>
                        <p className='ml-3 font-normal text-sm'>
                            Input: 
                        </p>
                        <p className='pl-2 font-semibold text-sm'>
                            {testcaseId.input}
                        </p>
                    </div>
                    
                    {!compilationOutput ? <div className='flex bg-white rounded-lg h-10 mb-3'>
                        <p className='ml-3 font-normal text-sm'>Description: </p>
                        <p className='pl-2 font-semibold text-sm'>
                            {description}
                        </p>
                    </div> : <div className='flex bg-white rounded-lg mb-3 h-40 '>
                        <textarea value={compilationOutput} 
                        spellcheck="false"
                        className='disabled 
                            pl-2 font-semibold text-sm 
                            border border-red-500
                            resize-none border rounded-lg w-full focus:border-2 focus:border-red-500 
                            outline-none' 
                            />
                    </div>
                    }
                    {yourCodeOutput && <div className='flex bg-white rounded-lg h-10 mb-3'>
                        <p className='ml-3 font-normal text-sm'>Output: </p>
                        <p className='pl-2 font-semibold text-sm'>
                            {yourCodeOutput}
                        </p>
                    </div>}
                    <div className='flex bg-white rounded-lg h-10 mb-3'>
                        <p className='ml-3 font-normal text-sm'>Expected: </p>
                        <p className='pl-2 font-semibold text-sm'>{testcaseId.output}</p>
                    </div>
                    </div>
                </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    </div>
  )
}

export default DisplayTestcase