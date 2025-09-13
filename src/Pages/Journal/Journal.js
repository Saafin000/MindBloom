import React, { useEffect, useState } from "react";

const POSITIVE = ["happy","grateful","glad","good","great","love","excited","calm","relieved","optimistic","joy","peace"];
const NEGATIVE = ["sad","angry","depressed","anxious","stressed","worried","tired","lonely","frustrated","helpless","upset","overwhelmed"];
const TOPIC_KEYWORDS = {
  sleep: ["sleep","insomnia","tired","night","rest"],
  relationships: ["friend","love","relationship","partner","family","parents","brother","sister"],
  school: ["exam","study","class","college","assignment","project","teacher","grade"],
  work: ["work","job","boss","office","client","deadline"],
  health: ["health","sick","doctor","exercise","diet","eat","fitness"],
  social: ["party","hangout","meet","date","social"],
  gratitude: ["grateful","thank","blessed"]
};

// --- Simple text analysis ---
function analyzeText(text) {
  const textLower = text.toLowerCase();
  const words = textLower.match(/\b\w+\b/g) || [];

  let score = 0;
  words.forEach((w) => {
    if (POSITIVE.includes(w)) score++;
    if (NEGATIVE.includes(w)) score--;
  });

  let sentiment = "neutral";
  if (score > 0) sentiment = "positive";
  if (score < 0) sentiment = "negative";

  const topics = [];
  for (const [topic, list] of Object.entries(TOPIC_KEYWORDS)) {
    if (list.some((kw) => textLower.includes(kw))) topics.push(topic);
  }

  const suggestions = [];
  if (sentiment === "negative") {
    suggestions.push("Try a 5-minute grounding breathing exercise: inhale 4s, hold 4s, exhale 6s.");
    suggestions.push("If this continues, consider reaching out to a friend or counselor.");
  } else if (sentiment === "positive") {
    suggestions.push("Nice! Celebrate the wins. Write one small goal for tomorrow to keep momentum.");
  } else {
    suggestions.push("Thanks for sharing. Reflect on one small improvement you can make tomorrow.");
  }
  if (topics.includes("sleep")) suggestions.push("Sleep tip: stick to a consistent sleep schedule.");
  if (topics.includes("school") || topics.includes("work")) suggestions.push("Try the Pomodoro technique: 25m focus, 5m break.");
  if (topics.includes("gratitude")) suggestions.push("Keep noting 3 things you’re grateful for daily.");
  if (topics.includes("relationships")) suggestions.push("Communicate feelings calmly: 'I felt X when Y happened'.");

  const summary = generateSummary(text);
  return { sentiment, score, topics, suggestions, summary };
}

function generateSummary(text, maxSentences = 2) {
  const sentences = text.split(/[.!?]\s+/).filter(Boolean);
  if (sentences.length === 0) return "";
  const picked = sentences.slice(0, maxSentences).join(". ");
  return picked.length > 200 ? picked.slice(0, 197) + "..." : picked;
}

// --- Main Component ---
export default function AIJournal() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [title, setTitle] = useState("");
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai_journal_entries_v1");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("ai_journal_entries_v1", JSON.stringify(entries));
  }, [entries]);

  function handleSave() {
    if (!text.trim()) return;
    const now = new Date().toISOString();
    const item = {
      id: now,
      title: title || generateSummary(text, 1) || "Untitled Entry",
      text,
      analysis: analyzeText(text),
      createdAt: now,
    };
    setEntries((s) => [item, ...s]);
    setText("");
    setTitle("");
    setAnalysis(null);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1500);
  }

  function handleShare(entry) {
    if (navigator.share) {
      navigator.share({ title: entry.title, text: entry.text }).catch(() => {});
    } else {
      navigator.clipboard.writeText(entry.text).then(() => {
        alert("Entry copied to clipboard.");
      });
    }
  }

  function handleDelete(id) {
    if (window.confirm("Delete this entry?")) {
      setEntries((s) => s.filter((e) => e.id !== id));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-indigo-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">🌱 AI Journal</h1>
          <p className="text-gray-600 mt-1">Write, reflect, and analyze your thoughts privately</p>
        </header>

        {/* Journal Input */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title (optional)</label>
          <input
            className="w-full rounded-lg border px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="e.g. Tough exam day"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">Your thoughts</label>
          <textarea
            className="w-full rounded-xl border p-3 h-40 resize-y placeholder-gray-400 focus:ring-2 focus:ring-indigo-200"
            placeholder="How are you feeling today? This space is private."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-4 flex gap-3">
            <button
              className="flex-1 py-2 rounded-full bg-gradient-to-r from-green-200 to-indigo-200 shadow hover:opacity-90"
              onClick={() => setAnalysis(analyzeText(text))}
            >
              Analyze
            </button>
            <button
              className="flex-1 py-2 rounded-full bg-indigo-600 text-white shadow hover:opacity-95"
              onClick={() => {
                setAnalysis(analyzeText(text));
                handleSave();
              }}
            >
              Analyze & Save
            </button>
          </div>

          {/* Analysis Box */}
          {analysis && (
            <div className="mt-5 bg-gray-50 rounded-lg p-4 border">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">Sentiment</p>
                  <p className="font-semibold capitalize">{analysis.sentiment} (score {analysis.score})</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Topics</p>
                  <p className="font-medium">{analysis.topics.join(", ") || "general"}</p>
                </div>
              </div>

              <p className="text-sm font-medium">Summary</p>
              <p className="text-gray-800 mb-3">{analysis.summary || "—"}</p>

              <p className="text-sm font-medium">Suggestions</p>
              <ul className="list-disc ml-5 mt-1 text-gray-700 space-y-1">
                {analysis.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Past Entries */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-3">📖 Past Entries</h2>
          {entries.length === 0 ? (
            <div className="text-center text-gray-500 p-6 bg-white rounded-lg shadow">
              No entries yet — write your first one above.
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((e) => (
                <article key={e.id} className="bg-white rounded-lg p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold">{e.title}</p>
                      <p className="text-xs text-gray-500">{new Date(e.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 text-sm rounded bg-indigo-50"
                        onClick={() => handleShare(e)}
                      >
                        Share
                      </button>
                      <button
                        className="px-3 py-1 text-sm rounded bg-red-50"
                        onClick={() => handleDelete(e.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 text-gray-800 whitespace-pre-wrap">{e.text}</p>

                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-gray-600">View Analysis</summary>
                    <div className="mt-2 text-sm text-gray-700">
                      Sentiment: <strong className="capitalize">{e.analysis.sentiment}</strong> (score {e.analysis.score})
                      <br />
                      Topics: {e.analysis.topics.join(", ") || "general"}
                      <br />
                      Suggestions:
                      <ul className="list-disc ml-5 mt-1">
                        {e.analysis.suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </article>
              ))}
            </div>
          )}
        </div>

        <footer className="mt-10 text-center text-sm text-gray-500">
          Your journal data is stored only on this device (localStorage).
        </footer>
      </div>

      {showSaved && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
          Saved ✓
        </div>
      )}
    </div>
  );
}
