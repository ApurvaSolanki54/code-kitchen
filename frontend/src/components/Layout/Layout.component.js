import React, { useEffect, useState } from "react";
import Edit from "./Edit.component";
import axios from "axios";
import LoadingLayout from "../Loading/LoadingLayout.componenent";
import UserSubmittedCode from "./UserSubmittedCode.component";
import DisplayAll from "./DisplayAll.componenet";
import Loading from "../Loading/Loading.component";
import { useParams } from "react-router-dom";

const Layout = () => {
    const { questionId } = useParams();
    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState("");
    const [languageId, setLanguageId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState("");
    const [clickedButton, setClickedButton] = useState(false);
    const [code, setCode] = useState("");
    const [activeTab, setActiveTab] = useState("input");
    const [runStatusDone, setRunStatusDone] = useState("Success");
    const [input, setInput] = useState("");
    const [stdout, setStdout] = useState("");
    const [compile_output, setCompile_output] = useState("");
    const [message, setMessage] = useState("");
    const [runDescription, setRunDescription] = useState("");
    const [runArr, setRunArr] = useState({});
    const [finalOutput, setFinalOutput] = useState([]);
    
    const getRunResult = async (token) => {
        const response2 = await axios.post(
            "http://localhost:8000/api/v1/run/runCode",
            { token }
        );
        if (response2.data.data.status === "Pending") {
            setTimeout(() => {
                getRunResult(token);
            }, 3000);
        }
        if (response2.data.data.status === "Success") {
        setRunStatusDone("Success");
        setActiveTab("output");
        setStdout(response2.data.data.stdout);
        setCompile_output(response2.data.data.compile_output);
        setMessage(response2.data.data.message);
        setRunDescription(response2.data.data.description);
        }
    };

    const runCode = async () => {
        if (input !== "" && code !== "") {
            setRunStatusDone("Pending");
            const data = {
                code: code,
                input: input,
                languageId,
            };
            const response = await axios.post(
                "http://localhost:8000/api/v1/submit/submitCode",
                data
            );
            const token = response.data.data.token;
            console.log(token);

            getRunResult(token);
        }
    };

    const getFinalResult = async (id) => {
        const data = {
            allCheckRequestId: id,
        };
        const response2 = await axios.post(
            "http://localhost:8000/api/v1/display/display-submission",
            data,
            { withCredentials: true }
        );
        let flag = false;
        for (let i = 0; i < response2.data.data.length; i++) {
            if (response2.data.data[i].status === "Pending") {
                flag = true;
            }
        }
        if (flag) {
            setTimeout(() => {
                getFinalResult(id);
            }, 3000);
        } else {
            setRunStatusDone("Success");
            setFinalOutput(response2.data.data);
            setActiveTab("submission");
        }
    };

    const finalSubmit = async () => {
        setRunStatusDone("Pending");
        const data = {
            questionId: questionId,
            languageId,
            language,
            code: code,
        };
        const response = await axios.post(
            "http://localhost:8000/api/v1/final-submission/submit-code",
            data,
            { withCredentials: true }
        );
        getFinalResult(response.data.data._id);
    };

    useEffect(() => {
        setInput(isButtonClicked);
        runCode();
        setIsButtonClicked("");
        setClickedButton(false);
    }, [clickedButton]);

    useEffect(() => {
        async function getAllLanguages() {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:8000/api/v1/languages/getlanguage"
            );
            setLanguages(response.data.data);
            setLoading(false);
        }
        getAllLanguages();
    }, []);

    function handleChange(e) {
        const selectedLanguage = e.target.value;
        const foundLanguage = languages.find(
            (lang) => lang.name === selectedLanguage
        );
        if (foundLanguage) {
            setLanguage(selectedLanguage);
            setLanguageId(foundLanguage.id);
        }
    }

    return (
        <div>
        {loading ? (
            <LoadingLayout />
        ) : (
            <div className="h-full">
                <div className="h-24 bg-gray-400">
                    <div class="flex justify-center items-center">
                        <div className="flex flex-col items-center mt-3">
                            <label
                                htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Select an option
                            </label>
                            <select
                                id="countries"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-30 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={language}
                                onChange={handleChange}
                            >
                                {languages.map((language, index) => (
                                    <option value={language.name} key={language.id}>
                                    {language.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-16 ml-3 h-full">
                    <div className="bg-white rounded-xl h-full mb-10">
                    <UserSubmittedCode
                        questionId={questionId}
                        
                        buttonClicked={setIsButtonClicked}
                        setClickedButton={setClickedButton}
                    />
                    </div>
                    <div className="bg-white rounded-xl ">
                        <Edit
                            languageId={languageId}
                            language={language}
                            isButtonClicked={isButtonClicked}
                            clickedButton={clickedButton}
                            setIsButtonClicked={setIsButtonClicked}
                            setClickedButton={setClickedButton}
                            setCode={setCode}
                            setActiveTab={setActiveTab}
                            activeTab={activeTab}
                            setRunStatusDone={setRunStatusDone}
                            setInput={setInput}
                            input={input}
                            setStdout={setStdout}
                            setCompile_output={setCompile_output}
                            setMessage={setMessage}
                            setRunDescription={setRunDescription}
                            setFinalOutput={setFinalOutput}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 place-content-end">
                    {runStatusDone === "Success" ? (
                        <DisplayAll
                            setActiveTab={setActiveTab}
                            activeTab={activeTab}
                            setInput={setInput}
                            stdout={stdout}
                            compile_output={compile_output}
                            message={message}
                            runDescription={runDescription}
                            finalOutput={finalOutput}
                            setRunArr={setRunArr}
                            runArr={runArr}
                        />
                        ) : (
                        <div className="mt-5">
                            <Loading />
                        </div>
                    )}
                    
                </div>
                <div className="flex justify-center">
                    <button
                        className="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-3 mr-3"
                        type="button"
                        onClick={runCode}
                    >
                        Run Code
                    </button>

                    <button
                        className="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-3 ml-3"
                        type="button"
                        onClick={finalSubmit}
                    >
                        Final Submit
                    </button>
                </div>
            </div>
        )}
        </div>
    );
};

export default Layout;
