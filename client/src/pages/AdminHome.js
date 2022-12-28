import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { deleteCar, getAllCars } from '../redux/actions/CarsAction'
import { Button, Row, Col, Divider, DatePicker, Edit } from 'antd';
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import { message, Popconfirm } from 'antd';

const { RangePicker } = DatePicker

function AdminHome() {
    const { cars } = useSelector(state => state.CarsReducer)
    const { loading } = useSelector(state => state.alertsReducer)
    const [totalCars, setTotalCars] = useState([]) //For Filtering Cars
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCars())
    }, [])

    useEffect(() => {
        setTotalCars(cars)
    }, [cars])



    return (
        <DefaultLayout>

            <Row justify='center' gutter={16} className='mt-2'>

                <Col lg={20} sm={24}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h3 className='mt-1 m-2'>Admin Panel</h3>
                        <button className='btn1'> <a href='/addcar'>ADD CAR</a></button>
                    </div>
                </Col>

            </Row>

            {loading == true && (<Spinner />)}

            <Row justify='center' gutter={16} >
                {totalCars.map(car => {
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1 '>
                            <img src={car.image} className="carimg" />

                            <div className='car-content d-flex align-items-center justify-content-between'>

                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour {car.rentPerHour}/-</p>
                                </div>

                                <div className='mr-4'>
                                    <Link to={`/editcar/${car._id}`}><EditOutlined className='mr-1' style={{ color: 'green', cursor: 'pointer' }} /></Link>
                                    <Popconfirm
                                        title="Are you sure to delete this car?"
                                        onConfirm={() => { dispatch(deleteCar({ carid: car._id })) }}

                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
                                    </Popconfirm>

                                </div>

                            </div>


                            <div >

                            </div>
                        </div>
                    </Col>
                })}
            </Row>
        </DefaultLayout>

    )
}

export default AdminHome