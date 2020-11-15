import React from 'react'

function EmptyCarousel({ widthCard, heightCard }) {
  return (
    <div
      className="card"
      style={{
        width: `${widthCard}px`,
        height: `${heightCard}px`
      }}
    >
      No content
    </div>
  )
}

export default React.memo(EmptyCarousel)
