import React from 'react';

const MessageDisplay = ({message}) =>
{
    return(
        <div className='mt-4'>
            {/* This is a comment*/}
            <p className='text-gray-600 font-semibold'>{message}</p>
        </div>
    );
}


export default MessageDisplay;