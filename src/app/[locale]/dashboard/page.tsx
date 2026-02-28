'use client'

import Form from '@/components/Form'
import { Link } from '@/i18n/navigation'

const Dashboard = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center flex-start text-slate-600 bg-slate-200 dark:bg-slate-700 dark:text-slate-300">
      <h1 className="w-screen max-h-fit text-center text-xl mt-16">
        Dashboard
      </h1>
      <Link
        className="max-h-fit bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-800 px-5 py-2 rounded-md"
        href="/"
      >
        Home
      </Link>
      <Form />
    </div>
  )
}
export default Dashboard
