import { Tab, TabGroup, TabList, } from '@headlessui/react'

const categories = [
  {
    name: 'Leads',
  },
  {
    name: 'Opportunities',
  },
]

export default function LeadTabs() {
  return (
    <div className="w-fit">
      <TabGroup>
        <TabList className="flex gap-1.5 p-1 bg-zinc-700/50 rounded-lg">
          {categories.map(({ name }) => (
            <Tab
              key={name}
              className="rounded-md px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-primary data-selected:text-zinc-900 data-selected:data-hover:bg-primary/90"
            >
              {name}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  )
}