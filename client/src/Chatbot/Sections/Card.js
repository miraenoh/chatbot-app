import React from 'react'
import Meta from 'antd/lib/card/Meta'
import { Card, Icon } from 'antd'

function MyCard(props) {
    return (
        <Card
            style={{ width: 200 }}
            cover={
                <img
                alt={props.cardInfo.fields.description.stringValue}
                src={props.cardInfo.fields.image.stringValue}/>
            }
            actions={[
                <a target="_blank" rel="noopener noreferrer" href={props.cardInfo.fields.link.stringValue}>
                    <Icon type="ellipsis" key="ellipsis" />
                </a>
            ]}
        >
            <Meta
                title={props.cardInfo.fields.stack.stringValue}
                description={props.cardInfo.fields.description.stringValue}
            />
        </Card>
    )
}

export default MyCard