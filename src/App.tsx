import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined

    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(prev => prev + 10)
      }, 10)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isRunning])

  const formatTime = useCallback((ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }, [])

  const handleStartStop = () => {
    setIsRunning(prev => !prev)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const handleLap = () => {
    if (isRunning) {
      setLaps(prev => [...prev, time])
    }
  }

  return (
    <div className="chronometer">
      <h1>Chronometer</h1>
      <div className="display">
        {formatTime(time)}
      </div>
      <div className="controls">
        <button onClick={handleStartStop}>
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset}>
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div className="laps">
          <h2>Laps</h2>
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                Lap {index + 1}: {formatTime(lapTime)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
