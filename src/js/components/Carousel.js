import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Dots from './Dots'

export class Carousel extends PureComponent {
    constructor(props) {
        super(props)

        // initial state
        this.state = {
            currentCard: 1,
            widthCard: null,
            timerIdAuto: null,
            timerId: null,
            start: 0,
            change: 0,
            touch: 0,
            img: document.createElement('img')
        }

        // refereces
        this.setCardContainer = element => {
            this.cardContainer = element
        }

        this.setViewPort = element => {
            this.viewPort = element
        }

        this.handleTouchMove.passive = false
    }

    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.string.isRequired)
    }

    componentDidMount() {
        const { img } = this.state // state

        // creating fake cards
        const firstCardClone = this.cardContainer.children[0].cloneNode(true)
        const lastCardClone = this.cardContainer.children[
            this.cardContainer.children.length - 1
        ].cloneNode(true)

        // const img = document.createElement('img')
        img.src = '../../assets/img/logo1.png'

        // initial change state
        this.setState(
            {
                ...this.state,
                widthCard: this.cardContainer.children[0].offsetWidth
            },
            () => {
                const { widthCard } = this.state // state

                this.cardContainer.insertBefore(
                    lastCardClone,
                    this.cardContainer.children[0]
                )
                this.cardContainer.append(firstCardClone)
                this.moveCard(0.0, widthCard)
            }
        )

        // add event listener for resize
        window.addEventListener('resize', this.resizeWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeWidth)
    }

    // event handlers
    handleDragStart = e => {
        const { img } = this.state // state

        e.dataTransfer.setDragImage(img, -10, -10)
        this.setState({
            ...this.state,
            timerId: setInterval(() => {
                const { start, touch } = this.state // state

                this.setState({
                    ...this.state,
                    change: start - touch
                })
            }, 40),
            start: e.clientX
        })
    }

    handleDragOver = e => {
        e.preventDefault()

        this.setState({
            ...this.state,
            touch: e.clientX
        })
    }

    handleDragEnd = () => {
        const { timerId } = this.state // state

        clearInterval(timerId)
        this.setState(
            {
                ...this.state,
                timerId: null,
                touch: 0,
                start: 0
            },
            () => {
                const { change } = this.state // state

                this.slideShow(change)
            }
        )
    }

    handleTouchStart = e => {
        this.setState({
            ...this.state,
            timerId: setInterval(() => {
                const { start, touch } = this.state // state

                let moveFinger = touch ? touch : start
                this.setState({
                    ...this.state,
                    change: start - moveFinger
                })
            }, 60),
            start: e.touches[0].clientX
        })
    }

    handleTouchMove = e => {
        const touchStart = new Event('touchend')
        const { widthCard } = this.state // state

        // e.preventDefault()
        e.stopPropagation()

        if (
            e.targetTouches[0].clientX + 300 <= 0 ||
            e.targetTouches[0].clientX > widthCard + 300
        ) {
            this.viewPort.dispatchEvent(touchStart)
        }

        this.setState({
            ...this.state,
            touch: e.touches[0].clientX
        })
    }

    handleTouchEnd = () => {
        const { timerId } = this.state // state

        clearInterval(timerId)
        this.setState(
            {
                ...this.state,
                timerId: null,
                touch: 0,
                start: 0
            },
            () => {
                const { change } = this.state // state
                this.slideShow(change)
            }
        )
    }

    // method for adaptive change slider
    resizeWidth = () => {
        this.setState(
            {
                ...this.state,
                widthCard: this.cardContainer.children[0].offsetWidth
            },
            () => {
                const { widthCard, currentCard } = this.state // state
                this.moveCard(0.0, widthCard * currentCard)
            }
        )
    }

    // method for move slides with swipe and drag and drop effects
    slideShow = change => {
        const { widthCard } = this.state // state

        if (change > 0 && change > widthCard / 2) {
            this.handleNext()
        } else if (change > 0 && change <= widthCard / 2) {
            this.setState(
                {
                    ...this.state,
                    change: 0
                },
                () => this.moveCard(0.5, null)
            )
        } else if (change < 0 && change < -widthCard / 2) {
            this.handlePrevios()
        } else if (change < 0 && change >= -widthCard / 2) {
            this.setState(
                {
                    ...this.state,
                    change: 0
                },
                () => this.moveCard(0.5, null)
            )
        }
    }

    // move to the next slide
    handleNext = () => {
        const { currentCard } = this.state // state

        if (currentCard < this.cardContainer.children.length - 1) {
            let newCurrentCard = currentCard + 1

            this.setState(
                {
                    ...this.state,
                    currentCard: newCurrentCard,
                    change: 0
                },
                this.handleNextMoveCard
            )
        }
    }

    handleNextMoveCard = () => {
        const { widthCard, currentCard } = this.state // state

        this.moveCard(0.5, widthCard * currentCard)

        if (currentCard === this.cardContainer.children.length - 1) {
            setTimeout(
                () =>
                    this.setState(
                        {
                            ...this.state,
                            currentCard: 1,
                            change: 0
                        },
                        () => this.moveCard(0.0, widthCard)
                    ),
                502
            )
        }
    }

    // move to the previos slide
    handlePrevios = () => {
        const { currentCard } = this.state // state

        if (this.state.currentCard > 0) {
            let newCurrentCard = currentCard - 1

            this.setState(
                {
                    ...this.state,
                    currentCard: newCurrentCard,
                    change: 0
                },
                this.handlePreviosMoveCard
            )
        }
    }

    handlePreviosMoveCard = () => {
        const { widthCard, currentCard } = this.state // state

        this.moveCard(0.5, widthCard * currentCard)

        if (currentCard === 0) {
            setTimeout(() => {
                this.setState(
                    {
                        ...this.state,
                        currentCard: this.cardContainer.children.length - 2,
                        change: 0
                    },
                    () =>
                        this.moveCard(
                            0.0,
                            widthCard * (this.cardContainer.children.length - 2)
                        )
                )
            }, 504)
        }
    }

    // method for run and stop autorun
    handleAutorun = () => {
        const { timerIdAuto } = this.state // state

        if (!timerIdAuto) {
            this.setState({
                ...this.state,
                timerIdAuto: setInterval(this.handleNext, 2000)
            })
        } else {
            clearInterval(timerIdAuto)

            this.setState({
                ...this.state,
                timerIdAuto: null
            })
        }
    }

    // method for change slids by dots
    checkSlide = index => {
        this.setState(
            {
                currentCard: index + 1
            },
            () => {
                const { currentCard, widthCard } = this.state // state

                this.moveCard(0.5, widthCard * currentCard)
            }
        )
    }

    // method for change transform / transition css props
    moveCard = (transitionDuration, transform) => {
        this.cardContainer.style.transitionDuration = `${transitionDuration}s`
        this.cardContainer.style.transform = `translate(-${transform}px)`
    }

    render() {
        return (
            <div className="carousel">
                <div className="carousel__controls">
                    <button
                        onClick={this.handlePrevios}
                        className="carousel__button"
                    >
                        Previous
                    </button>
                    <button
                        onClick={this.handleNext}
                        className="carousel__button"
                    >
                        Next
                    </button>
                    <button
                        onClick={this.handleAutorun}
                        className="carousel__button"
                    >
                        {!this.state.timerIdAuto ? 'Autorun' : 'Stop'}
                    </button>
                </div>
                <div className="carousel__title">Unknown masterpieces</div>
                <div
                    onDragStart={this.handleDragStart}
                    onDragOver={this.handleDragOver}
                    onDragEnd={this.handleDragEnd}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    className="carousel__view-port"
                    ref={this.setViewPort}
                >
                    <div
                        draggable="true"
                        ref={this.setCardContainer}
                        className="carousel__card-container"
                        style={{
                            left: -this.state.change + 'px'
                        }}
                    >
                        {this.props.data.map(dataElem => (
                            <Card
                                picture={dataElem.picture}
                                country={dataElem.country}
                                author={dataElem.author}
                                star={dataElem.star}
                                key={dataElem.id}
                            />
                        ))}
                    </div>
                </div>
                <Dots
                    slides={this.props.data}
                    activeIndex={this.state.currentCard - 1}
                    handlerCheckSlide={this.checkSlide}
                />
            </div>
        )
    }
}

export default Carousel
