import React, { useRef, useState } from 'react';
import './style.css';

export default function CopyLink(props) {

    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    };

    return (
        <div>
            {
                document.queryCommandSupported('copy') &&
                <div>
                    <button onClick={copyToClipboard}>Copy</button>
                    {copySuccess}
                </div>
            }
            <form>
                <textarea
                    className="form-control"
                    ref={textAreaRef}
                    defaultValue={`https://date-rescue.herokuapp.com/#/events/${props.shortid}`}
                />
            </form>
        </div>
    );
};