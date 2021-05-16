import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" component={Dashboard} exact/>
        <Route  path="/repository/:repository+" component={Repository}/>
    </Switch>
    //esse + é para dizer que tudo que vem depois nessa rota também tá incluido no repository
);

export default Routes;
