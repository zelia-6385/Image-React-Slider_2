import React from 'react'
import Card from './js/components/Card.js'
import Carousel from './js/components/Carousel.js'

function App({ data }) {
    return (
        <div className="app">
            <Carousel>
                {data.map(dataElem => (
                    <Card
                        picture={dataElem.picture}
                        country={dataElem.country}
                        author={dataElem.author}
                        star={dataElem.star}
                        key={dataElem.id}
                    />
                ))}
                <b>Title</b>
                <i>End</i>
            </Carousel>
        </div>
    )
}

export default App
