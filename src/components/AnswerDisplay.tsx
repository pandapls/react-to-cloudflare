import { ApolloError } from '@apollo/client';
import '../styles/common.css';

interface AnswerDisplayProps {
    loading: boolean;
    error?: ApolloError;
    data?: {
        ask: string;
    };
}

export default function AnswerDisplay({ loading, error, data }: AnswerDisplayProps) {
    if (loading) {
        return (
            <div className="loading-box">
                <div className="loading-spinner" />
                思考中...
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-box">
                <p>错误：{error.message}</p>
                {error.graphQLErrors?.map((err, i) => (
                    <p key={i}>{err.message}</p>
                ))}
                {error.networkError && <p>网络错误: {error.networkError.message}</p>}
            </div>
        );
    }

    if (!data) {
        return (
            <div className="waiting-box">
                <h2>AI 助手</h2>
                <p>有什么我可以帮你的吗？</p>
            </div>
        );
    }

    return (
        <div className="message assistant">
            <div className="answer-content">{data.ask}</div>
        </div>
    );
} 