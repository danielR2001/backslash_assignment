import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Routes } from '@constants/routes.constants'
import GraphPage from '@pages/graph_page'

const Router: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: Routes.ROOT,
      element: <GraphPage />
    }
  ])

  return <RouterProvider router={router} />
}

export default Router
