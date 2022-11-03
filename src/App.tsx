import React from 'react'
import './App.css'
import Home from './pages/home/Home'
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom'

const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Home />} />)
)

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
