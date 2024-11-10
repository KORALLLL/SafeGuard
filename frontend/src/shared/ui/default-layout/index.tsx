import { Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const DefaultLayout = ({ children }: { children: ReactNode }) => 
  {return(
  <Flex
    w="100vw"
    h="100vh"
    direction="column"
    justify="center"
  >
    {children}
  </Flex>
)}