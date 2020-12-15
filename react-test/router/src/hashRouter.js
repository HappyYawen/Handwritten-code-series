import React from 'react'
import { Provider } from './context';

class HashRouter extends React.Component {
    constructor() {
        super()
        this.state = {
            location: {
                pathname: window.location.hash.slice(1) || '/'
            }
        }
    }
    watchHashChange = () => {
        this.setState({
            location:{
                ...this.state.location,
                pathname: window.location.hash.slice(1) || '/'
            }
        },() => console.log(this.state.location))
    }
    componentDidMount() {
        window.location.hash = window.location.hash || '/'
        window.addEventListener('hashchange', this.watchHashChange)
    }
    componentWillUnmount() {
        window.removeEventListener('hashchange', this.watchHashChange)
    }
    render() {
        let value = {
            location: this.state.location
        }
        return (
            <Provider value={value}>
                {
                    this.props.children
                }
            </Provider>
        )
    }
}

export default HashRouter