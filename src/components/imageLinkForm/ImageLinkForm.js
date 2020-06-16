import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p className='f3'>
                {"This Magic Brain will detect your face from the image. Try it mate"}
            </p>
            <div className='center'>
                <div className='form center pa4 ba3 shadow-2  '>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white btn-color shadow-2' 
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm
