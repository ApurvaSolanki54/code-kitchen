import React, { useEffect } from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import Editor from '@monaco-editor/react';
import DisplayRunContent from './DisplayRunContent.component';
import DisplayTestcase from './DisplayTestcase.component';
const DisplayAll = ({
    setInput,
    stdout,
    compile_output,
    message,
    runDescription,
    finalOutput,
    runArr,
    setRunArr,
    activeTab,
    setActiveTab
}) => {

    useEffect(()=>{
        setRunArr({stdout, compile_output, message, runDescription})
    },[stdout,compile_output,message,runDescription])

    function handleEditorChangeInput(value, event) {
        setInput(value)
        console.log(value)
    }

    function handleEditorDidMount(editor, monaco) {
        console.log('onMount: the editor instance:', editor);
        console.log('onMount: the monaco instance:', monaco);
    }

    function handleEditorWillMount(monaco) {
        console.log('beforeMount: the monaco instance:', monaco);
    }
    
    function handleEditorValidation(markers) {
    }
    const dataArray = [
        {
            label: "Input",
            value: "input",
            desc: <Editor
            className='mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            height="20vh"
            defaultLanguage="javascript"
            defaultValue=""
            onChange={handleEditorChangeInput}
            onMount={handleEditorDidMount}
            beforeMount={handleEditorWillMount}
            onValidate={handleEditorValidation}
        />
        },
        {
            label: "Output",
            value: "output",
            desc: `${runDescription}`,
        },
     
        {
            label: "Submission",
            value: "submission",
            desc: finalOutput,
        },
     
    ];
    return (
        <div>
            <div className='bg-stone-50'>
            <Tabs 
                className='mt-8' 
                id="custom-animation" 
                key={activeTab} value={activeTab}
                
            >
            <TabsHeader>
                {dataArray.map(({ label, value, desc }) => (
                <Tab 
                    key={value} 
                    value={value} 
                    onClick={() => setActiveTab(value)}
                    disabled={(typeof desc === 'string' && desc.trim() === '') || (Array.isArray(desc) && desc.length === 0)}
                    >
                    {label}
                </Tab>
                ))}
            </TabsHeader>
            <TabsBody
                animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
                }}
            >
                {dataArray.map(({ value, desc }) => (
                <TabPanel  
                    key={value} 
                    value={value} 
                    className={`${desc === 'accepted' ? 'bg-blue-200' : ''}${value === 'submission' ? "":""}`}
                >
                    {value === "output" ? <DisplayRunContent arr={runArr}/> : (Array.isArray(desc)) ? <div className=''><DisplayTestcase dataArray={desc}/></div>:desc}
                </TabPanel>
                ))}
            </TabsBody>
            </Tabs>
            </div>
        </div>
  )
}

export default DisplayAll