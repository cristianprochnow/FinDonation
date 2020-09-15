import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { RiImageAddLine, RiImageLine } from 'react-icons/ri'

import {
  Dropzone as DropzoneComponent,
  DropzoneInput,
  DropzoneLabel,
  DropzoneImage
} from './styles'

interface DropzoneProps {
  onFileUpload: (file: File) => void
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileUpload
}) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = createFileURL(file)

    setSelectedFileUrl(fileUrl)
    onFileUpload(file)
  }, [onFileUpload])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: [
      'image/jpg',
      'image/jpeg',
      'image/png'
    ]
  })

  function createFileURL(file: File) {
    const fileUrl = URL.createObjectURL(file)

    return fileUrl
  }

  return (
    <DropzoneComponent {...getRootProps()}>
      <DropzoneInput multiple={false}  {...getInputProps()} />
      {
        selectedFileUrl
          ? <DropzoneImage src={selectedFileUrl} alt="Profile photo" />
          : isDragActive
              ? (
                <DropzoneLabel>
                  <RiImageLine size={40} />
                  Pronto, agora basta soltar a imagem.
                </DropzoneLabel>
              ) : (
                <DropzoneLabel>
                  <RiImageAddLine size={40} />
                  Arraste uma imagem até aqui ou clique para selecionar uma.
                </DropzoneLabel>
              )
      }
    </DropzoneComponent>
  )
}

export default Dropzone
