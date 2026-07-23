import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'title', label: 'Workout', render: (workout) => workout.title },
  { key: 'difficulty', label: 'Difficulty', render: (workout) => workout.difficulty },
  { key: 'duration', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
  { key: 'activityTypes', label: 'Activity Types', render: (workout) => workout.activityTypes },
]

function Workouts({ endpoint }) {
  return (
    <ResourceTable
      title="Workouts"
      description="Suggested sessions by difficulty, duration, and activity type."
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Workouts