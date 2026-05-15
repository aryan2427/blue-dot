"use client";

import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatSidebar({
  isOpen,
  onClose,
}: Props) {

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  const [loading, setLoading] = useState(false);

  // SEND MESSAGE FUNCTION
  const handleSend = async () => {

    if (!message.trim()) return;

    const userMessage = message;

    // SHOW USER MESSAGE INSTANTLY
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    // CLEAR INPUT
    setMessage("");

    // START LOADING
    setLoading(true);

    try {

      // API CALL TO FLASK
      const response = await fetch(
        "http://127.0.0.1:5000/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      // SHOW AI RESPONSE
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.response,
        },
      ]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "Error getting response from AI",
        },
      ]);

    }

    // STOP LOADING
    setLoading(false);
  };

  return (
    <div
      className={`
        bg-white border-l shadow-lg
        transition-all duration-300 ease-in-out
        overflow-hidden
        ${isOpen ? "w-[400px]" : "w-0"}
      `}
    >
      <div className="h-screen flex flex-col">

        {/* HEADER */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">

          <h2 className="font-semibold text-lg">
            Blue Dot AI
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">

          {messages.map((msg, index) => (

            <div
              key={index}
              className={`
                max-w-[85%] p-3 rounded-xl
                ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white ml-auto"
                    : "bg-white border"
                }
              `}
            >
              {msg.text}
            </div>

          ))}

          {/* LOADING INDICATOR */}
          {loading && (
            <div className="bg-white border p-3 rounded-xl w-fit text-gray-500 italic">
              AI is typing...
            </div>
          )}

        </div>

        {/* INPUT AREA */}
        <div className="border-t bg-white p-4 flex gap-2">

          <input
            type="text"
            placeholder="Ask something..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }

            // ENTER KEY SUPPORT
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}

            className="
              flex-1
              border
              rounded-lg
              px-4
              py-2
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="
              bg-blue-600
              text-white
              px-5
              rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {loading ? "..." : "Send"}
          </button>

        </div>
      </div>
    </div>
  );
}