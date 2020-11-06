// import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import images from './data'
import './assets/scss/app.scss'

ReactDOM.render(
    <React.StrictMode>
        <App images={images} />
    </React.StrictMode>,
    document.getElementById('root')
)
