import { useLazyQuery } from '@apollo/client';
import { ASK_QUERY } from '@graphql/index';
import { useState } from 'react';
import AnswerDisplay from './AnswerDisplay';
import mastraClient from '@utils/MastraClient';
import type { AgentResponse, GraphQLAnswerResponse, AgentError } from '@/types/index';

// 定义聊天消息类型
interface ChatMessage {
  role: string;
  content: string;
}

export default function AskForm() {
  const [prompt, setPrompt] = useState<string>('');
  const [useCodeReview, setUseCodeReview] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [getAnswer, { loading: queryLoading, error: queryError, data: queryData }] =
    useLazyQuery<GraphQLAnswerResponse>(ASK_QUERY);
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
  const [agentLoading, setAgentLoading] = useState<boolean>(false);
  const [agentError, setAgentError] = useState<AgentError | null>(null);

  // 添加消息到历史记录
  const addMessageToHistory = (role: string, content: string) => {
    setChatHistory(prevHistory => [...prevHistory, { role, content }]);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    // 添加用户问题到历史记录
    addMessageToHistory('user', prompt);

    // 清空输入框
    setPrompt('');

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
              role: 'user',
              content: userMessage,
            },
          ],
        });

        setAgentResponse(response as AgentResponse);

        // 处理Agent响应结果并添加到历史记录
        let answerText: string;
        if ('text' in response && response.text) {
          answerText = response.text;
        } else {
          // 作为后备，将整个响应转换为字符串
          answerText = JSON.stringify(response, null, 2);
        }
        addMessageToHistory('assistant', answerText);
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
      getAnswer({
        variables: { prompt },
        onCompleted: data => {
          // 添加回答到历史记录
          if (data && data.ask) {
            addMessageToHistory('assistant', data.ask);
          }
        },
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
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

    if ('text' in agentResponse && agentResponse.text) {
      // 如果有直接的text字段
      answerText = agentResponse.text;
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
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto bg-white dark:bg-gray-900">
      {/* 聊天消息显示区域 */}
      <div className="flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-y-auto p-4 space-y-4 chat-scroll">
          <AnswerDisplay
            loading={loading}
            error={error}
            data={displayData}
            chatHistory={chatHistory}
          />
        </div>
      </div>

      {/* 输入区域 - 固定在底部 */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 shadow-lg">
        {/* 模式选择器 */}
        <div className="mb-4">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={useCodeReview}
                onChange={e => setUseCodeReview(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-11 h-6 rounded-full border-2 transition-colors duration-200 ease-in-out ${
                  useCodeReview
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-gray-200 border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-200 ease-in-out ${
                    useCodeReview ? 'translate-x-6' : 'translate-x-1'
                  } mt-0.5`}
                ></div>
              </div>
            </div>
            <span
              className={`text-sm font-medium transition-colors duration-200 ${
                useCodeReview
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              使用 Code Review Agent
            </span>
          </label>
        </div>

        {/* 输入表单 */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-start space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={useCodeReview ? '输入代码进行 review...' : '输入你的问题...'}
                className="w-full resize-none rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 pr-12 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all duration-200 shadow-sm"
                rows={1}
                style={{
                  minHeight: '56px',
                  maxHeight: '200px',
                }}
                onInput={e => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 200) + 'px';
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 shrink-0 shadow-lg hover:shadow-xl disabled:shadow-sm"
              title={loading ? '思考中...' : '发送'}
            >
              {loading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="transform rotate-90"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
