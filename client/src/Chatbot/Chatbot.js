import React, { useEffect } from 'react'
import Axios from 'axios'

function Chatbot() {
    // Trigger the welcome event once the app starts
    useEffect(() => {
        eventQuery('Welcome')
    }, [])

    const textQuery = async (inputText) => {
        let conversations = []

        // Process the message the user sent
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: inputText
                }
            }
        }
        conversations.push(conversation)

        const textQueryVariables = {
            text: inputText
        }

        // Send a request to the textQuery ROUTE
        try {
            const res = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            const resContent = res.data.fulfillmentMessages[0]
            conversation = {
                who: 'bot',
                content: resContent
            }
            conversations.push(conversation)
            console.log(conversation)
        } catch (err) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem"
                    }
                }
            }
            conversations.push(conversation)
        }

        // Process the message Chatbot sent
    }

    const eventQuery = async (inputEvent) => {
        let conversations = []

        // Process the input event
        const eventQueryVariables = {
            event: inputEvent
        }

        // Send a request to the textQuery ROUTE
        try {
            const res = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            const resContent = res.data.fulfillmentMessages[0]
            let conversation = {
                who: 'bot',
                content: resContent
            }
            conversations.push(conversation)
            console.log(conversation)
        } catch (err) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem"
                    }
                }
            }
            conversations.push(conversation)
        }

        // Process the message Chatbot sent
    }

    const keyPressHandler = (e) => {
        if (e.key === 'Enter') {
            if (!e.target.value) {
                return alert('You need to type someting first')
            }

            // Send a request to the text query route
            textQuery(e.target.value)

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