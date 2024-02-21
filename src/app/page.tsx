import Navbar from '@/components/Navbar'
import Taskbar from '@/components/Taskbar'

const Page = () => {
  return (
    <div>
      <Navbar />
      <main className="app">
        <h1>Login:</h1>
        <a
          style={{
            color: 'red',
            border: '1px solid red',
            borderRadius: '10px',
          }}
          href="/api/auth/login"
        >
          Login
        </a>
      </main>
    </div>
  )
}
export default Page
