'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { sql } from '@vercel/postgres'

import Link from 'next/link'
import AddPetForm from '@/components/AddPetForm'

const Dashboard = () => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  return (
    <div className="w-screen h-screen flex flex-col items-center flex-start text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300">
      <h1 className="w-screen max-h-fit text-center text-xl m-5">Dashboard</h1>
      <Link
        className="max-h-fit bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-800 px-5 py-2 rounded-md"
        href="/"
      >
        Home
      </Link>
      {/* <AddPetForm /> */}
    </div>
  )
}
export default Dashboard
