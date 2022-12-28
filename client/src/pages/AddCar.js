import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { addCar } from '../redux/actions/CarsAction';
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import { useContext } from 'react'
import { themeContext } from '../Context'


function AddCar() {


    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;


    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.alertsReducer)

    function onFinish(values) {

        values.bookedTimeSlots = []

        dispatch(addCar(values))
        console.log(values)
    }

    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <Row justify='center mt-5'>
                <Col lg={12} sm={24} xs={24} className='p-2' >
                    <Form className='bs1 p-2' layout='vertical' onFinish={onFinish} >
                        <h3 style={{ color: darkMode ? 'white' : '' }}>Add New Car</h3>
                        <hr />
                        <Form.Item name='name' label={<label style={{ color: darkMode ? 'white' : '' }}>car name</label>} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='image' label={<label style={{ color: darkMode ? 'white' : '' }}>image url</label>} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='rentPerHour' label={<label style={{ color: darkMode ? 'white' : '' }}>Rent Per Hour</label>} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='capacity' label={<label style={{ color: darkMode ? 'white' : '' }}>capacity</label>} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name='fuelType' label={<label style={{ color: darkMode ? 'white' : '' }}>Fuel Type</label>} rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <div className='text-right'>
                            <button className='btn1'>Add Car</button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </DefaultLayout>
    )
}

export default AddCar