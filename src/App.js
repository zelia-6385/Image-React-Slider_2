import React from 'react'
import Card from './js/components/Card.js'
import Carousel from './js/components/Carousel.js'

// If it is necessary to use different card with diffrent content we must make every card separately... and put there diffrent props
function App({ data }) {
    let cardsId = []
    data.forEach(el => cardsId.push(el.id))

    return (
        <div className="app">
            <Carousel cardsId={cardsId}>
                {data.map(dataElem => (
                    <Card
                        picture={dataElem.picture}
                        country={dataElem.country}
                        author={dataElem.author}
                        star={dataElem.star}
                        key={dataElem.id}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default App
