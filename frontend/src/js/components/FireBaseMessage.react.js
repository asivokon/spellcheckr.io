var React = require('react');
var FireBaseService = require('../utils/FireBase');

var MessageResponses = React.createClass({
    render: function() {
        var createItem = function(message) {
            return <li>{message.message}</li>;
        };
        return <ul>{this.props.items.map(createItem)}</ul>;
    }
});

module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <h3>FireBase Test</h3>
                <textarea id="messageInput" value={this.state.messageText} onChange={this.onMessageChange} placeholder="Your text here..."></textarea>
                <button type="button" id="submitMesssage" onClick={this.submitMessage}>Submit Message</button>
                <div id='messagesDiv'>
                </div>
                <MessageResponses items={this.state.responses} />
                <textarea id="responseInput" placeholder="Your response here..."></textarea>
                <button type="button" id="submitResponse" onClick={this.submitResponse}>Submit Response</button>
            </div>
        );
    },

    getInitialState: function() {
        var hash = window.location.hash;
        var messageId = hash && hash.length ? hash.substring(1): btoa('' + new Date().getTime());
        FireBaseService.getMessage(messageId, function (message) {
            if (message) {
                this.setState({messageText: message.message });
            }
        }, this);
        FireBaseService.getResponses(messageId, function(responses) {
            if (responses && responses.length) {
                this.setState({ responses: responses })
            }
        }, this);
        return {
            messageId: messageId,
            messageText: "",
            responses: []
        };
    },

    onMessageChange: function(e) {
        console.log(e.target.value);
        this.setState({ messageText: e.target.value });
    },

    submitMessage: function (messageId) {
        var input = document.getElementById('messageInput');
        if (input && input.value && input.value.trim()) {
            FireBaseService.putMessage(messageId, input.value, this.onResponse);
        }
    },

    submitResponse: function (messageId) {
        var input = document.getElementById('responseInput');
        if (input && input.value && input.value.trim()) {
            FireBaseService.putResponse(messageId, input.value);
        }
    },

    onResponse: function(response) {
        if (response) {
            var messageDiv = document.getElementById('messagesDiv');
            messageDiv.innerHTML += ("<br/>" + response.message);
            var responses = this.state.responses || [];
            responses.push(response);
            this.setState({ responses: responses });
        }
    }
});