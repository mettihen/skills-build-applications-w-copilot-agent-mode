import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const teamsEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

const columns = [
  { key: 'name', label: 'Team', render: (team) => team.name },
  { key: 'mascot', label: 'Mascot', render: (team) => team.mascot },
  { key: 'members', label: 'Members', render: (team) => team.members },
]

function Teams() {
  return (
    <ResourceTable
      title="Teams"
      description="Training groups, mascots, and team membership."
      endpoint={teamsEndpoint}
      columns={columns}
    />
  )
}

export default Teams