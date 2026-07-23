import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Team', render: (team) => team.name },
  { key: 'mascot', label: 'Mascot', render: (team) => team.mascot },
  { key: 'members', label: 'Members', render: (team) => team.members },
]

function Teams({ endpoint }) {
  return (
    <ResourceTable
      title="Teams"
      description="Training groups, mascots, and team membership."
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Teams