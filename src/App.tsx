import { Input } from "./components/ui/input"

function App() {
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="max-w-7xl mx-auto py-10">
        <img src="./sales-hub.png" alt="Coverpin"/>
        <Input placeholder="Search by name or company..." className="mt-2" />
      </div>
    </div>
  )
}

export default App
