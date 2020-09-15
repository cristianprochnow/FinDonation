import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { RiImageAddLine, RiImageLine } from 'react-icons/ri'

import {
  Dropzone as DropzoneComponent,
  DropzoneInput,
  DropzoneLabel
} from './styles'

const Dropzone: React.FC = () => {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    console.info(file)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept: [
      'image/jpg',
      'image/jpeg',
      'image/png'
    ]
  })

  return (
    <DropzoneComponent {...getRootProps()}>
      <DropzoneInput multiple={false}  {...getInputProps()} />
      {
        isDragActive
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
