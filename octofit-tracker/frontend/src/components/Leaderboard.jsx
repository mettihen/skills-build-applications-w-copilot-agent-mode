import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const leaderboardEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

const columns = [
  { key: 'rank', label: 'Rank', render: (entry) => entry.rank },
  { key: 'user', label: 'User', render: (entry) => entry.user },
  { key: 'team', label: 'Team', render: (entry) => entry.team },
  { key: 'points', label: 'Points', render: (entry) => entry.points },
]

function Leaderboard() {
  return (
    <ResourceTable
      title="Leaderboard"
      description="Competitive standings across athletes and teams."
      endpoint={leaderboardEndpoint}
      columns={columns}
    />
  )
}

export default Leaderboard