import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Card from './Card'
import Dots from './Dots'
import images from '../../data'

export class Carousel extends PureComponent {
    constructor(props) {
        super(props)

        // initial state
        this.state = {
            currentCard: 1,
            widthCard: null,
            timerId: null,
            start: null,
            change: 0
        }

        // refereces
        this.setCardContainer = element => {
            this.cardContainer = element
        }

        this.setViewPort = element => {
            this.viewPort = element
        }
    }

    static propTypes = {
        images: PropTypes.arrayOf(PropTypes.string.isRequired)
    }

    componentDidMount() {
        // creating fake cards
        const firstCardClone = this.cardContainer.children[0].cloneNode(true)
        const lastCardClone = this.cardContainer.children[
            this.cardContainer.children.length - 1
        ].cloneNode(true)

        // create empty img for drag and drop effect
        // const img = new Image()
        // img.src =
        //     'data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs='
        const img = document.createElement('img')
        img.src = '../../assets/img/logo1.png'

        // initial change state
        this.setState(
            {
                ...this.state,
                widthCard: this.cardContainer.children[0].offsetWidth
            },
            () => {
                this.cardContainer.insertBefore(
                    lastCardClone,
                    this.cardContainer.children[0]
                )
                this.cardContainer.append(firstCardClone)

                this.moveCard(0.0, this.state.widthCard)
            }
        )

        // add event listeners for Drag and Drop effects (desctop mouse)
        this.viewPort.addEventListener('dragstart', e => {
            e.dataTransfer.setDragImage(img, -10, -10)

            this.setState({
                ...this.state,
                start: e.clientX
            })
        })
        this.viewPort.addEventListener('dragover', e => {
            e.preventDefault()

            let touch = e.clientX
            this.setState({
                ...this.state,
                change: this.state.start - touch
            })
        })
        this.viewPort.addEventListener('dragend', () => {
            this.slideShow(this.state.change)
        })

        // add event listeners for Touch effects (mobile)
        this.viewPort.addEventListener('touchstart', e => {
            this.setState({
                ...this.state,
                start: e.touches[0].clientX
            })
        })
        this.viewPort.addEventListener('touchmove', e => {
            e.preventDefault()
            let touch = e.touches[0]
            this.setState({
                ...this.state,
                change: this.state.start - touch.clientX
            })
        })
        this.viewPort.addEventListener('touchend', () => {
            this.slideShow(this.state.change)
        })

        // add event listener for resize
        window.addEventListener('resize', this.resizeWidth)
    }

    componentWillUnmount() {
        // remove listeners
        this.viewPort.removeEventListener('dragstart', e => {
            this.setState({
                ...this.state,
                start: e.clientX
            })
        })
        this.viewPort.removeEventListener('dragover', e => {
            e.preventDefault()
            let touch = e.clientX
            this.setState({
                ...this.state,
                change: this.state.start - touch
            })
        })
        this.viewPort.removeEventListener('dragend', () => {
            this.slideShow(this.state.change)
        })

        this.viewPort.removeEventListener('touchstart', e => {
            this.setState({
                ...this.state,
                start: e.touches[0].clientX
            })
        })
        this.viewPort.removeEventListener('touchmove', e => {
            e.preventDefault()
            let touch = e.touches[0]
            this.setState({
                ...this.state,
                change: this.state.start - touch.clientX
            })
        })
        this.viewPort.removeEventListener('touchend', () => {
            this.slideShow(this.state.change)
        })

        window.removeEventListener('resize', this.resizeWidth)
    }

    // method for adaptive change slider
    resizeWidth = () => {
        this.setState(
            {
                ...this.state,
                widthCard: this.cardContainer.children[0].offsetWidth
            },
            () => {
                this.moveCard(
                    0.0,
                    this.state.widthCard * this.state.currentCard
                )
            }
        )
    }

