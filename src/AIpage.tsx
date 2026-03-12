import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, Plus, MessageSquare } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function AIpage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I’m your Finance AI assistant. Ask me about ETFs, stocks, compounding, long-term investing, or portfolio basics.",
    },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "What is an ETF?",
    "How does compounding work?",
    "Should I invest monthly?",
    "What is the S&P 500?",
  ];

  const getReply = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes("etf")) {
      return "ETFs are popular because they give diversification, simplicity, and lower risk compared to relying on a few individual stocks.";
    }

    if (lower.includes("compound")) {
      return "Compounding means your money earns returns, and then those returns start earning returns too. Over long periods, that can create very strong growth.";
    }

    if (lower.includes("s&p") || lower.includes("voo") || lower.includes("vfv")) {
      return "S&P 500 funds like VOO or VFV are commonly used for long-term investing because they give exposure to many large companies in one investment.";
    }

    if (lower.includes("monthly")) {
      return "Monthly investing helps build discipline and reduces the pressure of trying to perfectly time the market.";
    }

    if (lower.includes("stock")) {
      return "When looking at a stock, focus on business quality, revenue growth, profits, debt, valuation, and whether you can hold it for years.";
    }

    return "That’s a good question. My general approach is to keep investing simple, stay consistent, think long term, and avoid unnecessary risk.";
  };

  const handleSend = (customText?: string) => {
    const text = (customText ?? input).trim();
    if (!text) return;

    const userMessage: Message = { role: "user", text };
    const assistantMessage: Message = {
      role: "assistant",
      text: getReply(text),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <div className="flex min-h-screen bg-white text-zinc-900">
      <aside className="hidden w-[260px] flex-col border-r border-zinc-200 bg-zinc-50 md:flex">
        <div className="border-b border-zinc-200 p-4">
          <button className="flex w-full items-center gap-2 rounded-xl bg-zinc-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
            <Plus className="h-4 w-4" />
            New chat
          </button>
        </div>

        <div className="p-4">
          <Link
            to="/"
            className="block rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="px-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Recent
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
              <MessageSquare className="h-4 w-4" />
              Investing basics
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
              <MessageSquare className="h-4 w-4" />
              ETF questions
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center gap-3 px-4 py-4 sm:px-6">
            <Link
              to="/"
              className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 md:hidden"
            >
              Back
            </Link>

            <div>
              <h1 className="text-base font-semibold sm:text-lg">
                Finance AI Assistant
              </h1>
              <p className="text-xs text-zinc-500 sm:text-sm">
                Ask anything about simple long-term investing
              </p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex w-full max-w-4xl flex-col px-4 py-6 sm:px-6">
            {messages.length === 1 ? (
              <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
                  How can I help today?
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
                  Ask about ETFs, stocks, compounding, portfolio basics, or long-term wealth building.
                </p>

                <div className="mt-8 grid w-full max-w-2xl gap-3 sm:grid-cols-2">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSend(item)}
                      className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-left text-sm text-zinc-700 shadow-sm transition hover:bg-zinc-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 py-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`w-full ${message.role === "assistant" ? "bg-white" : "bg-zinc-50"}`}
                  >
                    <div className="mx-auto flex max-w-3xl gap-4 px-2 py-4 sm:px-4">
                      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                        {message.role === "assistant" ? "AI" : "P"}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="mb-1 text-sm font-semibold text-zinc-900">
                          {message.role === "assistant" ? "Assistant" : "You"}
                        </p>
                        <div className="whitespace-pre-wrap text-sm leading-7 text-zinc-700 sm:text-[15px]">
                          {message.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <div className="sticky bottom-0 border-t border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-[28px] border border-zinc-300 bg-white p-2 shadow-sm">
              <div className="flex items-end gap-2">
                <textarea
                  rows={1}
                  placeholder="Message Finance AI Assistant..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="max-h-40 min-h-[52px] flex-1 resize-none rounded-2xl border-0 px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
                />
                <button
                  onClick={() => handleSend()}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white transition hover:bg-zinc-800"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-xs text-zinc-400">
              Educational purposes only. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
