import { Navigate, Outlet, Route, Routes as RoutesWrapper } from 'react-router-dom'

import useChainConfig from 'hooks/chain/useChainConfig'
import Layout from 'pages/_layout'
import LiquidationsPage from 'pages/LiquidationsPage'
import MainPage from 'pages/MainPage'
import PerpsOverviewPage from 'pages/PerpsOverviewPage'

export default function Routes() {
  const chainConfig = useChainConfig()
  return (
    <RoutesWrapper>
      <Route
        element={
          <Layout>
            <Outlet />
          </Layout>
        }
      >
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<MainPage />} />

        <Route path='/main' element={<MainPage />} />
        <Route path='/liquidations' element={<LiquidationsPage />} />
        <Route path='/perps' element={chainConfig.perps ? <PerpsOverviewPage /> : <MainPage />}>
          <Route path=':asset' element={<PerpsOverviewPage />} />
        </Route>
      </Route>
    </RoutesWrapper>
  )
}
