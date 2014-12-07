var React = require('react');
var mui = require('material-ui');

var Input = mui.Input,
    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    MenuItem = mui.MenuItem,
    Menu = mui.Menu,
    Ripple = mui.Ripple,
    IconButton = mui.IconButton,
    FlatButton = mui.FlatButton;

var menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'css-framework', text: 'CSS Framework' },
    { route: 'components', text: 'Components' },
    { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
    {
        type: MenuItem.Types.LINK,
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub'
    }
];

//Docked Left Nav
module.exports = React.createClass({

    render: function () {
        return (
            <Toolbar>
                <ToolbarGroup className="pull-left">
                    <IconButton icon="navigation-menu"  />
                </ToolbarGroup>
                <ToolbarGroup className="pull-right">
                    <FlatButton label="Default"  />
                </ToolbarGroup>
            </Toolbar>

        )
    }

});