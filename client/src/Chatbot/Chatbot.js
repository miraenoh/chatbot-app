import React from 'react'

function Chatbot() {

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            if (!e.target.value) {
                return alert('You need to type someting first')
            }

            // Send a request to the text query route
            // textQuery(e.target.value)

            e.target.value = "";
        }
    }

    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>

            </div>
            <input
                style={{
                    margin: 0, width: '100%', height: 50,
                    borderRadius: '4px', padding: '5px', fontSize: '1rem'
                }}
                placeholder="Send a message..."
                onKeyPress={keyPressHandler}
                type="text"
            />
        </div>
    )
}

export default Chatbot