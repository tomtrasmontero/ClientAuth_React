import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Signup extends Component {
  handleFormSubmit(formProps) {
    // call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderInput = (field) => (
    <div>
      <input {...field.input} type={field.type} className="form-control" />
      <div>
        {
          field.meta.touched &&
          field.meta.error &&
          <span className="alert-danger">{field.meta.error}</span>
        }
      </div>
    </div>
  );

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!: {this.props.errorMessage}</strong>
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            component={this.renderInput}
            type="email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            component={this.renderInput}
            type="password"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field
            name="confirmPassword"
            component={this.renderInput}
            type="password"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'User Name is Required';
  }

  if (!values.password) {
    errors.password = 'Please Enter Password';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please Enter Password';
  }

  if (values.confirmPassword && values.password ) {
    if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }
  }

  return errors;
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate,
  form: 'signup',
})(
  connect(mapStateToProps, actions)(Signup)
);
