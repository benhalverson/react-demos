import React from 'react';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import CreateStudent from '../../components/CreateStudent';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<CreateStudent />);
})
it('should render static HTML', () => {
  expect(render(<CreateStudent />).text()).toEqual('Create StudentEmail AddressCreate');
})
it('should find a CSS class in DOM', () => {
  expect(mount(<CreateStudent/>).find('.create-student')).toHaveLength(1);
});
it('should render without throwing an error', () => {
  const html = '<div class="create-student"><h1>Create Student</h1><div class="error"></div><form><label>Email Address</label><input type="email"/><button>Create</button></form></div>';
  expect(shallow(<CreateStudent />).html()).toEqual(html);
});
it('should be selectable by class "CreateStudent"', () => {
  expect(shallow(<CreateStudent />).is('.create-student')).toBeTrue;
});
it('should should have URL and CREATED props', () => {
  const wrapper = mount(<CreateStudent host="aaa" created={() => null} />);
  expect(wrapper.prop('host')).toEqual('aaa');
  // expect(wrapper.prop('created')).to.be.a('function');
});
it('should should call preventDefault when button clicked', () => {
  const stub = sinon.stub();
  const wrapper = mount(<CreateStudent />);
  wrapper.find('button').simulate('click', {preventDefault: stub});
  expect(stub.callCount).toEqual(1);
});

// it('should call webservice to create student', done => {
//   nock('http://fakehost.com')
//   .post('/students', {email: "sam@aol.com"})
//   .reply(200, {
//     id: 99,
//     email: "sam@aol.com"
//   });

//   const created = sinon.stub();
//   const wrapper = mount(<CreateStudent host="http://fakehost.com" created={created} />);
//   wrapper.find('input').get(0).value = "sam@aol.com";
//   wrapper.find('button').simulate('click');


// });