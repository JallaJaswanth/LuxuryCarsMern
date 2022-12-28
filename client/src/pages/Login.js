import React from 'react'
import { Row, Col, Form, Input, Checkbox } from 'antd';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../redux/actions/UserActions';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Spinner from '../components/Spinner';
// ..
AOS.init();


function Login() {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    function onFinish(values) {
        dispatch(userLogin(values))
        console.log(values)
    }

    return (
        <div className='login d-flex align-items-center'>
            {loading && (<Spinner />)}
            <Row gutter={16}>
                <Col lg={16} style={{ position: 'relative' }}>
                    <img
                        data-aos='slide-right'
                        data-aos-duration='1500'
                        className='imgLogin' src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1856&q=80' />
                    {/* <h1 className='loginLogo'>Car Rental</h1> */}
                </Col>
                <Col lg={8} className='text-left p-5' >
                    <Form layout='vertical' className='loginForm p-5 mt-2' onFinish={onFinish}>
                        <h1>Login</h1>
                        <hr />
                        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <button className='btn1'>Login</button>

                        <Link to='/Register' className='d-flex mt-3'>Click Here to Register</Link>



                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Login