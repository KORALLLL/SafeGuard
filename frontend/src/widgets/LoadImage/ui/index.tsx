import { Rabbit } from "shared/iconpack"
import { Flex, Text } from "shared/ui"

export const LoadImage = () => {
    return(
        <Flex w={'100%'} h={'100%'} align={'center'} justifyContent={'center'} flexDir={'column'}>
        <Rabbit/>
        <Text>
        Подождите, идёт загрузка... 
        (13 kB / 1 MB)
        </Text>
        </Flex>
    )
}