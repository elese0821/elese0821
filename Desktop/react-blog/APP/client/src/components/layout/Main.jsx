import React from 'react'

const Main = (props) => {
    return (
        <main id='main' role='main'>
            {props.children}
        </main>
    )
}

export default Main