import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const activitiesEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

const columns = [
  { key: 'type', label: 'Activity', render: (activity) => activity.type },
  { key: 'duration', label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
  { key: 'points', label: 'Points', render: (activity) => activity.points },
  { key: 'completed', label: 'Completed', render: (activity) => new Date(activity.completedAt).toLocaleDateString() },
]

function Activities() {
  return (
    <ResourceTable
      title="Activities"
      description="Recent workouts, movement sessions, and point-earning activity logs."
      endpoint={activitiesEndpoint}
      columns={columns}
    />
  )
}

export default Activities