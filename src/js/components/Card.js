import React from 'react';
import PropTypes from 'prop-types';

function Card({ image }) {
    return (
        <div className="card">
            <img className="card__image" src={image} alt="hey" />
        </div>
    );
}

Card.propTypes = {
    image: PropTypes.string.isRequired,
};

export default React.memo(Card);
