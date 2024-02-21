import StartButton from './StartButton'

const Taskbar = () => {
  return (
    <div className="taskbar-container">
      <StartButton />
      <div className="taskbar-buttons">
        <a href="/">Home</a>
        <a href="/dashboard">Dashboard</a>
      </div>
      <div className="taskbar-farside"></div>
    </div>
  )
}
export default Taskbar
