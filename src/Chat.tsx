import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import './Chat.css';
import {useAppDispatch, useTypedSelector} from "./store/hooks";
import {setMessages} from "./store/MessagesSlice";

const ws = new WebSocket('ws://localhost:8000');

interface IMessages {
    author: string,
    text: string,
    date: string,
    id: number
}

const Chat = () => {
    const dispatch = useAppDispatch();

    const [author, setAuthor] = useState<string>('');
    const [text, setText] = useState<string>('');

    const chatRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        ws.onmessage = (event: MessageEvent<string>) => {
            dispatch(setMessages({messages: JSON.parse(event.data)}));
        }
    }, [])

    const messages = useTypedSelector(state => state.ms.messages);

    useEffect(() => {
        if (messages && chatRef.current)   {
            chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
    }, [messages])


    const authorHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    }

    const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

    const onButtonClick = () => {
        const message = {"author": author, "text": text};
        ws.send(JSON.stringify(message));
    }

    return (
        <div className='chat'>

            <div className='messages' ref={chatRef}>
                {messages?.map((m, index) => <Message message={m} index={index}/>)}
            </div>

            <div className='message-form'>
                <div className='inputs'>
                    <div className="block1">
                        <p>Автор</p>
                        <input id='author-input' onChange={event => authorHandler(event)}/>
                    </div>
                    <div className="block1">
                        <p>Текст</p>
                        <input id='text-input' onChange={event => textHandler(event)}/>
                    </div>

                </div>
                <button onClick={onButtonClick}>Отправить</button>
            </div>

        </div>
    );
};

const Message = ({message, index}: {message: IMessages, index: number}) => {

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