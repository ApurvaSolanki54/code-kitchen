import React from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
const renderDescription = (desc) => {
    if (Array.isArray(desc)) {
        return desc.map((line, index) => <p key={index}>{line}</p>);
    } 
    
    else if (typeof desc === 'string') {
        return <p>{desc}</p>;
    } 
    
    else if (typeof desc === 'function') {
        return  ;
    } 
    
    else {
        return null; // Handle other types or return null for invalid types
    }
};

export default function Edit(
    {
        languageId, 
        language, 
        isButtonClicked, 
        setCode,
        setActiveTab,
        setRunStatusDone,
        setFinalOutput
    }
){  
    function handleEditorChangeCode(value, event) {
        setCode(value)
    }
    const editorDidMount = (editor) => {
        editor.onDidFocusEditorText(() => {
        editor._domElement.style.outline = 'none';
        });
        editor.onDidBlurEditorText(() => {
        editor._domElement.style.outline = 'none';
        });
    };
    const getFinalResult = async(id) =>{
        const data={
            allCheckRequestId:id
        }
        const response2 = await axios.post("http://localhost:8000/api/v1/display/display-submission", data, {withCredentials: true})
        let flag = false;
        for(let i=0; i<response2.data.data.length; i++){
            if(response2.data.data[i].status === "Pending"){
                flag=true;
            }
        }
        if(flag){
            setTimeout(() => {
                getFinalResult(id);
            }, 3000);
        }
        else{
            setRunStatusDone("Success")
            setFinalOutput(response2.data.data)
            setActiveTab("submission")
        }

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

    return (
        <>
        <div className='mt-14'></div>
        <div className='w-11/12 ml-9 mt-3'>
            <Editor
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                height="50vh"
                defaultLanguage="c++"
                defaultValue=""
                onChange={handleEditorChangeCode}
                onMount={handleEditorDidMount}
                beforeMount={handleEditorWillMount}
                onValidate={handleEditorValidation}
                editorDidMount={editorDidMount}
            />
        </div>
        </>
    );
}

