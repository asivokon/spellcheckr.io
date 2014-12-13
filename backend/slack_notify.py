#!/usr/bin/env python3
"""Post message to Slack.com when someone asks spellcheckr.io question.
This is temporary hack.

Install deps:
    $ pip install pubnub requests pylev

"""

import requests
import json
import pylev
from Pubnub import Pubnub

subscribe_key = "sub-c-56f28a4a-7d24-11e4-baaa-02ee2ddab7fe",
publish_key = "pub-c-9deee8d8-bc12-4770-9075-f125b8de84dd"
slack_hook = "https://hooks.slack.com/services/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"

pubnub = Pubnub(publish_key=publish_key, subscribe_key=subscribe_key)

snippets_sent = {}      # snippetId => last sent text

def _callback(message, channel):
    snippet_id = message.get('snippetId')
    snippet_text = message.get('text')
    if not snippet_text or not snippet_id:
        return

    last_sent = snippets_sent.get(snippet_id)
    if last_sent and pylev.levenshtein(last_sent, snippet_text) < 8:
        return  # only send when diff is large enough

    notification_text = "{} (snippetId: `{}`)".format(snippet_text, snippet_id)
    notification = {
            "text": notification_text,
            "username": message.get("authorUid", "visitor")
        }
    headers = {"Content-Type": "application/json"}

    requests.post(slack_hook, data=json.dumps(notification), headers=headers)

    snippets_sent[snippet_id] = snippet_text
    print(message)
    print(notification_text)

def _error(message):
    print(message)

if __name__ == '__main__':
    pubnub.subscribe(channels="lang-eng", callback=_callback, error=_error)
