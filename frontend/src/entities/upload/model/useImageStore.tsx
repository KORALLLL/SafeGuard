import { create } from 'zustand'
import { ImageState } from '../types'

export const useImageStore = create<ImageState>()((set) => ({
  isUpload: true,
  imageId: '',
  image: null,
  setUpload: (isUpload) => set(() => ({ isUpload })),
  setImage: (image) => set(() => ({ image })),
  setImageId: (imageId) => set(() => ({ imageId })),
}))