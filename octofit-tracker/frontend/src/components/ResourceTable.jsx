import { useEffect, useState } from 'react'

function getItemsFromResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'items', 'data', 'docs']
  const collection = collectionKeys.map((key) => payload[key]).find(Array.isArray)

  return collection || []
}

function getPaginationSummary(payload, itemCount) {
  if (Array.isArray(payload) || !payload || typeof payload !== 'object') {
    return `${itemCount} records`
  }

  const total = payload.total ?? payload.count ?? payload.totalDocs ?? itemCount
  const page = payload.page ?? payload.currentPage
  const totalPages = payload.totalPages ?? payload.pages

  if (page && totalPages) {
    return `${itemCount} of ${total} records, page ${page} of ${totalPages}`
  }

  return `${itemCount} of ${total} records`
}

function formatCellValue(value) {
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : 'None'
  }

  if (value && typeof value === 'object') {
    return value.name || value.username || value.title || value._id || JSON.stringify(value)
  }

  if (value === undefined || value === null || value === '') {
    return 'None'
  }

  return String(value)
}

function ResourceTable({ title, description, endpoint, columns }) {
  const [items, setItems] = useState([])
  const [summary, setSummary] = useState('0 records')
  const [status, setStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const abortController = new AbortController()

    async function loadResource() {
      setStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(endpoint, { signal: abortController.signal })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        const nextItems = getItemsFromResponse(payload)

        setItems(nextItems)
        setSummary(getPaginationSummary(payload, nextItems.length))
        setStatus('ready')
      } catch (error) {
        if (error.name === 'AbortError') {
          return
        }

        setItems([])
        setSummary('0 records')
        setErrorMessage(error.message)
        setStatus('error')
      }
    }

    loadResource()

    return () => abortController.abort()
  }, [endpoint])

  return (
    <section className="resource-view">
      <div className="resource-header">
        <div>
          <p className="eyebrow">Live API data</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="resource-meta">
          <span>{summary}</span>
          <code>{endpoint}</code>
        </div>
      </div>

      {status === 'loading' && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
      {status === 'error' && <div className="alert alert-danger">{errorMessage}</div>}

      {status === 'ready' && items.length === 0 && (
        <div className="empty-state">No records returned yet.</div>
      )}

      {items.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle octofit-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id || item.id || JSON.stringify(item)}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatCellValue(column.render(item))}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceTable