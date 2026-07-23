import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const workoutsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

const columns = [
  { key: 'title', label: 'Workout', render: (workout) => workout.title },
  { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty },
  { key: 'duration', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  { key: 'activityTypes', label: 'Activity Types', render: (workout) => workout.activityTypes },
]

function Workouts() {
  return (
    <ResourceTable
      title="Workouts"
      description="Suggested sessions by difficulty, duration, and activity type."
      endpoint={workoutsEndpoint}
      columns={columns}
    />
  )
}

export default Workouts