import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookings } from '../redux/actions/bookingActions'
import { Col, Row } from 'antd'
import moment from 'moment'
import Spinner from '../components/Spinner'

function UserBookings() {

    const dispatch = useDispatch()
    const { bookings } = useSelector(state => state.bookingsReducer)
    const user = JSON.parse(localStorage.getItem("user"));
    const { loading } = useSelector((state) => state.alertsReducer)

    useEffect(() => {
        dispatch(getAllBookings())
    }, [])


    return (
        <DefaultLayout>
            {loading && (<Spinner />)}
            <h3 className='text-center mt-2'>My Bookings</h3>

            <Row justify='center' gutter={16}>
                <Col lg={16} sm={24}>

                    {bookings.filter(o => o.user == user._id).map((booking) => {
                        return <Row gutter={16} className='bs1 m-2 text-left'>
                            <Col lg={8} sm={24}>
                                <p><b>{booking.car.name}</b></p>
                                <p>Total Hours : <b>{booking.totalHours}</b></p>
                                <p>Rent Per Hour : <b>{booking.car.rentPerHour}</b></p>
                                <p>Total Amounr : <b>{booking.totalAmount}</b></p>
                            </Col>
                            <Col lg={9} sm={24}>
                                {/* <p>transactionId : <b>{booking.transactionId}</b></p> */}
                                <p>From : <b>{booking.bookedTimeSlots.from}</b></p>
                                <p>To : <b>{booking.bookedTimeSlots.to}</b></p>
                                <p>Date of booking : <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                            </Col>
                            <Col lg={7} sm={24}>
                                <img style={{ borderRadius: 20 }} src={booking.car.image} height="150" className='p-2' />
                            </Col>
                        </Row>
                    })}

                </Col>
            </Row>

        </DefaultLayout>
    )
}

export default UserBookings