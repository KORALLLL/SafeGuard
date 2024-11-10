export interface UploadTypeRequest {
    isUpload: boolean
    image: File | null
    imageId: string
  }
  
  export interface UploadAction {
    setUpload: (isUpload: boolean) => void
    setImage: (image: File | null) => void
    setImageId: (imageId: string) => void
  }  