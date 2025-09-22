import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import OverviewPage from './pages/overview';
import PortfolioPage from './pages/portfolio';
import DocketingPage from './pages/docketing';
import RenewalsPage from './pages/renewals';
import MonitoringPage from './pages/monitoring';
import DocumentsPage from './pages/documents';
import ReportingPage from './pages/reporting';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/login';

function App() {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState<string>('');

  const testBackend = async () => {
    await fetch('http://localhost:4000/health', {
      headers: new Headers(),
      method: 'get',
    })
    .then(resp => resp.json())
    .then(data => setStatus(data.status));
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-6">
              <header className="text-center">
                <h1 className="text-3xl font-bold">Equinox MVP</h1>
                <p className="text-sm text-gray-600 mt-1 select-none">React + TailwindCSS + TypeScript</p>
              </header>
              <main className="bg-white rounded-xl shadow p-6 space-y-4">
                <p className="text-gray-700">Count is <span className="font-semibold">{count}</span></p>
                <p className="text-gray-700">Status is <span className="font-semibold">{status}</span></p>
                <div className="flex gap-3">
                  <button
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setCount((c) => c + 1)}
                  >
                    Increment
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setCount(0)}
                  >
                    Reset
                  </button>
                  <button
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={testBackend}
                  >
                    Test Backend
                  </button>
                </div>
                <div className="pt-4">
                  <Link className="text-indigo-600 hover:underline" to="/dashboard">Go to Dashboard</Link>
                </div>
              </main>
              <footer className="text-center text-xs text-gray-500">
                Tailwind is configured. Edit <code>src/App.tsx</code> to continue.
              </footer>
            </div>
          </div>
        }
      />
      <Route element={<ProtectedRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route index element={<OverviewPage/>} />
          <Route path='portfolio' element={<PortfolioPage/>} />
          <Route path='docketing' element={<DocketingPage/>} />
          <Route path='renewals' element={<RenewalsPage/>} />
          <Route path='monitoring' element={<MonitoringPage/>} />
          <Route path='documents' element={<DocumentsPage/>} />
          <Route path='reporting' element={<ReportingPage/>} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
  )
}

export default App
