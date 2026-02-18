import { useState } from "react";

export default function RiddleEditor() {
  const [riddle, setRiddle] = useState({
    title: "",
    logs: "",
    question: "",
    answers: ["", "", "", ""],
    correctIndex: 0
  });

  function updateAnswer(index, value) {
    const updated = [...riddle.answers];
    updated[index] = value;
    setRiddle({ ...riddle, answers: updated });
  }

  function saveRiddle() {
    const saved = JSON.parse(localStorage.getItem("riddles")) || [];
    saved.push(riddle);
    localStorage.setItem("riddles", JSON.stringify(saved));
    alert("Énigme sauvegardée !");
  }

  return (
    <div className="terminal-box">
      <h1>Éditeur d’énigme</h1>

      <input
        placeholder="Titre"
        value={riddle.title}
        onChange={(e) => setRiddle({ ...riddle, title: e.target.value })}
      />

      <textarea
        placeholder="Logs (1 ligne par log)"
        value={riddle.logs}
        onChange={(e) => setRiddle({ ...riddle, logs: e.target.value })}
      />

      <input
        placeholder="Question"
        value={riddle.question}
        onChange={(e) => setRiddle({ ...riddle, question: e.target.value })}
      />

      {riddle.answers.map((a, i) => (
        <input
          key={i}
          placeholder={`Réponse ${i + 1}`}
          value={a}
          onChange={(e) => updateAnswer(i, e.target.value)}
        />
      ))}

      <label>
        Bonne réponse :
        <select
          value={riddle.correctIndex}
          onChange={(e) =>
            setRiddle({ ...riddle, correctIndex: Number(e.target.value) })
          }
        >
          {[0, 1, 2, 3].map((i) => (
            <option key={i} value={i}>
              Réponse {i + 1}
            </option>
          ))}
        </select>
      </label>

      <button onClick={saveRiddle}>Sauvegarder</button>
    </div>
  );
}
