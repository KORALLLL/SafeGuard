//import { useTheme } from "@chakra-ui/react"
import { Box, Image, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useImageStore } from "entities/upload/model/useImageStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Loading, Text } from "shared/ui"
import { useGetImages } from "../lib";
import { Nothing } from "shared/iconpack";

export const Result = () => {
    const navigate = useNavigate()
    const {imagesData, isFetching} = useGetImages()
    console.log(imagesData)
    const image = useImageStore((state) => state.image)
    const setUpload = useImageStore((state) => state.setUpload)
    const setImage = useImageStore((state) => state.setImage)
    const [isLandscape, setIsLandscape] = useState<boolean | null>(null); 
    console.log(isLandscape)

    //const imageUrl = 'https://avatars.dzeninfra.ru/get-ynews/271828/c420e881d62fe8317440717c31e026fd/992x496';
    //const imageUrl = 'https://i.pinimg.com/736x/d1/6c/5b/d16c5b47552d9e8bd71582abec78b4d7.jpg';

    useEffect(() => {
        if (image) {
            const img = new window.Image();
            const imageUrl = typeof image === 'string' ? image : URL.createObjectURL(image);
            img.src = imageUrl;
            img.onload = () => {
                setIsLandscape(img.width > img.height);
            };
            return () => {
                if (typeof image !== 'string') {
                    URL.revokeObjectURL(imageUrl);
                }
            };
        }
    }, [image]);    

    return (
        <Flex
        flexDir={isLandscape ? 'column' : 'row'}
        bgColor={'gray.100'}
        boxShadow={'0px 0px 4px 0px rgba(191, 193, 197, 1)'}
        borderRadius={'20px'}
        w={isLandscape ? { sm: '1020px', base: '1020px', md: '1630px', lg: '1580px' } : { sm: '1148px', base: '1148px', md: '1595px', lg: '1580px' }}
        h={{ sm: '663px', base: '663px', md: '700px', lg: '700px' }}
        gap={!isLandscape ? '48px' : '0px'}
        p={'20px'}
        >
            {isFetching ?
            <Loading/>
            :
            <>
            <Flex flexDir={!isLandscape ? 'column' : 'row'} w={!isLandscape ? '358px' : '100%'} h={'100%'} justifyContent={'space-between'}>
                <Box w={'358px'}>
                    <Image
                    src={image ? (typeof image === 'string' ? image : URL.createObjectURL(image)) : undefined}
                    boxSize={isLandscape ? { sm: 'auto 142px', base: 'auto 142px', md: '200px auto', lg: 'auto 200px' } : { sm: '438px auto', base: '438px auto', md: '657px auto', lg: '657px auto' }} 
                    objectFit='cover'
                    borderRadius={'10px'}
                    />
                </Box>
                <Button
                w={isLandscape ? '358px' : '100%'}
                fontSize={{ sm: '14px', base: '14px', md: '18px', lg: '18px' }}
                h={{ sm: '40px', base: '40px', md: '50px', lg: '50px' }}
                variant={'cancel'}
                onClick={() => {
                    setImage(null)
                    setUpload(false)
                    navigate('/')
                }}
                >
                Очистить и вернуться на главную
                </Button>
            </Flex>
            <Flex flexDir={'column'} w={'100%'} justifyContent={'flex-start'} pr={'28px'}>
                <Text color={'gray.500'} fontSize={'16px'} fontWeight={500}>
                Похоже, на картинке:
                </Text>
                <Flex align={'center'} gap={'12px'} mt={'6px'}>
                    <Box bgColor={'gray.200'} borderRadius={'8px'} p={'4px 25px'}>
                        <Text color={'gray.500'} fontSize={'14px'} fontWeight={400}>
                            животные
                        </Text>
                    </Box>
                    <Box bgColor={'gray.200'} borderRadius={'8px'} p={'4px 25px'}>
                        <Text color={'gray.500'} fontSize={'14px'} fontWeight={400}>
                            хомяк
                        </Text>
                    </Box>
                </Flex>
                <Tabs mt={'20px'} variant='unstyled'>
                    <Flex align={'center'} justifyContent={'space-between'}>
                    <TabList>
                        <Tab color={'gray.500'} _selected={{ color: 'violet.500', borderBottom: '2px solid #5F5ECF' }}>Похожие</Tab>
                        <Tab color={'gray.500'} _selected={{ color: 'violet.500', borderBottom: '2px solid #5F5ECF' }}>Сайты</Tab>
                    </TabList>
                    <Text
                    cursor={'pointer'}
                        fontSize={'14px'}
                        fontWeight={500}
                        color={'violet.500'}
                        _hover={{
                            color: 'violet.600'
                        }}
                        onClick={() => {}}
                    >
                        Заблокировать все
                    </Text>
                    </Flex>
                    <TabPanels>
                        <TabPanel>
                            <Flex wrap={'wrap'} gap={'24px'} mt={'10px'} overflowY={'auto'} 
                            maxH={!isLandscape ? { sm: '480px', base: '480px', md: '520px', lg: '520px' } : { sm: '270px', base: '270px', md: '310px', lg: '310px' }}>
                                {imagesData && imagesData.map((item) => (
                                    <Box key={item.id} w="198px">
                                        <Image
                                            src={item.file_link}
                                            boxSize="198px"
                                            borderRadius="8px"
                                            objectFit="cover"
                                            mb="8px"
                                        />
                                        <Text fontSize="14px" color="gray.500" fontWeight={500}>
                                            описание, теги
                                        </Text>
                                        <Text fontSize="14px" color="violet.500" cursor="pointer" fontWeight={500}
                                            _hover={{ color: 'violet.600' }}
                                        >
                                            Заблокировать
                                        </Text>
                                    </Box>
                                ))}
                                {!imagesData && 
                                <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'} w={'100%'}>
                                    <Nothing/>
                                    <Text fontSize={'20px'} fontWeight={400} color={'gray.500'}>
                                    Совпадения на сайтах не найдены
                                </Text>
                                </Flex>}
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex 
                            flexDir={'column'}
                            justifyContent={'center'}
                            wrap={'wrap'} gap={'24px'} mt={'40px'} overflowY={'auto'} maxH={{ sm: '480px', base: '480px', md: '520px', lg: '520px' }} align={'center'}>
                                <Nothing/>
                                <Text fontSize={'20px'} fontWeight={400} color={'gray.500'}>
                                Совпадения на сайтах не найдены
                                </Text>
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
            </>
            }
        </Flex>
    )
}