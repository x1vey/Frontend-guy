interface LoaderProps {
  progress: number
  done: boolean
}

export default function Loader({ progress, done }: LoaderProps) {
  return (
    <div className={`loader${done ? ' is-done' : ''}`}>
      <div className="loader__count">
        <span>{String(Math.floor(progress)).padStart(2, '0')}</span>
        <span className="loader__pct">%</span>
      </div>
      <div className="loader__bar">
        <div className="loader__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
