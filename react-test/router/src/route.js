import React from 'react';
import { Consumer } from './context';
import { pathToRegexp } from "path-to-regexp"

function Route(props) {
    return (
        <Consumer>
            {
                state => {
                    // console.log(state)
                    let { path, component: Component } = props
                    let pathname = state.location.pathname
                    let reg = pathToRegexp(path,[],{end:false})
                    //判断当前path是否包含在pathname
                    if(pathname.match(reg)) {
                        return <Component/>
                    }
                    return null
                }
            }
        </Consumer>
    )
}

export default Route