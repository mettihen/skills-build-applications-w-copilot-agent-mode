import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'rank', label: 'Rank', render: (entry) => entry.rank },
  { key: 'user', label: 'User', render: (entry) => entry.user },
  { key: 'team', label: 'Team', render: (entry) => entry.team },
  { key: 'points', label: 'Points', render: (entry) => entry.points },
]

function Leaderboard({ endpoint }) {
  return (
    <ResourceTable
      title="Leaderboard"
      description="Competitive standings across athletes and teams."
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Leaderboard