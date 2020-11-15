import React from 'react'
import Carousel from './js/components/Carousel.js'

const mockImagesData = [
  'http://picsum.photos/400/200',
  'http://picsum.photos/350/200',
  'http://picsum.photos/500/200'
]

const sliderDimensions = {
  width: 450,
  height: 300
}

function App() {
  const { width, height } = sliderDimensions

  return (
    <div className="app">
      <Carousel width={width} height={height}>
        <b>The Title of Collection</b>
        {mockImagesData.map((img, i) => (
          <img src={img} key={`${img}_${i}`} />
        ))}
        <i>Description</i>
        <p>
          Let's consider all three options for making italics in HTML, discuss
          the subtleties of this issue and what methods are more convenient and
          correct to use in certain situations. Let's consider all three options
          for making italics in HTML, discuss the subtleties of this issue and
          what methods are more convenient and correct to use in certain
          situations. Let's consider all three options for making italics in
          HTML, discuss the subtleties of this issue and what methods are more
          convenient and correct to use in certain situations. Let's consider
          all three options for making italics in HTML, discuss the subtleties
          of this issue and what methods are more convenient and correct to use
          in certain situations. Let's consider all three options for making
          italics in HTML, discuss the subtleties of this issue and what methods
          are more convenient and correct to use in certain situations.
        </p>
      </Carousel>
    </div>
  )
}

export default App
