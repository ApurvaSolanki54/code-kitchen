import React from 'react'

const Loading = () => {
  return (
    <div>
        <div class="flex w-11/12 mx-auto mt-3 overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-800">
            <div class="w-11/12 p-4 md:p-4">
                <h1 class="w-85 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                
                <p class="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

                <div class="flex mt-4 item-center gap-x-2">
                    <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    <p class="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                </div>

                <div class="flex justify-between mt-6 item-center">
                    <h1 class="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                    <div class="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-700"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loading