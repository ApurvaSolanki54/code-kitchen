import { Alert, Button } from '@material-tailwind/react'
import React from 'react'

const Alerted = ({message, open, setOpen}) => {
  return (
    <div>
        <Alert
            variant="gradient"
            open={open}
            
            action={
                <Button
                variant="text"
                color="white"
                size="sm"
                className="!absolute top-3 right-3"
                onClick={() => setOpen(false)}
                >
                Close
                </Button>
            }
        >
            {message}
        </Alert>
    </div>
  )
}

export default Alerted