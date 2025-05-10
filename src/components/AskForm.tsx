import { useLazyQuery } from "@apollo/client";
import { ASK_QUERY } from "../graphsql";
import { useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import '../styles/common.css';

export default function AskForm() {
    const [prompt, setPrompt] = useState('');
    const [getAnswer, { loading, error, data }] = useLazyQuery(ASK_QUERY);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        getAnswer({ variables: { prompt } });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="chat-container">
            <div className="answer-panel">
                <div className="answer-container">
                    <AnswerDisplay
                        loading={loading}
                        error={error}
                        data={data}
                    />
                </div>
            </div>

            <div className="input-panel">
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={prompt}
                            onChange={(e) => {
                                setPrompt('')
                                setPrompt(e.target.value)
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="输入你的问题..."
                            className="chat-input"
                            rows={1}
                        />
                        <button
                            type="submit"
                            disabled={loading || !prompt.trim()}
                            className="submit-button"
                            title={loading ? "思考中..." : "发送"}
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="currentColor"
                            >
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
