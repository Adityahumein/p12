import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function Registration() {
    
  return (
    <div className='registration-form-container'>
    <div className="registration-form">
      <h1>Register</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          mobileNumber: '',
          state: '',
          district: '',
          institutionName: '',
          institutionType: '',
          aadhaarNumber: '',
          panNumber: '',
          gstNumber: '',
          aadhaarDocument: null,
          panDocument: null, 
          gstDocument: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
          }
          if (!values.confirmPassword) {
            errors.confirmPassword = 'Required';
          } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = 'Passwords do not match';
          }
          if (!values.mobileNumber) {
            errors.mobileNumber = 'Required';
          } else if (!/^[6-9]\d{9}$/i.test(values.mobileNumber)) {
            errors.mobileNumber = 'Invalid mobile number';
          }
          if (!values.state) {
            errors.state = 'Required';
          }
          if (!values.district) {
            errors.district = 'Required';
          }
          if (!values.institutionName) {
            errors.institutionName = 'Required';
          }
          if (!values.institutionType) {
            errors.institutionType = 'Required';
          }
          if (!values.aadhaarNumber) {
            errors.aadhaarNumber = 'Required';
          } else if (!/^[2-9]{1}[0-9]{3}\s[0-9]{4}\s[0-9]{4}$/i.test(values.aadhaarNumber)) {
            errors.aadhaarNumber = 'Invalid Aadhaar number';
          }
          if (!values.panNumber) {
            errors.panNumber = 'Required';
          } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(values.panNumber)) {
            errors.panNumber = 'Invalid PAN number';
          }
          if (!values.gstNumber) {
            errors.gstNumber = 'Required';
          } else if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9]{1}[Z]{1}[0-9]{1}$/i.test(values.gstNumber)) {
            errors.gstNumber = 'Invalid GST number';
          }
          if (!values.aadhaarDocument) {
            errors.aadhaarDocument = 'Required';
          }
          if (!values.panDocument) {
            errors.panDocument = 'Required';
          }
          if (!values.gstDocument) {
            errors.gstDocument = 'Required';
          }
          
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            // Call API or perform registration logic here
            console.log(values);
            setSubmitting(false);
            // Handle uploaded documents here
            const formData = new FormData();
            formData.append('aadhaarDocument', values.aadhaarDocument);
            formData.append('panDocument', values.panDocument);
            formData.append('gstDocument', values.gstDocument);
            // Send the form data to the server or perform other logic
          }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label>First Name:</label>
              <Field type="text" name="firstName" />
              <ErrorMessage name="firstName" component="div" />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <Field type="text" name="lastName" />
              <ErrorMessage name="lastName" component="div" />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            <div className="form-group">
              <label>Mobile Number:</label>
              <Field type="text" name="mobileNumber" />
              <ErrorMessage name="mobileNumber" component="div" />
            </div>

            <div className="form-group">
              <label>State:</label>
              <Field type="text" name="state" />
              <ErrorMessage name="state" component="div" />
            </div>

            <div className="form-group">
              <label>District:</label>
              <Field type="text" name="district" />
              <ErrorMessage name="district" component="div" />
            </div>

            <div className="form-group">
              <label>Institution Name:</label>
              <Field type="text" name="institutionName" />
              <ErrorMessage name="institutionName" component="div" />
            </div>

            <div className="form-group">
              <label>Institution Type:</label>
              <Field type="text" name="institutionType" />
              <ErrorMessage name="institutionType" component="div" />
            </div>

            
            <div className="form-group">
              <label>Aadhaar Number:</label>
              <Field type="text" name="aadhaarNumber" />
              <ErrorMessage name="aadhaarNumber" component="div" />
              <input type="file" name="aadhaarDocument" />
            </div>

            
            <div className="form-group">
              <label>PAN Number:</label>
              <Field type="text" name="panNumber" />
              <ErrorMessage name="panNumber" component="div" />
              <input type="file" name="panDocument" /> 
            </div>
            
            <div className="form-group">
              <label>GST Number:</label>
              <Field type="text" name="gstNumber" />
              <ErrorMessage name="gstNumber" component="div" />
              <input type="file" name="gstDocument" /> 
            </div>
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
    </div>
  );
}