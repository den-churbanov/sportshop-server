import React, {useEffect} from "react"
import "../../styles/message-popup.css"

export const MessagePopup = ({children, isActive, setActive, success, error, clearSuccess, clearError}) => {

    const closePopupHandler = e => {
        if (success) clearSuccess()
        if (error) clearError()
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = 'scroll'
        }
    }, [])

    if (children && isActive) {
        return (
            <div className="blur-window">
                <div className="message_block">
                    <div className="message_block_header">
                        <div className="bars is-active" onClick={() => setActive(0)}>
                            <span/>
                        </div>
                    </div>
                    <div className="message_content">
                        {children}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="blur-window">
            <div className={`message_block${error ? ' error' : success ? ' success' : ''}`}>
                <div className="message_block_header">
                    <div className="bars is-active" onClick={closePopupHandler}>
                        <span/>
                    </div>
                </div>
                <div className="message_content">
                    <span>
                        {success ? success : error}
                    </span>
                </div>
            </div>
        </div>
    );
}