import React from 'react';
import ImageUploading from 'react-images-uploading';
import Alert from 'react-bootstrap/Alert';

const ImageUpload = ({image , handleImage}) => {
  return (
    <>
        <ImageUploading
                multiple
                value={image}
                onChange={handleImage}
                maxNumber={3}
                dataURLKey='data_url'
                acceptType={["jpg" , "png"]}
                maxFileSize={5000000}
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageRemove,
                onImageUpdate,
                errors
            }) => (
                    <>
                            <button 
                                type='button'
                                className='btn btn-secondary'
                                onClick={onImageUpload}
                            >Upload Image</button>
                            {
                                errors && errors.maxFileSize ? 
                                        <div className='mt-1'>
                                                <Alert variant='danger'>The file size cannot exceed 4Mb , please upload again</Alert>
                                        </div>
                                : null
                            }
                            {
                                errors && errors.acceptType ? 
                                        <div className='mt-1'>
                                                <Alert variant='danger'>Only JPG and PNG format is accepted , please upload again</Alert>
                                        </div>
                                : null
                            }
                            {
                                errors && errors.maxNumber ? 
                                        <div>
                                                {imageList && imageList.length >= 3 ? 
                                                        <div className='mt-1'>
                                                                <Alert variant='danger'>Only 3 images are accepted</Alert>
                                                        </div>
                                                :null}
                                                {imageList.length !== 0 && imageList.length < 4 ? 
                                                        <button type='button' className='btn btn-danger' onClick={onImageRemoveAll}>Remove all</button>
                                                : null}
                                        </div>
                                : 
                                    <>
                                        <div className='d-flex gap-3 flex-wrap mt-2'>
                                            {imageList.map((image , index) => (
                                                    <div key={index}>
                                                            <img src={image['data_url']} alt='no img loaded' className='uploadCon'/>
                                                            <div className='d-flex justify-content-center align-items-center gap-2 mt-2'>
                                                                    <button type='button' onClick={() => onImageUpdate()} className='btn btn-warning'>
                                                                            Change
                                                                    </button>
                                                                    <button type='button' onClick={() => onImageRemove()} className='btn btn-danger'>
                                                                            Delete
                                                                    </button>
                                                            </div>
                                                    </div>
                                            ))}
                                        </div>
                                    </>
                            }
                    </>
            )}
        </ImageUploading>
    </>
  )
}

export default ImageUpload