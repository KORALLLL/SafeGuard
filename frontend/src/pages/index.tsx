import { useImageStore } from 'entities/upload/model/useImageStore'
import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Logo } from 'shared/iconpack'
import { Flex, Layout, Text } from 'shared/ui'
import { BoardMenu } from 'widgets/index'

const HomePage = lazy(() => import('./home'))
const ResultPage = lazy(() => import('./result'))
const EditPage = lazy(() => import('./edit'))

export default function Routing() {
  const isUpload = useImageStore((state) => state.isUpload)
  return (
    <Layout>
        <Flex
          w="100%"
          h="100px"
          flexDirection="column"
          justifyContent="space-around"
        >
          <Flex ml={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}>
            <Logo width={'10%'} height={'auto'}/>
          </Flex>
        </Flex>
      <Flex w="100vw" h="100%">
        <Flex h="100%" w="100px" align={'center'} pl={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}>
            <BoardMenu />
        </Flex>
        <Routes>
          <Route
            path={'/'}
            element={
              <HomePage />
            }
          />
          <Route
            path={'/result'}
            element={
              isUpload ? (
                <ResultPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path={'/edit'}
            element={
              isUpload ? (
                <EditPage />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path={'*'}
            element={
              <Flex
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Text>404 page</Text>
              </Flex>
            }
          />
        </Routes>
      </Flex>
    </Layout>
  )
}