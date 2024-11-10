import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
//import localImage from './m.jpg';

import Konva from 'konva';
import { Button, Flex } from 'shared/ui';
import { Pencil, Squere } from 'shared/iconpack';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from 'entities/upload/model/useImageStore';
import { useImageUpload } from 'widgets/ImageUpload/lib';

export const LassoSelector: React.FC = () => {
    const image = useImageStore((state) => state.image)
    const setUpload = useImageStore((state) => state.setUpload)
    const setImage = useImageStore((state) => state.setImage)
    console.log(image)
    const navigate = useNavigate()
    const { uploadImage } = useImageUpload()
    //const [originalImage] = useImage(image instanceof File ? URL.createObjectURL(image) : '');
    const [originalImageURL, setOriginalImageURL] = useState<string | null>(null);
  const [processedImageURL, setProcessedImageURL] = useState<string>('');
  const [processedImage] = useImage(processedImageURL); 
  const [points, setPoints] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectionMode, setSelectionMode] = useState<'freeform' | 'rectangle'>('freeform');
  const [rectStart, setRectStart] = useState<{ x: number; y: number } | null>(null);
  const [rect, setRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const stageRef = useRef<Konva.Stage | null>(null);
  const imageRef = useRef<Konva.Image>(null);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image);
      setOriginalImageURL(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [image]);

  useEffect(() => {
    if (originalImageURL) {
      localStorage.setItem('originalImage', originalImageURL);
    }
  }, [originalImageURL]);

  useEffect(() => {
    const storedImage = localStorage.getItem('originalImage');
    if (storedImage) {
      setOriginalImageURL(storedImage);
    }
  }, []);

  const handleRemoveImage = () => {
    setOriginalImageURL(null);
    localStorage.removeItem('originalImage');
  };
  
  

  const [originalImage] = useImage(originalImageURL || '');

  const handleMouseDown = () => {
    setIsDrawing(true);
    setPoints([]);
    setRect(null);

    if (selectionMode === 'rectangle') {
      const point = stageRef.current?.getPointerPosition();
      if (point) {
        setRectStart(point);
      }
    }
  };

  const handleMouseMove = () => {
    if (!isDrawing || !stageRef.current) return;

    const point = stageRef.current.getPointerPosition();
        if (point) {
        if (selectionMode === 'freeform') {
            setPoints((prevPoints) => [...prevPoints, point.x, point.y]);
        } else if (selectionMode === 'rectangle' && rectStart) {
            const width = point.x - rectStart.x;
            const height = point.y - rectStart.y;
            setRect({
            x: Math.min(point.x, rectStart.x),
            y: Math.min(point.y, rectStart.y),
            width: Math.abs(width),
            height: Math.abs(height),
            });
        }
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);

        if (selectionMode === 'freeform') {
        setPoints((prevPoints) => [...prevPoints, prevPoints[0], prevPoints[1]]);
        }
        handleProcessImage();
    };

    const handleProcessImage = () => {
        if (!stageRef.current || !originalImage || !imageRef.current) return;
    
        const canvas = document.createElement('canvas');
        const { width: canvasWidth, height: canvasHeight } = calculateImageSize();
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
    
        const context = canvas.getContext('2d');
        if (!context) return;
    
        context.drawImage(originalImage, 0, 0, canvasWidth, canvasHeight);
    
        context.fillStyle = 'rgba(95, 94, 207, 0.8)';
    
        context.beginPath();
        context.rect(0, 0, canvasWidth, canvasHeight);
    
        if (selectionMode === 'freeform' && points.length >= 4) {
            context.moveTo(points[0], points[1]);
            for (let i = 2; i < points.length; i += 2) {
                context.lineTo(points[i], points[i + 1]);
            }
            context.closePath();
        } else if (selectionMode === 'rectangle' && rect) {
            context.rect(rect.x, rect.y, rect.width, rect.height);
        }
    
        context.fill('evenodd');
    
        const processedImageURL = canvas.toDataURL();
        setProcessedImageURL(processedImageURL); 
    };    

    const handleClearSelection = () => {
        setPoints([]);
        setRect(null);
        setProcessedImageURL(''); 
    };

    const dataURLtoFile = (dataURL: string, filename: string): File => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSend = () => {
    if (processedImageURL) {
        // Если было сделано выделение, отправляем обработанное изображение
        const file = dataURLtoFile(processedImageURL, 'processed-image.jpg');
        uploadImage(file);
    } else if (originalImageURL) {
        console.log(9090)
        // Если выделения нет, отправляем оригинальное изображение
        const file = dataURLtoFile(originalImageURL, 'original-image.jpg');
        uploadImage(file);
    } else {
        console.error("No image available to send.");
    }
    };

  const containerWidth = 500;
    const containerHeight = 400;

  const calculateImageSize = () => {
    if (originalImage) {
        const imgAspect = originalImage.width / originalImage.height;
        const containerAspect = containerWidth / containerHeight;

        if (imgAspect > containerAspect) {
            return { width: containerWidth, height: containerWidth / imgAspect };
        } else {
            return { width: containerHeight * imgAspect, height: containerHeight };
        }
    }
    return { width: containerWidth, height: containerHeight };
};

    const { width: imageWidth, height: imageHeight } = calculateImageSize();

  return (
    <Flex 
        flexDir={'column'}
        align={'center'} 
        justifyContent={'center'} 
        w={{ sm: '1036px', base: '1036px', md: '1254px', lg: '1254px' }}
        h={{ sm: '527px', base: '527px', md: '690px', lg: '690px' }} 
        gap={'25px'}>

        <Flex
            bgColor={'gray.100'}
            boxShadow={'0px 0px 4px 0px rgba(191, 193, 197, 1)'}
            borderRadius={'20px'}
            w={{ sm: '1036px', base: '1036px', md: '1254px', lg: '1254px' }}
            h={{ sm: '462px', base: '462px', md: '593px', lg: '924px' }}
            gap={'16px'}
            p={'28px 70px'}
        >
            <Stage
                width={600}
                height={400}
                ref={stageRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            >
                <Layer>
                    {!processedImageURL && originalImage && (
                        <KonvaImage 
                        image={originalImage} 
                        width={imageWidth}
                        height={imageHeight} 
                        ref={imageRef} />
                    )}
                    {processedImageURL && processedImage && (
                        <KonvaImage 
                        image={processedImage} 
                        width={imageWidth}
                        height={imageHeight} />
                    )}
                    {selectionMode === 'freeform' ? (
                        <Line
                            points={points}
                            stroke="#5F5ECF"
                            strokeWidth={2}
                            lineCap="round"
                            lineJoin="round"
                            closed={!isDrawing}
                        />
                    ) : (
                        rect && (
                            <Rect
                                x={rect.x}
                                y={rect.y}
                                width={rect.width}
                                height={rect.height}
                                stroke="#5F5ECF"
                                strokeWidth={2}
                            />
                        )
                    )}
                </Layer>
            </Stage>
            <Flex direction="column" gap="21px" w={'100%'} align={'center'} pt={'6px'}>
                <Button
                    leftIcon={<Pencil/>}
                    w={'290px'}
                    bgColor={selectionMode === 'rectangle' ? 'gray.200' : 'violet.200'}
                    onClick={() => setSelectionMode('freeform')}
                    variant={'edit'}
                >
                    Выделить произвольную область
                </Button>
                <Button
                    leftIcon={<Squere/>}
                    w={'290px'}
                    bgColor={selectionMode === 'freeform' ? 'gray.200' : 'violet.200'}
                    onClick={() => setSelectionMode('rectangle')}
                    variant={'edit'}
                >
                    Выделить прямоугольную область
                </Button>
                <Button
                    w={'290px'}
                    onClick={handleClearSelection}
                    variant={'edit'}
                >
                    Убрать выделение
                </Button>
            </Flex>
        </Flex>
        <Flex gap={{ sm: '36px', base: '36px', md: '54px', lg: '72px' }} justifyContent={'space-between'} align={'center'} w={'100%'}>
            <Button
                fontSize={{ sm: '14px', base: '14px', md: '21px', lg: '28px' }}
                h={{ sm: '40px', base: '40px', md: '62px', lg: '82px' }}
                variant={'cancel'}
                onClick={() => {
                    handleRemoveImage()
                    setUpload(false)
                    setImage(null)
                    navigate('/')
                }}
            >
                Удалить и вернуться на главную
            </Button>
            <Button
                h={{ sm: '40px', base: '40px', md: '62px', lg: '82px' }}
                fontSize={{ sm: '14px', base: '14px', md: '21px', lg: '28px' }}
                onClick={handleSend}
            >
                Продолжить
            </Button>
        </Flex>
    </Flex>
  );
};
