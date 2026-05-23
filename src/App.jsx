import { useState } from "react"
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"

import { generateInterviewQuestions } from "./services/gemini"
import { db } from "./firebase.js"

function App() {
  const [page, setPage] = useState("home")

  const [role, setRole] = useState("Software Developer")
  const [type, setType] = useState("Technical")
  const [difficulty, setDifficulty] = useState("Beginner")

  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [answers, setAnswers] = useState([])
  const [answerInput, setAnswerInput] = useState("")

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const [history, setHistory] = useState([])
  const [selectedInterview, setSelectedInterview] = useState(null)

  const roles = [
    "Software Developer",
    "Frontend Developer",
    "Android Developer",
    "Data Analyst",
    "Product Analyst",
    "HR Interview",
  ]

  const types = [
    "Technical",
    "HR",
    "Behavioral",
    "Mixed",
  ]

  const difficulties = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ]

  function generateFeedback(finalAnswers = answers) {
    const allAnswers = finalAnswers.join(" ").toLowerCase()

    const totalWords = allAnswers
      .split(" ")
      .filter((w) => w.trim()).length

    let score = 0

    let strengths = []
    let improvements = []

    const technicalKeywords = [
      "react",
      "api",
      "database",
      "algorithm",
      "frontend",
      "backend",
      "state",
      "component",
      "javascript",
      "kotlin",
      "android",
      "sql",
      "firebase",
      "ui",
      "ux",
      "performance",
    ]

    const weakWords = [
      "yes",
      "no",
      "idk",
      "maybe",
      "ok",
      "okay",
    ]

    if (totalWords > 80) {
      score += 2
      strengths.push("Answers were sufficiently detailed")
    } else {
      improvements.push("Answers were too short")
    }

    if (totalWords > 180) {
      score += 2
      strengths.push("Provided deeper explanations")
    }

    const keywordCount = technicalKeywords.filter((word) =>
      allAnswers.includes(word)
    ).length

    if (keywordCount >= 3) {
      score += 2
      strengths.push("Used relevant technical terminology")
    } else {
      improvements.push("Add more technical concepts")
    }

    if (
      allAnswers.includes("because") ||
      allAnswers.includes("for example")
    ) {
      score += 2
      strengths.push("Included reasoning in answers")
    } else {
      improvements.push("Explain reasoning more clearly")
    }

    const weakCount = weakWords.filter((word) =>
      allAnswers.includes(word)
    ).length

    if (weakCount >= 3) {
      score -= 2
      improvements.push("Avoid one-word answers")
    }

    if (difficulty === "Intermediate") score += 1
    if (difficulty === "Advanced") score += 2

    if (score < 1) score = 1
    if (score > 10) score = 10

    if (strengths.length === 0) {
      strengths.push("Completed interview session")
    }

    return {
      score: score.toFixed(1),
      strengths,
      improvements,
    }
  }

  async function handleGenerateQuestions() {
    setLoading(true)

    try {
      const result = await generateInterviewQuestions(
        role,
        type,
        difficulty
      )

      const formattedQuestions = result
        .split("\n")
        .map((q) => q.trim())
        .filter((q) => q !== "")

      setQuestions(formattedQuestions)

      setAnswers([])
      setAnswerInput("")
      setCurrentQuestion(0)
      setSaved(false)

      setPage("interview")
    } catch (error) {
      alert("Something went wrong while generating questions.")
      console.error(error)
    }

    setLoading(false)
  }

  async function saveInterviewSession(finalAnswers) {
    const feedback = generateFeedback(finalAnswers)

    await addDoc(collection(db, "interviews"), {
      role,
      type,
      difficulty,
      questions,
      answers: finalAnswers,
      score: feedback.score,
      strengths: feedback.strengths,
      improvements: feedback.improvements,
      createdAt: serverTimestamp(),
    })

    setSaved(true)
  }

  async function handleNextQuestion() {
    const updatedAnswers = [...answers, answerInput]

    setAnswers(updatedAnswers)

    setAnswerInput("")

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setPage("summary")

      try {
        await saveInterviewSession(updatedAnswers)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function loadDashboard() {
    const q = query(
      collection(db, "interviews"),
      orderBy("createdAt", "desc")
    )

    const snapshot = await getDocs(q)

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    setHistory(data)

    setPage("dashboard")
  }

  const feedback = generateFeedback()

  if (page === "details") {
    return (
      <main className="min-h-screen bg-[#120f0d] px-10 py-8 text-[#fff7ed]">
        <button
          onClick={() => setPage("dashboard")}
          className="mb-8 text-orange-300"
        >
          ← Back Dashboard
        </button>

        <section className="mx-auto max-w-5xl rounded-[32px] border border-orange-500/20 bg-[#1a1411]/80 p-10">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            Interview Details
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            {selectedInterview?.role}
          </h1>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="rounded-full bg-orange-500/20 px-5 py-2">
              {selectedInterview?.type}
            </div>

            <div className="rounded-full bg-orange-500/20 px-5 py-2">
              {selectedInterview?.difficulty}
            </div>

            <div className="rounded-full bg-orange-500/20 px-5 py-2 font-bold text-orange-400">
              {selectedInterview?.score}/10
            </div>
          </div>

          <div className="mt-10 space-y-6">
            {selectedInterview?.questions?.map((question, index) => (
              <div
                key={index}
                className="rounded-3xl border border-orange-500/20 bg-black/30 p-6"
              >
                <p className="font-semibold text-orange-300">
                  {question}
                </p>

                <p className="mt-4 text-orange-100/70">
                  {selectedInterview?.answers?.[index]}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <FeedbackCard
              title="Strengths"
              items={selectedInterview?.strengths || []}
              symbol="✓"
            />

            <FeedbackCard
              title="Improvements"
              items={selectedInterview?.improvements || []}
              symbol="•"
            />
          </div>
        </section>
      </main>
    )
  }

  if (page === "dashboard") {
    const total = history.length

    const avg =
      total > 0
        ? (
            history.reduce(
              (sum, item) =>
                sum + Number(item.score || 0),
              0
            ) / total
          ).toFixed(1)
        : "0.0"

    return (
      <main className="min-h-screen bg-[#120f0d] px-10 py-8 text-[#fff7ed]">
        <button
          onClick={() => setPage("home")}
          className="mb-8 text-orange-300"
        >
          ← Back Home
        </button>

        <section className="mx-auto max-w-6xl">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            Dashboard
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Your interview history
          </h1>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <StatCard
              title="Total Interviews"
              value={total}
            />

            <StatCard
              title="Average Score"
              value={`${avg}/10`}
            />

            <StatCard
              title="Latest Role"
              value={history[0]?.role || "No data"}
            />
          </div>

          <div className="mt-10 space-y-5">
            {history.length === 0 ? (
              <div className="rounded-3xl border border-orange-500/20 bg-black/30 p-8">
                No interview history yet.
              </div>
            ) : (
              history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedInterview(item)
                    setPage("details")
                  }}
                  className="cursor-pointer rounded-3xl border border-orange-500/20 bg-[#1a1411]/80 p-6 transition hover:border-orange-500"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {item.role}
                      </h2>

                      <p className="mt-2 text-orange-100/60">
                        {item.type} • {item.difficulty}
                      </p>
                    </div>

                    <div className="rounded-full bg-orange-500/20 px-5 py-3 text-2xl font-bold text-orange-400">
                      {item.score}/10
                    </div>
                  </div>

                  <p className="mt-5 text-orange-100/70">
                    Questions answered:{" "}
                    {item.answers?.length || 0}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    )
  }

  if (page === "setup") {
    return (
      <main className="min-h-screen bg-[#120f0d] px-10 py-8 text-[#fff7ed]">
        <button
          onClick={() => setPage("home")}
          className="mb-10 text-orange-300"
        >
          ← Back
        </button>

        <section className="mx-auto max-w-5xl rounded-[32px] border border-orange-500/20 bg-[#1a1411]/80 p-10">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            Interview Setup
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Customize your mock interview.
          </h1>

          <SelectGroup
            title="Choose Role"
            items={roles}
            selected={role}
            setSelected={setRole}
          />

          <SelectGroup
            title="Interview Type"
            items={types}
            selected={type}
            setSelected={setType}
          />

          <SelectGroup
            title="Difficulty"
            items={difficulties}
            selected={difficulty}
            setSelected={setDifficulty}
          />

          <button
            onClick={handleGenerateQuestions}
            className="mt-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-semibold text-black"
          >
            {loading
              ? "Generating..."
              : "Generate Questions"}
          </button>
        </section>
      </main>
    )
  }

  if (page === "interview") {
    return (
      <main className="min-h-screen bg-[#120f0d] px-10 py-8 text-[#fff7ed]">
        <section className="mx-auto max-w-4xl rounded-[32px] border border-orange-500/20 bg-[#1a1411]/80 p-10">
          <h1 className="text-4xl font-bold">
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </h1>

          <div className="mt-8 rounded-3xl bg-black/30 p-8">
            <p className="text-2xl font-semibold">
              {questions[currentQuestion]}
            </p>
          </div>

          <textarea
            value={answerInput}
            onChange={(e) =>
              setAnswerInput(e.target.value)
            }
            placeholder="Type your answer..."
            className="mt-8 min-h-52 w-full rounded-3xl border border-orange-500/20 bg-black/30 p-6 outline-none"
          />

          <button
            onClick={handleNextQuestion}
            disabled={!answerInput.trim()}
            className="mt-6 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-semibold text-black disabled:opacity-40"
          >
            {currentQuestion === questions.length - 1
              ? "Finish Interview"
              : "Next Question"}
          </button>
        </section>
      </main>
    )
  }

  if (page === "summary") {
    return (
      <main className="min-h-screen bg-[#120f0d] px-10 py-8 text-[#fff7ed]">
        <section className="mx-auto max-w-5xl rounded-[32px] border border-orange-500/20 bg-[#1a1411]/80 p-10">
          <p className="font-semibold uppercase tracking-widest text-orange-400">
            AI Interview Feedback
          </p>

          <h1 className="mt-3 text-5xl font-bold">
            Your interview analysis
          </h1>

          <p className="mt-4 text-orange-300">
            {saved
              ? "✓ Saved to Firestore"
              : "Saving interview history..."}
          </p>

          <div className="mt-10 flex items-center gap-8">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-orange-500 bg-black/40 text-5xl font-bold text-orange-400">
              {feedback.score}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Overall Performance Score
              </h2>

              <p className="mt-3 text-orange-100/60">
                Score is out of 10.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <FeedbackCard
              title="Strengths"
              items={feedback.strengths}
              symbol="✓"
            />

            <FeedbackCard
              title="Improvements"
              items={feedback.improvements}
              symbol="•"
            />
          </div>

          <button
            onClick={loadDashboard}
            className="mt-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-semibold text-black"
          >
            View Dashboard
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#120f0d] text-[#fff7ed]">
      <div className="absolute left-[-120px] top-[-120px] h-[350px] w-[350px] rounded-full bg-orange-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-150px] right-[-120px] h-[400px] w-[400px] rounded-full bg-amber-400/10 blur-3xl"></div>

      <nav className="relative z-10 flex items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold tracking-wide text-orange-400">
          AcePrep AI
        </h1>

        <button
          onClick={loadDashboard}
          className="rounded-full border border-orange-500/40 px-5 py-2 text-orange-100/80"
        >
          Dashboard
        </button>
      </nav>

      <section className="relative z-10 flex min-h-[85vh] items-center justify-center px-10">
        <div className="grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 font-semibold uppercase tracking-widest text-orange-400">
              AI Mock Interview Coach
            </p>

            <h2 className="text-6xl font-bold leading-tight">
              Ace your interviews with{" "}
              <span className="text-orange-500">
                AI-powered practice.
              </span>
            </h2>

            <p className="mt-6 text-lg text-orange-100/70">
              Practice technical, HR, and behavioral
              interviews.
            </p>

            <button
              onClick={() => setPage("setup")}
              className="mt-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-8 py-4 font-semibold text-black"
            >
              Start Interview
            </button>
          </div>

          <div className="rounded-[32px] border border-orange-500/20 bg-[#1a1411]/80 p-8">
            <p className="text-sm text-orange-200/60">
              Interview Performance
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              8.9/10
            </h3>

            <div className="mt-5 rounded-2xl bg-black/30 p-4">
              Communication 92%
            </div>

            <div className="mt-5 rounded-2xl bg-black/30 p-4">
              Technical Skills 87%
            </div>

            <div className="mt-5 rounded-2xl bg-black/30 p-4">
              Confidence 95%
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function SelectGroup({
  title,
  items,
  selected,
  setSelected,
}) {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">
        {title}
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`rounded-2xl border p-4 text-left ${
              selected === item
                ? "border-orange-500 bg-orange-500/20"
                : "border-orange-500/20 bg-black/30"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

function FeedbackCard({
  title,
  items,
  symbol,
}) {
  return (
    <div className="rounded-3xl border border-orange-500/20 bg-black/30 p-8">
      <h3 className="text-2xl font-bold text-orange-300">
        {title}
      </h3>

      <ul className="mt-5 space-y-3 text-orange-100/70">
        {items.map((item, index) => (
          <li key={index}>
            {symbol} {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-orange-500/20 bg-black/30 p-6">
      <p className="text-orange-100/60">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-orange-400">
        {value}
      </h2>
    </div>
  )
}

export default App