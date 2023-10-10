import React from 'react'
import { Typography, Button } from 'antd'
import { Link } from 'react-router-dom';

export function NonExist() {
    const {Title} = Typography;
  return (
    <div style={{textAlign: "center"}}>
        <Title className="InputTitle" style={Object.assign({color: "white"}, {margin: 0}, {padding: 0})}>FAILED TO REDIRECT</Title>
        <Title className="InputTitle" level={4} style={Object.assign({color: "white"}, {margin: '15px'}, {padding: 0})}>Your URL have been expired or deleted</Title>
        <Link to="/"><Button style={{margin: '10px 0 0 0'}} type="primary">CREATE A NEW ONE</Button></Link>
    </div>
  )
}
