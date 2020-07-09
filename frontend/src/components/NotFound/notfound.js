import React from 'react';
import ReactBodyMovin from 'react-bodymovin';
import NotFoundAnimation from '../../Notfound.json';

export default function NotFound() {
    
    const bodyMovinOptions = {
        loop: true,
        autoplay: true,
        prerender: true,
        animationData: NotFoundAnimation
    }

    return (
        <div>
           <ReactBodyMovin options={bodyMovinOptions}/>
        </div>
    );
}