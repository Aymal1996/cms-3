import React, { useEffect, useState } from 'react';
import LoginTemplate from '../../templates/Login';
import Login from '../../modules/Login';
import ForgotPassword from '../../modules/ForgotPassword';
import OptpCode from '../../modules/OPTPCode';
import { useHistory } from 'react-router-dom';
import { isLoggedIn } from '../../../routing/config/utils';

export default (props) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const auth = isLoggedIn();

  useEffect(() => {
    if (auth) {
      history.push('/dashboard');
    }
  }, []);

  return (
    <LoginTemplate load={loading}>
      {props.Comp == 'Login' && <Login setLoading={setLoading} />}
      {props.Comp == 'ForgotPassword' && <ForgotPassword load={setLoading} />}
      {props.Comp == 'OPTPCode' && <OptpCode load={setLoading} />}
    </LoginTemplate>
  );
};
