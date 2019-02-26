import React from 'react'
import { Button, Header, Image, Modal, Card, Icon } from 'semantic-ui-react';
const extra = (
    <a>
        <Icon name='user' />
        16 Friends
  </a>
)
const ShowTradeModal = (props) => (
    <Modal size="tiny" open={props.showModal} onClose={props.closeModal} trigger="">
        {props.rowData && <Modal.Header><Icon name='user' /> {props.rowData.fullName}</Modal.Header>}
        <Modal.Content image>
            {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
            {props.rowData && <Image wrapped size='small' src={props.rowData.avatar} />}
            <Modal.Description>
                {/* <Header>Profile Details</Header> */}
                {props.rowData && <Card
                    header={props.rowData._username}
                    meta={props.rowData.phone_number}
                    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
                    extra={extra}
                />
                }
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default ShowTradeModal;