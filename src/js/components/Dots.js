import React from 'react'
import PropTypes from 'prop-types'

const Dots = ({ slides, activeIndex, handlerCheckSlide }) => (
    <div className="carousel__dots">
        {slides.map((slide, i) => (
            <Dot
                key={slide.id}
                activeIndex={activeIndex}
                index={i}
                handlerCheckSlide={handlerCheckSlide}
            />
        ))}
    </div>
)

const Dot = React.memo(function Dot({ activeIndex, index, handlerCheckSlide }) {
    return (
        <>
            <span
                onClick={() => handlerCheckSlide(index)}
                className={
                    activeIndex === index
                        ? 'carousel__dot active'
                        : 'carousel__dot'
                }
            ></span>
        </>
    )
})

Dots.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.object.isRequired),
    activeIndex: PropTypes.number.isRequired,
    handlerCheckSlide: PropTypes.func.isRequired
}

Dot.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    handlerCheckSlide: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
}

export default React.memo(Dots)
