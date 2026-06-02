import { createRootRoute, Outlet } from '@tanstack/react-router'
import Banner from '../components/Banner'

export const Route = createRootRoute({
  component: () => (
    <>
      <Banner />
      <Outlet />
    </>
  ),
})
