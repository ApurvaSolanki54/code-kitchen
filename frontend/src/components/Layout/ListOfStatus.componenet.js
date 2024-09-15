import React, { useEffect, useState } from 'react'
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import Prism from 'prismjs';
import 'prismjs/themes/prism.css';

const ListOfStatus = ({dataArray}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  console.log("dataArray:",dataArray)
  const [openDialog, setOpenDialog] = useState(false);
  const [currentStatus, setCurrentStatus] = useState({});

  const handleOpenDialog = (status) => {
    setCurrentStatus(status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  console.log("dataarray: ", dataArray)
  return (
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      <ul>
          {dataArray.map(status=>(
            <li className='mb-3' key={status.id}>
              <div
                onClick={()=>handleOpenDialog(status)} 
                className={`shadow-lg rounded-lg bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 w-full `}
              >
                <div className={`flex text-base font-bold text-gray-900 px-6 py-4 whitespace-nowrap 
                  ${status.statusOfSubmission === "Accepted" ? "text-green-500":"text-red-500"} `}>
                  
                  {status.statusOfSubmission}
                </div>
              </div>
            </li>
          ))}
        
        <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Code | {currentStatus.languageName}</DialogHeader>
        <DialogBody className='h-80 overflow-scroll'>
          <div className='rounded-lg bg-gray-50'>
          <pre>
            <code className={`language-${currentStatus.languageName} my-3`}>
              {currentStatus.code}
            </code>
          </pre>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCloseDialog}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleCloseDialog}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
      </ul>
    </div>
  )
}

export default ListOfStatus