    // method for move slides with swipe and drag and drop effects
    slideShow = change => {
        if (change > 0 && change > this.state.widthCard / 2) {
            this.handleNext()
            // this.setState(
            //     {
            //         ...this.state,
            //         change: 0
            //     },

            // )
        } else if (change > 0 && change <= this.state.widthCard / 2) {
            this.setState(
                {
                    ...this.state,
                    change: 0
                },
                () => this.moveCard(0.5, null)
            )
        } else if (change < 0 && change < -this.state.widthCard / 2) {
            this.handlePrevios()
            // this.setState(
            //     {
            //         ...this.state,
            //         change: 0
            //     },

            // )
        } else if (change < 0 && change >= -this.state.widthCard / 2) {
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
        if (this.state.currentCard < this.cardContainer.children.length - 1) {
            let newCurrentCard = this.state.currentCard + 1

            this.setState(
                {
                    ...this.state,
                    currentCard: newCurrentCard,
                    change: 0
                },
                () => {
                    this.moveCard(
                        0.5,
                        this.state.widthCard * this.state.currentCard
                    )

                    if (
                        this.state.currentCard ===
                        this.cardContainer.children.length - 1
                    ) {
                        setTimeout(() => {
                            this.setState(
                                {
                                    ...this.state,
                                    currentCard: 1,
                                    change: 0
                                },
                                () => this.moveCard(0.0, this.state.widthCard)
                            )
                        }, 502)
                    }
                }
            )
        }
    }

    // move to the previos slide
    handlePrevios = () => {
        if (this.state.currentCard > 0) {
            let newCurrentCard = this.state.currentCard - 1

            this.setState(
                {
                    ...this.state,
                    currentCard: newCurrentCard,
                    change: 0
                },
                () => {
                    this.moveCard(
                        0.5,
                        this.state.widthCard * this.state.currentCard
                    )

                    if (this.state.currentCard === 0) {
                        setTimeout(() => {
                            this.setState(
                                {
                                    ...this.state,
                                    currentCard:
                                        this.cardContainer.children.length - 2,
                                    change: 0
                                },
                                () =>
                                    this.moveCard(
                                        0.0,
                                        this.state.widthCard *
                                            (this.cardContainer.children
                                                .length -
                                                2)
                                    )
                            )
                        }, 502)
                    }
                }
            )
        }
    }

    // method for run and stop autorun
    handleAutorun = () => {
        if (!this.state.timerId) {
            this.setState({
                ...this.state,
                timerId: setInterval(this.handleNext, 2000)
            })
        } else {
            clearInterval(this.state.timerId)

            this.setState({
                ...this.state,
                timerId: null
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
                this.moveCard(
                    0.5,
                    this.state.widthCard * this.state.currentCard
                )
            }
        )
    }

    // method for change transform / transition css props
    moveCard = (transitionDuration, transform) => {
        this.cardContainer.style.transitionDuration = `${transitionDuration}s`
        if (!!transform) {
            this.cardContainer.style.transform = `translate(-${transform}px)`
        }
    }

    render() {
        return (
            <div className="carousel">
                <div className="carousel__controls">
                    <button
                        onClick={this.handlePrevios}
                        className="btn btn-info"
                    >
                        Previous
                    </button>
                    <button onClick={this.handleNext} className="btn btn-info">
                        Next
                    </button>
                    <button
                        onClick={this.handleAutorun}
                        className="btn btn-info"
                    >
                        {!this.state.timerId ? 'Autorun' : 'Stop'}
                    </button>
                </div>
                <div className="carousel__view-port" ref={this.setViewPort}>
                    <div
                        ref={this.setCardContainer}
                        className="carousel__card-container"
                        style={{
                            left: -this.state.change + 'px'
                        }}
                    >
                        {images.map(image => (
                            <Card image={image} key={image} />
                        ))}
                    </div>
                </div>
                <Dots
                    slides={images}
                    activeIndex={this.state.currentCard - 1}
                    handlerCheckSlide={this.checkSlide}
                />
            </div>
        )
    }
}

export default Carousel
