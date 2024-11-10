import { IconButton } from '@chakra-ui/react'
import { useImageStore } from 'entities/upload/model/useImageStore'
import { useMatch, useNavigate } from 'react-router-dom'
import { Face, Picture, Scrin } from 'shared/iconpack'
import { Flex } from 'shared/ui'

function BoardMenu() {
  const setUpload = useImageStore((state) => state.setUpload)
  const setImage = useImageStore((state) => state.setImage)
  const navigate = useNavigate()
  const isHome = useMatch('/')
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'center'}
      align={'center'}
      h={'100%'}
      w={'100%'}
      gap={'24px'}
    >
        <IconButton
          isRound={true}
          w={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}
          h={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}
          aria-label="title"
          icon={<Picture width={'75%'} height={'auto'} strokeColor={isHome ? '#5F5ECF' : '#353535'}/>}
          color={isHome ? 'violet.500' : 'gray.500'}
          borderRadius="50%"
          background={'white'}
          boxShadow={
            isHome ? 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)' : ''}
          _hover={{
            color: 'violet.500',
            background: 'white',
            boxShadow: 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)',
          }}
          onClick={isHome ? () => {} : () => {
            setImage(null)
            setUpload(false)
            navigate('/')
          }}
        />
        <IconButton
          isRound={true}
          aria-label="title"
          icon={<Face width={'75%'} height={'auto'}/>}
          w={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}
          h={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}
          color={'gray.500'}
          borderRadius="30px"
          background={'white'}
          boxShadow={''}
          _hover={{
            color: 'violet.500',
            background: 'white',
            boxShadow: 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)',
          }}
          onClick={() => {}}
        />
        <IconButton
          isRound={true}
          aria-label="title"
          icon={<Scrin width={'75%'} height={'auto'}/>}
          w={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}
          h={{ sm: '40px', base: '40px', md: '60px', lg: '80px' }}
          color={'gray.500'}
          borderRadius="30px"
          background={'white'}
          boxShadow={''}
          _hover={{
            color: 'violet.500',
            background: 'white',
            boxShadow: 'inset 0px 0px 22.5px 0px rgba(255, 255, 255, 0.25), 0px 0px 8.9px 0px rgba(95, 94, 207, 1)',
          }}
          onClick={() => {}}
        />
    </Flex>
  )
}

export { BoardMenu }