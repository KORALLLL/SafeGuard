import { Center, Flex, Text } from "shared/ui"
import { LassoSelector } from "widgets/index"

const EditPage = () => {
  return (
    <Center w={'100%'} h={'100%'}>
        <Flex flexDir={'column'}>
        <Text fontSize={'22px'} fontWeight={600} color={'gray.500'}>
        Выберите область, которую вы хотите проанализировать или просто продолжите
        </Text>
        <LassoSelector/>
        </Flex>
    </Center>
  )
}

export default EditPage
