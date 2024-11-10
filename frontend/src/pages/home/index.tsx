import { Center, Flex, Text } from "shared/ui"
import { ImageUpload } from "widgets/index"

const HomePage = () => {
  return (
    <Center w={'100%'} h={'100%'}>
      <Flex flexDir={'column'}>
      <Text fontSize={'22px'} fontWeight={600} color={'gray.500'}>Поиск смысловых копий</Text>
      <ImageUpload/>
      </Flex>
    </Center>
  )
}

export default HomePage
