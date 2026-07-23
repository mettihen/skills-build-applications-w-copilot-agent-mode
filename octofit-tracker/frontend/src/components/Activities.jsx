import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'type', label: 'Activity', render: (activity) => activity.type },
  { key: 'duration', label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
  { key: 'points', label: 'Points', render: (activity) => activity.points },
  { key: 'completed', label: 'Completed', render: (activity) => new Date(activity.completedAt).toLocaleDateString() },
]

function Activities({ endpoint }) {
  return (
    <ResourceTable
      title="Activities"
      description="Recent workouts, movement sessions, and point-earning activity logs."
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Activities