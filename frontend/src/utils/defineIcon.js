import React from 'react'
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CreateIcon from '@material-ui/icons/Create';
import EmailIcon from '@material-ui/icons/Email';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import GroupIcon from '@material-ui/icons/Group';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function defineIcon(iconName) {
    switch (iconName) {
        case 'GroupIcon' :
            return <GroupIcon/>
        case 'GroupAddIcon' :
            return <GroupAddIcon/>
        case 'AccountTreeIcon':
            return <AccountTreeIcon />;
        case 'AssessmentIcon':
            return <AccessibilityIcon />;
        case 'CreateIcon':
            return <CreateIcon />;
        case 'EmailIcon':
            return <EmailIcon />
        case 'Clock':
            return <AccessTimeOutlinedIcon />             
        case 'AssignmentIcon':
            return <AssignmentIcon />             
        default:
            return;
    }
}