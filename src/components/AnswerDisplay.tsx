import React from 'react';
import type { GraphQLAnswerResponse, GraphQLError, AgentError } from '@/types';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface ChatMessage {
  role: string;
  content: string;
}

interface AnswerDisplayProps {
  loading: boolean;
  error: GraphQLError | AgentError | null | undefined;
  data: GraphQLAnswerResponse | { answer: string } | null;
  chatHistory: ChatMessage[];
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ loading, error, data, chatHistory }) => {
  if (error) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">出错了</h3>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error.message}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data && chatHistory.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            欢迎使用 Panda AI
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            请输入您的问题，我会尽力为您提供帮助。您也可以切换到 Code Review 模式来检查代码。
          </p>
        </div>

        {/* 示例问题 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">常见问题</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              询问技术问题、获取编程帮助或寻求解决方案
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <svg
                className="w-4 h-4 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">代码审查</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              上传代码片段进行专业的代码审查和优化建议
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 定义自定义组件类型
  const createMarkdownComponents = (messageRole: string): Components => ({
    code: props => {
      const { children, className, ...rest } = props;
      const isInline = !className?.includes('language-');

      if (isInline) {
        return (
          <code
            className={`px-2 py-1 rounded-md text-sm font-mono font-medium ${
              messageRole === 'user'
                ? 'bg-blue-700/30 text-blue-100'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
            }`}
            {...rest}
          >
            {children}
          </code>
        );
      }

      return (
        <pre
          className={`my-3 p-4 rounded-lg overflow-x-auto font-mono text-sm leading-relaxed ${
            messageRole === 'user'
              ? 'bg-blue-700/30 text-blue-100 border border-blue-600/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
          }`}
        >
          <code {...rest}>{children}</code>
        </pre>
      );
    },
    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-2">{children}</ol>,
  });

  return (
    <div className="space-y-6">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`flex items-start space-x-3 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* 头像 */}
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
              }`}
            >
              {message.role === 'user' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              )}
            </div>

            {/* 消息内容 */}
            <div
              className={`rounded-lg px-4 py-3 shadow-sm ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <div
                className={`prose max-w-none ${
                  message.role === 'user' ? 'prose-invert' : 'prose-gray dark:prose-invert'
                }`}
              >
                <ReactMarkdown components={createMarkdownComponents(message.role)}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 加载指示器 */}
      {loading && (
        <div className="flex justify-start">
          <div className="flex items-start space-x-3 max-w-3xl">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">正在思考...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
