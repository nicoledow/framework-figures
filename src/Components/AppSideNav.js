import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Typography from '@material-ui/core/Typography';

export default function AppSideNav() {
    const frameworksList = ['React', 'Angular', 'Ember', 'Vue'];

    return(
        <Nav className="flex-column">
            {frameworksList.map(framework => {
                return(
                    <Nav.Item key={framework} justify={true}>
                        <Typography variant={'h4'}>
                            {framework}
                        </Typography>
                    </Nav.Item>
                )
            })}
        </Nav>
    );

}