import { useLazyQuery } from "@apollo/client";
import { ASK_QUERY } from "../graphsql";
import { useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import '../styles/common.css';
import mastraClient from '../utils/MastraClient';
import type { AgentResponse, GraphQLAnswerResponse, AgentError } from "../types";

export default function AskForm() {
    const [prompt, setPrompt] = useState<string>('');
    const [useCodeReview, setUseCodeReview] = useState<boolean>(false);
    const [getAnswer, { loading: queryLoading, error: queryError, data: queryData }] = useLazyQuery<GraphQLAnswerResponse>(ASK_QUERY);
    const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
    const [agentLoading, setAgentLoading] = useState<boolean>(false);
    const [agentError, setAgentError] = useState<AgentError | null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        if (useCodeReview) {
            // 使用Code Review Agent
            setAgentLoading(true);
            setAgentResponse(null);
            setAgentError(null);

            try {
                const agentInstance = await mastraClient.getAgent('codeReviewerAgent');

                // 直接使用字符串形式的消息
                const userMessage = prompt;

                // 使用类型断言绕过TypeScript的类型检查
                const response = await agentInstance.generate({
                    messages: [
                        {
                            role: "user",
                            content: userMessage
                        }
                    ]
                });

                setAgentResponse(response as AgentResponse);
            } catch (err) {
                console.error('调用Agent时出错:', err);
                const error: AgentError = {
                    message: err instanceof Error ? err.message : '调用Agent失败',
                };
                setAgentError(error);
            } finally {
                setAgentLoading(false);
            }
        } else {
        // 使用GraphQL查询
            getAnswer({ variables: { prompt } });
        }
        setPrompt('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
            setPrompt('');
        }
    };

    // 确定当前的loading和error状态
    const loading = useCodeReview ? agentLoading : queryLoading;
    const error = useCodeReview ? agentError : queryError;

    // 整合数据以传递给AnswerDisplay
    let displayData: { answer: string } | GraphQLAnswerResponse | null = null;

    if (useCodeReview && agentResponse) {
        // 处理Agent响应结果
        let answerText: string;

        if (agentResponse.text) {
            // 如果有直接的text字段
            answerText = agentResponse.text;
        } else if (agentResponse.choices && agentResponse.choices.length > 0 && agentResponse.choices[0].message) {
            // 如果有choices数组中的消息
            answerText = agentResponse.choices[0].message.content;
        } else {
            // 作为后备，将整个响应转换为字符串
            answerText = JSON.stringify(agentResponse, null, 2);
        }

        displayData = { answer: answerText };
    } else if (!useCodeReview && queryData) {
        // 直接使用GraphQL响应
        displayData = queryData;
    }

    return (
        <div className="chat-container">
            <div className="mode-selector">
                <label className={`mode-label ${useCodeReview ? 'active' : ''}`}>
                    <input
                        type="checkbox"
                        checked={useCodeReview}
                        onChange={(e) => setUseCodeReview(e.target.checked)}
                        className="mode-checkbox"
                    />
                    使用Code Review Agent
                </label>
            </div>

            <div className="answer-panel">
                <div className="answer-container">
                    <AnswerDisplay
                        loading={loading}
                        error={error}
                        data={displayData}
                    />
                </div>
            </div>

            <div className="input-panel">
                <div className="input-container">
                    <form onSubmit={handleSubmit}>
                        <textarea
                            value={prompt}
                            onChange={(e) => {
                                setPrompt(e.target.value)
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder={useCodeReview ? "输入代码进行review..." : "输入你的问题..."}
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