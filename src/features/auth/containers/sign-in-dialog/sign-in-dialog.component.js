import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { IconNames } from '@blueprintjs/icons';

import './sign-in-dialog.styles.scss';
import { WithDialog } from 'common/containers';
import { selectDarkMode } from 'features/core/store';
import { toggleSignInDialog, selectShowSignInDialog, selectIsLoading } from '../../store';
import SignIn from '../../components/sign-in/sign-in.component';

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode,
  showSignInDialog: selectShowSignInDialog,
  isLoading: selectIsLoading
});

const mapDispatchToProps = (dispatch) => ({
  toggleSignInDialogDispatch: () => dispatch(toggleSignInDialog())
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  onClose: () => !stateProps.isLoading && dispatchProps.toggleSignInDialogDispatch(),
  isOpen: stateProps.showSignInDialog,
  className: `${stateProps.darkMode ? 'bp3-dark' : ''} sign-in-dialog`,
  icon: IconNames.LOG_IN,
  title: 'Sign In',
  lazy: true,
  isDialog: true,
  ...ownProps
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  WithDialog
)(SignIn);
