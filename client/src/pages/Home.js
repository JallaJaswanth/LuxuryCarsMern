import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { getAllCars } from '../redux/actions/CarsAction'
import { Button, Row, Col, Divider, DatePicker } from 'antd';
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Carousel } from 'antd'

const { RangePicker } = DatePicker
function Home() {
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

    function setFilter(values) {

        var selectedFrom = moment(values[0], 'MM DD yyyy HH:mm')
        var selectedTo = moment(values[1], 'MM DD yyyy HH:mm')

        var temp = []

        for (var car of cars) {
            if (car.bookedTimeSlots.length == 0) {
                temp.push(car)
            }
            else {
                for (var booking of car.bookedTimeSlots) {

                    if (selectedFrom.isBetween(booking.from, booking.to) ||
                        selectedTo.isBetween(booking.from, booking.to) ||
                        moment(booking.from).isBetween(selectedFrom, selectedTo) ||
                        moment(booking.to).isBetween(selectedFrom, selectedTo)
                    ) {

                    }
                    else {
                        temp.push(car)
                    }
                }


            }
        }

        setTotalCars(temp)
    }

    return (
        <DefaultLayout>
            <Row className='p-2'>
                <Col lg={24} xs={24} sm={24}>
                    <Carousel autoplay>
                        <div>
                            <img className='imggg' src='https://zoomcar-assets.zoomcar.com/pictures/original/55c3970a33c8f4d10dd3c9ace39d20e32af5c8ba.jpg?1651758755' alt='' />
                        </div>
                        <div>
                            <img className='imggg' src='https://zoomcar-assets.zoomcar.com/pictures/original/e3dfe0ed91abc29facaf56a327b4498ce4e9b75e.jpeg?1652363808' alt='' />
                        </div>
                        <div>
                            <img className='imggg' src='https://zoomcar-assets.zoomcar.com/photos/original/67aa017f464b45e52f7bc9a206245e5f15f5a316.jpg?1655478529' alt='' />
                        </div>
                        <div>
                            <img className='imggg' src='https://zoomcar-assets.zoomcar.com/pictures/original/d70e7f58da384df0f3ba169cf19e8e931879c66c.jpeg?1652354515' alt='' />
                        </div>
                    </Carousel>
                </Col>
            </Row>


            <Row className='mt-3' justify='center'>
                <Col lg={20} sm={24} className=' asas d-flex justify-content-flex'>
                    <RangePicker showTime={{ format: 'HH:mm' }} format='MMM DD yyyy HH:mm' onChange={setFilter} />
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
                                    <p>Rent Per Hour {car.rentPerHour} /-</p>
                                </div>

                                <div>
                                    <button className='btn1'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
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

export default Home