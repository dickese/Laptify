import { User } from 'lucide-react'
import React from 'react'

const TopBar = () => {
  return (
    <div className="flex items-center justify-between h-16 bg-gray-800 text-white px-6 shadow-md">
      <h1 className="text-2xl font-bold">QUẢN LÝ</h1>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-700 rounded-md transition">
          <User size={24} />
        </button>
      </div>
    </div>
  )
}

export default TopBar
