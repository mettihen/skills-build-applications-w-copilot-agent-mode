import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

const navigationItems = [
  { path: '/activities', label: 'Activities' },
  { path: '/leaderboard', label: 'Leaderboard' },
  { path: '/teams', label: 'Teams' },
  { path: '/users', label: 'Users' },
  { path: '/workouts', label: 'Workouts' },
]

function resourceUrl(resourceName) {
  return `${apiBaseUrl}/${resourceName}/`
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Octofit Tracker</p>
          <h1>Team fitness command center</h1>
        </div>
        <nav className="nav flex-column gap-2" aria-label="Octofit sections">
          {navigationItems.map((item) => (
            <NavLink key={item.path} className="nav-link" to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="api-status">
          <span>API host</span>
          <code>{apiBaseUrl}</code>
        </div>
      </aside>

      <main className="content-panel">
        {!codespaceName && (
          <div className="alert alert-warning" role="alert">
            VITE_CODESPACE_NAME is not set. Using the local API fallback instead.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities endpoint={resourceUrl('activities')} />} />
          <Route path="/leaderboard" element={<Leaderboard endpoint={resourceUrl('leaderboard')} />} />
          <Route path="/teams" element={<Teams endpoint={resourceUrl('teams')} />} />
          <Route path="/users" element={<Users endpoint={resourceUrl('users')} />} />
          <Route path="/workouts" element={<Workouts endpoint={resourceUrl('workouts')} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
