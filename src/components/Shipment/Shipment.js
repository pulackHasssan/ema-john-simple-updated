import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';

const Shipment = () => {

             const { register, handleSubmit, watch, errors } = useForm();
             const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => console.log(data);

  console.log(watch("example"));
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder='name' />
      {errors.name && <span>Username is required</span>}
      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder='email' />
      {errors.email && <span>Email is required</span>}
      <input name="phone" ref={register({ required: true })} placeholder='Phone' />
      {errors.exampleRequired && <span>Phone number is required</span>}
      <input name="address" ref={register({ required: true })} placeholder='address' />
      {errors.exampleRequired && <span>Address is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;