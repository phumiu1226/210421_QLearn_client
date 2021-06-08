import React from 'react'
import {Spin} from 'antd'

export default function index() {
    return (
        <div style={{position:'fixed',top:'50%',left:'50%'}}>
                <Spin tip='Loading...' />           
        </div>
    )
}
