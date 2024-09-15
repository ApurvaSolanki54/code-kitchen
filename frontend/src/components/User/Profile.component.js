import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { getAllAccepted, getUser } from './user';
import { Link, useParams } from 'react-router-dom';
import LoadingProfile from '../Loading/LoadingProfile.component';


export default function Profile() {
  const [userfullName, setUserFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userGendar, setUserGendar] = useState('')
  const [userContactNo, setUserContactNo] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [dateString, setDateString] = useState('');
  const [tableRows, setTableRows] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    async function getData(){
      const {fullName, email, gendar, contactNo, description, createdAt} = await getUser()
      const currentDate = new Date(createdAt);
      currentDate.setDate(currentDate.getDate() + 1);
      const modifiedDateString = currentDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
      setDateString(modifiedDateString)
      console.log("--",fullName)
      setUserFullName(fullName)
      setUserEmail(email)
      setUserGendar(gendar)
      setUserContactNo(contactNo)
      setUserDescription(description)
      setLoading(true)
      setTableRows(await getAllAccepted())
      setLoading(false)
    }
    getData()

  }, [])
  console.log("fullname", userfullName)

  const TABLE_HEAD = ["Submitted Question",""];
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tableRows.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 0));
  };
  const renderTableRows = () => {
    
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, tableRows.length);
    console.log("table---", tableRows)
    console.log("table---filter", tableRows.filter(question=>question.statusOfSubmission === "Accepted"))
    if(loading){
      return <LoadingProfile/>
    }
    return tableRows.slice(startIndex, endIndex).map((row, index) => (
      <>
      <tr key={index}>
        <td>
          <Typography
            variant="small"
            color="blue-gray"
            className="ml-5 font-normal"
          >
            {row.questionTitle}
          </Typography>
        </td>
        
        <td className='ml-64'>
          <div >
            <Tooltip content="Edit User">                        
                <Link 
                  to={`/question/${row.questionId}`} onClick={()=>console.log("click: ", row.questionId)}>
                  <IconButton variant="text">
                    <PencilIcon className="h-4 w-4" >
                    </PencilIcon>
                  </IconButton>
                  </Link>
            </Tooltip>
          </div>
        </td>
      </tr>                       
      </>
    ));
  };
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div className="bg-gray-100">
      <div className="w-full text-white bg-main-color">
        <div
          className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
        >
          <div className="p-4 flex flex-row items-center justify-between">
            <a
              href="/"
              className="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline"
            >
              example profile
            </a>
            <button
              className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <nav className={`flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row ${isOpen ? 'flex' : 'hidden'}`}>
          </nav>
        </div>
      </div>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto"
                  src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{userfullName}</h1>
              <h3 className="text-gray-600 font-lg text-semibold leading-6">{userDescription}</h3>

              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  <span className="ml-auto">
                    <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">{dateString}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* right side */}
          <div className=" w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Full Name</div>
                    <div class="px-4 py-2">{userfullName}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email</div>
                    <div class="px-4 py-2">{userEmail}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Gender</div>
                    <div class="px-4 py-2">{userGendar}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                    <div class="px-4 py-2">{userContactNo}</div>
                  </div>           
                </div>
              </div>
              <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Show Full Information
              </button>
            </div>
            <div className="my-4"></div>
            <div className="bg-white p-3 shadow-sm rounded-sm">
              {/* Experience and education content */}
              <div class="w-full">
                <h3 class="font-medium text-gray-900 text-left px-6">Recent activites</h3>
                <Card className="h-full w-full">
                  
                  {/* <CardBody className="overflow-scroll px-0"> */}
                  {/* sirf overflow-scroll hata diya */}
                  <CardBody className=" px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                      <thead>
                        <tr>
                          {TABLE_HEAD.map((head) => (
                            <th
                              key={head}
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {renderTableRows()}
                      </tbody>
                    </table>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Page {currentPage + 1} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                      <Button variant="outlined" size="sm" onClick={handlePrevPage} disabled={currentPage === 0}>
                        Previous
                      </Button>
                      <Button variant="outlined" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

