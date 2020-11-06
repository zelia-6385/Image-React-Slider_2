import React from 'react'
import Carousel from './js/components/Carousel.js'

function App({ data }) {
    return (
        <div className="app">
            <Carousel data={data} />
        </div>
    )
}

export default App
