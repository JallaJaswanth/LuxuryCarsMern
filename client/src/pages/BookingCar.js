import React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { getAllCars } from '../redux/actions/CarsAction';
import Spinner from '../components/Spinner';
import {
  Col,
  Divider,
  Row,
  Form,
  Input,
  DatePicker,
  Checkbox,
  Modal,
} from 'antd';
import moment from 'moment';
import { bookCar } from '../redux/actions/bookingActions';
import StripeCheckout from 'react-stripe-checkout';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useContext } from 'react';
import { themeContext } from '../Context';

const { RangePicker } = DatePicker;

function BookingCar({ match }) {
  const [sdkReady, setSdkReady] = useState(false);
  const { cars } = useSelector((state) => state.CarsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);
  const [car, setcar] = useState({});
  const dispatch = useDispatch();
  const [from, setFrom] = useState(); // idi booking time slots kosam
  const [to, setTo] = useState();
  const [totalHours, setTotalHours] = useState(0);
  const [driver, setdriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  useEffect(() => {
    if (cars.length == 0) {
      dispatch(getAllCars());
    } else {
      setcar(cars.find((o) => o._id == match.params.carid));
    }
  }, [cars]);

  const successPaymentHandler = () => {
    console.log('sdk');
  };

  useEffect(() => {
    setTotalAmount(totalHours * car.rentPerHour);
    if (driver) {
      setTotalAmount(totalAmount + 30 * totalHours);
    }
  }, [driver, totalHours]);

  function selectTimeSlots(values) {
    setFrom(moment(values[0]).format('MM DD yyyy HH:mm'));
    setTo(moment(values[1]).format('MM DD yyyy HH:mm'));

    setTotalHours(values[1].diff(values[0], 'hours'));
  }

  // function bookNow() {
  //     const reqObj = {

  //         user: JSON.parse(localStorage.getItem('user'))._id,
  //         car: car._id,
  //         totalHours,
  //         totalAmount,
  //         driverRequired: driver,
  //         bookedTimeSlots: {
  //             from,
  //             to
  //         }
  //     }
  //     dispatch(bookCar(reqObj))
  // }

  function onToken(token) {
    const reqObj = {
      user: JSON.parse(localStorage.getItem('user'))._id,
      car: car._id,
      totalHours,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: {
        from,
        to,
      },
    };
    dispatch(bookCar(reqObj));
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <Row
        justify='center'
        className='d-flex align-items-center'
        style={{ minHeight: '90vh' }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img
            src={car.image}
            className='carimg2 bs1 w-100 p-2'
            data-aos='flip-left'
            data-aos-duration='1000'
          />
        </Col>
        <Col lg={10} sm={24} xs={24} className='text-right'>
          <Divider
            type='horizontal'
            dashed
            style={{ color: darkMode ? 'white' : '' }}
          >
            Car Info
          </Divider>

          <div className='text-right'>
            <span>{car.name}</span> <br></br>
            <span>{car.rentPerHour} Rent Per Hour /-</span> <br></br>
            <span>Fuel Type: {car.fuelType}</span> <br></br>
            <span>Max Persons : {car.capacity}</span>
          </div>
          <Divider
            type='horizontal'
            dashed
            style={{ color: darkMode ? 'white' : '' }}
          >
            Select Time Slots
          </Divider>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format='MMM DD yyyy HH:mm'
            onChange={selectTimeSlots}
          />
          <br></br>
          <button
            className='btn1 mt-3'
            onClick={() => {
              setShowModal(true);
            }}
          >
            See Booked Slots
          </button>

          {from && to && (
            <div>
              <p>
                Total Hours : <b>{totalHours} </b>{' '}
              </p>
              <p>
                Rent Per Hour : <b>{car.rentPerHour}</b>
              </p>
              <Checkbox
                style={{ color: darkMode ? 'white' : '' }}
                onChange={(e) => {
                  if (e.target.checked) {
                    setdriver(true);
                  } else {
                    setdriver(false);
                  }
                }}
              >
                Driver Required
              </Checkbox>
              <h3 style={{ color: darkMode ? 'white' : '' }}>
                Total Amount : {totalAmount}
              </h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency='inr'
                amount={totalAmount * 100} //100 Nduk ante cents lo radanki
                stripeKey='pk_test_51LGNAvSH1lcTKwTlgg5J8ewwjC1WVNddfHMgdGwSLwcIn2AxnADBBF1mssrjUEBIIhHDiPVA9J4ftOHszHZZRpIh004p5hGhdN'
              >
                {' '}
                <button className='btn1'>Book Now</button>
              </StripeCheckout>
              {/* <button className='btn1' onClick={bookNow}>Book Now</button> */}
            </div>
          )}
        </Col>

        {car.name && (
          <Modal
            visible={showModal}
            closable={false}
            footer={false}
            title='Booked time slots'
          >
            <div className='p-2'>
              {car.bookedTimeSlots.map((slot) => {
                return (
                  <button className='btn1 mt-2'>
                    {slot.from} - {slot.to}
                  </button>
                );
              })}

              <div className='text-right mt-5'>
                <button
                  className='btn1'
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  CLOSE
                </button>
              </div>
            </div>
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}
export default BookingCar;
