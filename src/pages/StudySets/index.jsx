
import { Redirect, Route, Switch } from 'react-router-dom';
import StudySetHome from './Home';
import StudySetDetail from './Detail';

export default function StudySets() {
    return (
        <Switch>
            <Route path="/study-sets" component={StudySetHome} exact />
            <Route path="/study-sets/detail/:id" component={StudySetDetail} />
            <Redirect to='/study-sets' />
        </Switch>
    )


}
