import React from 'react';
import '../styles/common.css';
import '../styles/markdown-styles.css'; // 导入Markdown样式
import type { GraphQLAnswerResponse, GraphQLError, AgentError } from '../types';
import ReactMarkdown from 'react-markdown';

interface AnswerDisplayProps {
    loading: boolean;
    error: GraphQLError | AgentError | null | undefined;
    data: GraphQLAnswerResponse | { answer: string } | null;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ loading, error, data }) => {
    if (loading) {
        return <div className="loading-indicator">正在思考...</div>;
    }

    if (error) {
        return <div className="error-message">出错了: {error.message}</div>;
    }

    // 检查是否有数据
    if (!data) {
        return <div className="empty-state">请输入您的问题</div>;
    }

    // 处理从GraphQL或Agent返回的数据
    let answerText: string | undefined;
    console.log(data, 'data')
    // 检查是GraphQL响应还是Agent响应
    if ('ask' in data) {
        // GraphQL响应
        answerText = data.ask;
    } else if ('answer' in data) {
        // Agent响应
        answerText = data.answer;
    } else {
        answerText = '问答异常～稍后再试'
    }
    console.log(answerText)

    if (!answerText) {
        return <div className="empty-state">没有找到回答</div>;
    }

    return (
        <div className="answer-content">
            <ReactMarkdown>{answerText}</ReactMarkdown>
        </div>
    );
};

export default AnswerDisplay;