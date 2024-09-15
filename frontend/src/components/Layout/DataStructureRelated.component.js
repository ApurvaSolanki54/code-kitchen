import React from 'react'
import {
    Popover,
    PopoverHandler,
    PopoverContent,
    Button,
    Chip,
    Typography,
  } from "@material-tailwind/react";

const DataStructureRelated = ({topics}) => {

    const [openPopover, setOpenPopover] = React.useState(false);


    const triggers = {
        onMouseEnter: () => setOpenPopover(true),
        onMouseLeave: () => setOpenPopover(false),
    };
    return (
        <div>
            <Popover open={openPopover} handler={setOpenPopover} placement="right-start">
                <PopoverHandler {...triggers}>
                    <Button color='white' class='w-24 bg-white rounded-lg shadow-md'>Topics</Button>
                </PopoverHandler>
                <PopoverContent {...triggers} className="z-50 max-w-[26rem]">
                    {topics.map(topic=>
                        <div class="relative grid select-none items-center whitespace-nowrap rounded-lg bg-gray-900/10 py-1.5 px-3 font-sans text-xs font-bold uppercase text-gray-900 mb-2">
                            <span class="">{topic}</span>
                        </div>)}
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DataStructureRelated