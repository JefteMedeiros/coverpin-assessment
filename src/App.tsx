import { useState } from "react";
import { Input } from "./components/ui/input"
import { Option, Select, SelectContent, SelectTrigger } from "./components/ui/select"

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
];

function App() {
  const [selected, setSelected] = useState(people[1]);

  const _handleSelect = (value: unknown) => {
    setSelected(value as { id: number; name: string });
  };
  
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="max-w-7xl mx-auto py-10">
        <img src="./sales-hub.png" alt="Coverpin" />
        <div className="flex items-center gap-2 mt-4">
          <Input placeholder="Search by name or company..." />
          <Select value={selected} onChange={_handleSelect}>
            <SelectTrigger>
              {selected.name}
            </SelectTrigger>
            <SelectContent>
              {people.map((person) => (
                <Option key={person.id} value={person}>
                  {person.name}
                </Option>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

export default App
