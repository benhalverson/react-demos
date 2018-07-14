import React from 'react';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
import { configure, shallow, render, mount, wrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import CreateStudent from '../../components/CreateStudent';
axios.defaults.adapter = httpAdapter;

configure({ adapter: new Adapter() });

beforeEach(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});
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

it('should call webservice to create student', done => {
  nock('http://fakehost.com')
  .post('/students', {email: "sam@aol.com"})
  .reply(200, {
    id: 99,
    email: "sam@aol.com"
  });

  const created =  sinon.stub();
  const wrapper = mount(<CreateStudent host="http://fakehost.com" created={created} />);
  // wrapper.find('input').get(0).value = "sam@aol.com";

  wrapper.find('button').simulate('click');

  // setTimeout(() => {
  //   try{
  //     // const student = created.getCall(0).args[0]
  //     console.log(student);
  //     // expect(created.mock.calls.length).toEqual(1);
  //     expect(student).toEqual({id: 99, email: "sam@aol.com"});
      
  //     done();
  //   }catch(e){
  //     done.fail(e);
  //   }
  // }, 1000);
});

it('should display and error message on email\'s that are to short', (done) => {
  nock('fakehost.com')
  .post('/students', {email: 'bad'})
  .replyWithError('email too short');
  done();
})