'use client';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSrollContext} from '@/context/AppProvider';

const ChatGPTDemo = () => {
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        "You're a helpful chat bot. Answer short and concise in 150 tokens only.",
    },
  ]);
  const {handleLoadHrefPage} = useSrollContext();
  const [isLoading, setIsLoading] = useState(false);

  const messageClasses = (role: any) => ({
    'text-right justify-end': role === 'user',
    'text-left justify-start': role === 'assistant',
  });

  useEffect(() => {
    handleLoadHrefPage();
  }, []);

  const sendMessage = async () => {
    const data = [
      ...messages,
      {
        role: 'user',
        content: userInput,
      },
    ];

    // Append user message
    setMessages(data);

    try {
      setIsLoading(true);
      setUserInput('');

      // Send API request to OpenAI endpoint
      const response = await axios.post(
        'http://localhost:8000/v1/chat/completions',
        {
          model: 'gpt-4-1106-preview',
          messages: data,
          temperature: 0.9,
          max_tokens: 150,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        },
      );

      // Append ChatGPT response
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: response.data.choices[0].message.content,
        },
      ]);
    } catch (error) {
      console.error('There was an error with the API request', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="app" className="h-full bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto w-fit">
        <div className="mb-4">
          <h1 className="text-4xl font-bold text-center">Chat of JOB</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flow-root">
            <div className="mt-6">
              {/* Chat Input */}

              <div className="flex space-x-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message here..."
                  className="flex-1 rounded-md shadow-sm p-2 w-full"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-1">&#128259;</span>{' '}
                      Loading
                    </>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <ul className="divide-y divide-gray-200">
              {messages.map((message, index) => (
                <li key={index} className="py-3 sm:py-4">
                  <div
                    className={`flex items-center space-x-4 ${messageClasses(
                      message.role,
                    )}`}
                  >
                    <div className="flex-shrink-0">
                      {message.role === 'assistant' && (
                        <img
                          className="w-8 h-8 rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagONv1r-0HPnlnWClF12amS_KdrPX83zlhcXHyek&s"
                          alt="ChatGPT Icon"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm text-gray-800 break-normal whitespace-pre-line ${messageClasses(
                          message.role,
                        )}`}
                      >
                        {message.role === 'user' && (
                          <span className="font-bold">User: </span>
                        )}
                        {message.content}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTDemo;
