import React, {useEffect, useState} from 'react';
import './Chat.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);

    const ws = new WebSocket('ws://localhost:8000');

    useEffect(() => {
        ws.onmessage = (event: any) => {
            // @ts-ignore
            setMessages(JSON.parse(event.data));
        }
    }, [])

    const onButtonClick = () => {
        // @ts-ignore
        const message = {"author": "Zarema Avamileva", "text": document.getElementById('text-input').value};
        ws.send(JSON.stringify(message));
    }

    return (
        <div className='chat'>

            <div className='messages'>
                {messages.map((m, index) => <Message message={m} index={index}/>)}
            </div>

            <div className='message-form'>
                <input id='text-input'/>
                <button onClick={() => onButtonClick()}>Отправить</button>
            </div>

        </div>
    );
};

const Message = ({message, index}: any) => {

    return <div key={index} className='message-block'>
        <div className='author'>
            {message.author}
        </div>
        <div className='text'>
            {message.text}
        </div>
        <div className='date'>
            {message.date}
        </div>
        <hr/>
    </div>
}

export default Chat;