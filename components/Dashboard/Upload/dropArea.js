import { Image, Stack } from '@mantine/core';
import React, { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Photo, X } from 'tabler-icons-react';


function ImageUploadIcon({
    status,
    ...props
}) {
    if (status.accepted) {
        return <Upload {...props} />;
    }

    if (status.rejected) {
        return <X {...props} />;
    }

    return <Photo {...props} />;
}


export const DropArea = ({ file, onDropFile  }) => {

    // const [file, setFile] = useState()
    const [preview, setPreview] = useState();


    // const onDrop = useCallback(acceptedFiles => {
    //     // Do something with the files
    //     //setFile(acceptedFiles[0])
    //     onDropFile(acceptedFiles)
    //     //console.log(acceptedFiles[0])
    // }, [])




    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop : onDropFile,
        maxFiles: 1,
        accept: {
            'image/*': ['.png','.jpeg','.jpg']
          }
    })

    useEffect(() => {
   
        if (!file) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(file)

        setPreview(objectUrl)
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div
                className="border-4 rounded-md border-dashed border-gray-400 hover:border-blue-500 cursor-pointer p-1"
            >
                <Stack>
                    {isDragActive && <>
                        <Photo size={30} />
                        <p className='text-xs text-gray-400'>Drag 'n' drop some files here, or click to select files</p>

                    </>}
                    {!file && <Image hidden={isDragActive} withPlaceholder width={150} height={150} />}
                    <Image hidden={file ? false : true} src={preview} height={150} fit="cover" />

                </Stack>

            </div>
        </div>
    )
}