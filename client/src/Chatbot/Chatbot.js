import React, { useEffect } from 'react'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { saveMessage } from '../_actions/message_actions'
import { List, Icon, Avatar } from 'antd'

import Message from './Sections/Message'
import MyCard from './Sections/Card'

function Chatbot() {
    const dispatch = useDispatch()
    const messages = useSelector(state => state.message.messages)

    // Trigger the welcome event once the app starts
    useEffect(() => {
        eventQuery('Welcome')
    }, [])

    const textQuery = async (inputText) => {
        // Process the message the user sent
        let conversation = {
            who: 'user',
            content: {
                text: {
                    text: inputText
                }
            }
        }
        dispatch(saveMessage(conversation))

        const textQueryVariables = {
            text: inputText
        }

        // Send a request to the textQuery ROUTE
        try {
            const res = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            for (let resContent of res.data.fulfillmentMessages) {
                conversation = {
                    who: 'bot',
                    content: resContent
                }
                dispatch(saveMessage(conversation))
            }
        } catch (err) {
            conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
        }

        // Process the message Chatbot sent
    }

    const eventQuery = async (inputEvent) => {
        // Process the input event
        const eventQueryVariables = {
            event: inputEvent
        }

        // Send a request to the textQuery ROUTE
        try {
            const res = await Axios.post('/api/dialogflow/eventQuery', eventQueryVariables)
            for (let resContent of res.data.fulfillmentMessages) {
                let conversation = {
                    who: 'bot',
                    content: resContent
                }
                dispatch(saveMessage(conversation))
            }
        } catch (err) {
            let conversation = {
                who: 'bot',
                content: {
                    text: {
                        text: "Error just occured, please check the problem"
                    }
                }
            }
            dispatch(saveMessage(conversation))
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

    const renderCards = (cards) => {
        return cards.map((card, i) => <MyCard kay={i} cardInfo={card.structValue} />)
    }

    const renderOneMessage = (message, i) => {
        if (message.content && message.content.text && message.content.text.text) {
            // Template for normal text
            return <Message key={i} who={message.who} text={message.content.text.text} />
        } else if (message.content && message.content.payload && message.content.payload.fields.card) {
            // Template for card message
            const AvatarSrc = message.who === 'bot' ? <Icon type="robot" /> : <Icon type="smile" />

            return <div>
                <List.Item style={{ padding: '1rem' }}>
                    <List.Item.Meta
                        avatar={<Avatar icon={AvatarSrc} />}
                        title={message.who}
                        description={renderCards(message.content.payload.fields.card.listValue.values)}
                    />
                </List.Item>
            </div>
        }
    }

    const renderMessages = (messages) => {
        if (messages) {
            return messages.map((message, i) => {
                return renderOneMessage(message, i)
            })
        } else {
            return null
        }
    }

    return (
        <div style={{
            height: 700, width: 700,
            border: '3px solid black', borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessages(messages)}
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