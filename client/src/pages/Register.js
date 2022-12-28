import React from 'react'
import { Row, Col, Form, Input } from 'antd';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/actions/UserActions';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import Spinner from '../components/Spinner';
// ..
AOS.init();

const Register = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.alertsReducer)
    function onFinish(values) {
        dispatch(userRegister(values))
        console.log(values)
    }

    return (
        <div className='login'>
            {loading && (<Spinner />)}
            <Row gutter={16} className='d-flex align-items-center'>
                <Col lg={16} style={{ position: 'relative', }}>
                    <img
                        data-aos='slide-left'
                        data-aos-duration='1500'
                        className='imgLogin' src='https://images.unsplash.com/photo-1485291571150-772bcfc10da5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1856&q=80' />
                    {/* <h1 className='loginLogo'>Car Rental</h1> */}
                </Col>
                <Col lg={8} className='text-left p-5'>
                    <Form layout='vertical' className='loginForm p-5' onFinish={onFinish}>
                        <h1>Register</h1>
                        <hr />
                        <Form.Item name='username' label='Username' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='password' label='Password' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='cpassword' label='Confirm Password' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>


                        <button className='btn1 mb-1'>Register</button>
                        <br />
                        <Link to='/Login'>Click Here to Login</Link>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Register