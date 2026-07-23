import ResourceTable from './ResourceTable.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const usersEndpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

const columns = [
  { key: 'name', label: 'Name', render: (user) => user.name },
  { key: 'username', label: 'Username', render: (user) => user.username },
  { key: 'email', label: 'Email', render: (user) => user.email },
  { key: 'team', label: 'Team', render: (user) => user.team },
]

function Users() {
  return (
    <ResourceTable
      title="Users"
      description="Athlete profiles connected to activity and team data."
      endpoint={usersEndpoint}
      columns={columns}
    />
  )
}

export default Users