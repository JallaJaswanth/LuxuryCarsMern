import React from 'react';
import { Menu, Dropdown, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import Toggle from './Toggle';
import { useContext } from 'react';
import { themeContext } from '../Context';

function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user')); //User name chupiyadanki

  const menu = (
    <Menu>
      <Menu.Item>
        <a href='/'>Home</a>
      </Menu.Item>
      <Menu.Item>
        <a href='/userbookings'>My Bookings</a>
      </Menu.Item>
      {user.isAdmin && (
        <Menu.Item>
          <a href='/admin'>Admin</a>
        </Menu.Item>
      )}
      <Menu.Item
        onClick={() => {
          localStorage.removeItem('user');
          window.location.href = '/login';
        }}
      >
        <li style={{ color: 'orangered' }}>Logout</li>
      </Menu.Item>
    </Menu>
  );

  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div>
      <div className='header bs1'>
        <Row gutter={16} justify='center'>
          <Col lg={20} sm={24} xs={24}>
            <div className='d-flex justify-content-between'>
              <h1>
                <b>
                  <Link style={{ color: 'orangered' }} to='/'>
                    Luxury Cars
                  </Link>
                </b>
              </h1>
              <Toggle />
              <Dropdown className='mx-5' overlay={menu} placement='bottom'>
                <Button>{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className='content'>{props.children}</div>

      <div
        className='footer text-center'
        style={{ color: darkMode ? 'white' : '' }}
      >
        <hr />
        <p>Designed and Developed By</p>
        <p>Jalla</p>
      </div>
    </div>
  );
}

export default DefaultLayout;
