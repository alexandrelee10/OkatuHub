import Link from 'next/link'
import React from 'react'

const HomeButton = () => {
  return (
    <div className="flex justify-center">
        <Link
        href="/"
        className="text-md px-3 py-1.5 rounded-full border border-red-500 hover:bg-red-600 hover:border-red-600 transition-colors"
        >
            Back to Home
        </Link>
    </div>
  )
}

export default HomeButton