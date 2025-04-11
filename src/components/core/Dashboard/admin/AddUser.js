import { useState } from "react";
import AddUserForm from "./AddUserForm";
import AddUserByFile from "./AddUserByFile";

const tabs = [
  { name: 'Add User manually', id: 1},
  { name: 'Add User by file', id: 2},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AddUser() {

  const [selectedMenu,setSelectedMenu]=useState(1);

  return (
    <div className="flex flex-col gap-y-10">
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="isolate flex divide-x divide-gray-200 rounded-lg shadow">
          {tabs.map((tab, tabIdx) => (
            <div
              onClick={()=>{setSelectedMenu(tab.id)}}
              key={tab.name}
              className={classNames(
                tab.id===selectedMenu ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 cursor-pointer',
              )}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.id===selectedMenu ? 'bg-indigo-500' : 'bg-transparent',
                  'absolute inset-x-0 bottom-0 h-0.5',
                )}
              />
            </div>
          ))}
        </nav>
      </div>

            {selectedMenu===1 && <AddUserForm></AddUserForm>}
            {selectedMenu===2 && <AddUserByFile></AddUserByFile>} 
    </div>
  )
}