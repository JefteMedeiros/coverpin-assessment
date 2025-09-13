import { useState } from "react"

function App() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <p>Hello Coverpin</p>
      <button type="button" onClick={() => setCount(count + 1)}>Click me</button>
      <p>Count: {count}</p>
    </>
  )
}

export default App
