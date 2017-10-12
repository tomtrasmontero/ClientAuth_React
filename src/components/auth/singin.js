import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';


class Signin extends Component {
  renderInput = (field) => (
    <div>
      <input {...field.input} type={field.type} className="form-control" />
      <div>
        {
          field.meta.touched &&
          field.meta.error &&
          <span className="alert alert-danger">{field.meta.error}</span>
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

  handleFormSubmit({ email, password }) {
    // async do somehting with log in user
    this.props.singinUser({email, password});
  }

  render() {
    // these are coming from redux-form, email and password are the fields declared
    // below when hooking up reduxform
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign In
        </button>
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

  return errors;
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

// reduxForm handles similar to connect helper, null is the state decleration
export default reduxForm({
  validate,
  form: 'signin',
})(
  connect(mapStateToProps, actions)(Signin)
);
