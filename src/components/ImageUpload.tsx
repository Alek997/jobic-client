import React from 'react'
import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Center, Flex, Heading } from '@chakra-ui/layout'
import { FaPen, FaPortrait, FaTrash } from 'react-icons/fa'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { uploadImage } from 'services/imageService'

const ImageUpload: React.FC<{ onUpload?(imageUrl: string) }> = ({
  onUpload
}) => {
  const [images, setImages] = React.useState([])

  const onChange = async (imageList: ImageListType) => {
    // data for submit

    const imageRes = await uploadImage(imageList[0].file)
    onUpload(imageRes.data)

    setImages(imageList as never[])
  }

  return (
    <ImageUploading value={images} onChange={onChange}>
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        dragProps
      }) => (
        <Flex
          bgColor="gray.100"
          p="5"
          borderRadius="lg"
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Heading size="sm" mb="2">
            Upload image
          </Heading>
          {imageList.length <= 0 && (
            <Button m="5" onClick={onImageUpload} {...dragProps}>
              <Icon as={FaPortrait} />
            </Button>
          )}

          {imageList.map((image, index) => (
            <Center key={index} flexDirection="column">
              <Image
                src={image.dataURL}
                alt="previewImage"
                w="40"
                borderRadius="md"
              />

              <Flex>
                <Button m="2" onClick={() => onImageUpdate(index)}>
                  <Icon as={FaPen} />
                </Button>
                <Button m="2" onClick={() => onImageRemove(index)}>
                  <Icon as={FaTrash} />
                </Button>
              </Flex>
            </Center>
          ))}
        </Flex>
      )}
    </ImageUploading>
  )
}

export default ImageUpload
