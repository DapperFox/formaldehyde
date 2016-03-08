import React from 'react';
import inputValidityError from './helpers/inputValidityError';

export default class Input extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    max: React.PropTypes.number,
    min: React.PropTypes.number,
    name: React.PropTypes.string.isRequired,
    pattern: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    required: React.PropTypes.bool,
    type: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    offValue: React.PropTypes.any,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onFocus: React.PropTypes.func,
  };

  static contextTypes = {
    getFormModelValue: React.PropTypes.func.isRequired,
    registerFormInput: React.PropTypes.func.isRequired,
    unregisterFormInput: React.PropTypes.func.isRequired,
  };

  componentDidMount () {
    this.context.registerFormInput(this);
  }

  componentWillUnmount () {
    this.context.unregisterFormInput(this);
  }

  getModelValue () {
    return this.context.getFormModelValue(this.props.name);
  }

  getValue () {
    if (this.isRadio() || this.isCheckbox()) {
      if (this.refs.input.checked) {
        return this.props.value || true;
      } else {
        return this.props.offValue || undefined;
      }
    } else {
      return this.refs.input.value;
    }
  }

  getValidationError () {
    if (!this.refs.input.checkValidity()) {
      return undefined;
    }
    return inputValidityError(this.refs.input);
  }

  render () {
    if (this.isCheckbox() || this.isRadio()) {
      return this.renderRadioCheckbox();
    } else {
      return this.renderTextInput();
    }
  }

  renderTextInput () {
    return (
      <input
        className={ this.props.className }
        defaultValue={ this.getModelValue() }
        id={ this.props.id }
        max={ this.props.max }
        min={ this.props.min }
        name={ this.props.name }
        onBlur={ this.props.onBlur }
        onChange={ this.props.onChange }
        onClick={ this.props.onClick }
        onFocus={ this.props.onFocus }
        pattern={ this.props.pattern }
        placeholder={ this.props.placeholder }
        ref="input"
        required={ this.props.required }
        type={ this.props.type }
      />
    );
  }

  renderRadioCheckbox () {
    const checked = this.getModelValue() === this.props.value;
    return (
      <input
        className={ this.props.className }
        defaultChecked={ checked }
        id={ this.props.id }
        name={ this.props.name }
        onBlur={ this.props.onBlur }
        onChange={ this.props.onChange }
        onClick={ this.props.onClick }
        onFocus={ this.props.onFocus }
        placeholder={ this.props.placeholder }
        ref="input"
        type={ this.props.type }
        value={ this.props.value }
      />
    );
  }

  isCheckbox () {
    return this.props.type.toLowerCase() === 'checkbox';
  }

  isRadio () {
    return this.props.type.toLowerCase() === 'radio';
  }
}