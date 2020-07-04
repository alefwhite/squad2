import React from 'react'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CreateIcon from '@material-ui/icons/Create';
import EmailIcon from '@material-ui/icons/Email';


export default function defineIcon(iconName) {
    switch (iconName) {
        case 'AccountTreeIcon':
            return <AccountTreeIcon />;
        case 'AssessmentIcon':
            return <AccessibilityIcon />;
        case 'CreateIcon':
            return <CreateIcon />;
        case 'EmailIcon':
            return <EmailIcon />         
        default:
            return;
    }
}