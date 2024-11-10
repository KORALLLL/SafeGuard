import { useTheme } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { CloudUpload } from "shared/iconpack"
import { Button, Flex, Text } from "shared/ui"
//import { useImageUpload } from "../lib"
import { useImageStore } from "entities/upload/model/useImageStore"
import { useNavigate } from "react-router-dom"

const MAX_FILE_SIZE_MB = 50

export const ImageUpload = () => {
  const navigate = useNavigate()
  const setUpload = useImageStore((state) => state.setUpload)
  const setImage = useImageStore((state) => state.setImage)
    const theme = useTheme()
    const gray500 = theme.colors.gray['500']
    const [file, setFile] = useState<File | null>(null)
    //const { uploadImage } = useImageUpload()
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
          processFile(selectedFile);
        }
      };
    
      const handlePaste = (event: ClipboardEvent) => {
        const clipboardItems = event.clipboardData?.items;
        if (clipboardItems) {
          for (const item of clipboardItems) {
            if (item.type.startsWith('image')) {
              const pastedFile = item.getAsFile();
              if (pastedFile) {
                processFile(pastedFile);
              }
              event.preventDefault(); 
              break;
            }
          }
        }
      };
    
      const processFile = (selectedFile: File) => {
        if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          alert(`Файл слишком большой. Максимальный размер файла - ${MAX_FILE_SIZE_MB} МБ`);
        } else {
          setFile(selectedFile);
        }
      };
    
      const handleSaveClick = () => {
        if (file) {
          //uploadImage(file);
          setImage(file)
          setUpload(true)
          setFile(null);
          navigate('/edit')
        }
      };
    
      const handleCancelClick = () => {
        setFile(null);
      };
    
      useEffect(() => {
        document.addEventListener('paste', handlePaste);
        return () => {
          document.removeEventListener('paste', handlePaste);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return (
        <Flex 
        flexDir={'column'}
        align={'center'} 
        justifyContent={'center'} 
        w={{ sm: '1036px', base: '1036px', md: '1254px', lg: '2072px' }}
        h={{ sm: '527px', base: '527px', md: '690px', lg: '1054px' }} 
        gap={'25px'}>
            <Flex
            bgColor={'gray.100'}
            boxShadow={'0px 0px 4px 0px rgba(191, 193, 197, 1)'}
            borderRadius={'20px'}
            w={{ sm: '1036px', base: '1036px', md: '1254px', lg: '2072px' }}
            h={{ sm: '462px', base: '462px', md: '593px', lg: '924px' }}
            flexDirection={'column'}
            alignItems={'center'}
            justify={'center'}
            gap={'16px'}
            position="relative"
            >
                {file ? (
                <Text
                    color={'gray.500'}
                    align={'center'}
                    fontSize={'20px'}
                    fontWeight={500}
                >
                    {file.name}
                </Text>
                ) : (
                <Flex flexDir={'column'} gap={'17px'} alignItems={'center'}>
                    <CloudUpload color={gray500} width={'7%'} height={'auto'}/>
                    <Text
                    color={'gray.500'}
                    fontSize={{ sm: '20px', base: '20px', md: '30px', lg: '50px' }}
                    fontWeight={400}
                    align={'center'}
                    >
                    Нажмите для загрузки или перенесите файл в это окно
                    </Text>
                    <Text fontSize={{ sm: '20px', base: '20px', md: '30px', lg: '50px' }} fontWeight={500} color={'gray.500'}>
                    .jpg, .jpeg
                    </Text>
                    <Text fontSize={{ sm: '18px', base: '18px', md: '28px', lg: '48px' }} fontWeight={400} color={'gray.500'}>
                        Размер файла: до 50 MB
                    </Text>
                </Flex>
                )}
                <input
                name="img"
                type="file"
                accept=".jpg, .png"
                onChange={handleFileChange}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    opacity: 0,
                    cursor: 'pointer',
                }}
                />
                </Flex>
                <Flex gap={{ sm: '36px', base: '36px', md: '54px', lg: '72px' }} justifyContent={'space-between'} align={'center'} w={'100%'}>
                <Button
                fontSize={{ sm: '14px', base: '14px', md: '21px', lg: '28px' }}
                h={{ sm: '40px', base: '40px', md: '62px', lg: '82px' }}
                variant={'cancel'}
                onClick={handleCancelClick}
                >
                Отмена
                </Button>
                <Button
                    h={{ sm: '40px', base: '40px', md: '62px', lg: '82px' }}
                    fontSize={{ sm: '14px', base: '14px', md: '21px', lg: '28px' }}
                    onClick={handleSaveClick}
                >
                Продолжить
                </Button>
            </Flex>
        </Flex>
    )
}