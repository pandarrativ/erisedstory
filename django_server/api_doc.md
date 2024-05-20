# API Doc

### Server
`http://xxx.com/api/`


 ### conversation 
 POST: `/pdtalk/conversation`

I: List of messages , storyplay id
O: string


### sage
POST: `/pdtalk/sage-conversation`
task = "CHAT" || "TOAST"

I(CHAT):
storyplay_id, task, script_name, messages, username, story

I(TOAST):
storyplay_id, task, script_name, messages, username, story, action

O: string


### new story play 
POST: `/pdtalk/story-playdata`

I: uid(UUID), story_name(String)
O:
```
data = {
            "_id": str(uuid.uuid4()),
            "user_id": user_id,
            "story_id": Script_class.story_id,
            "story_name":Script_class.story_name,
            "protagonist_name": Script_class.protagonist_name,


            "start_time": get_current_time(),
            "end_time": get_current_time(),
            "pages": 1,
            "playdata":[        
                {
                    "order":1,
                    "story":Script_class.first_story,
                    "event_type":"story",
                    "timestamp":get_current_time(),
                    "decision_making_data":{},
                    "single_conversation_data":{},
                },
            ],
        }
```

### all story play 
POST: `/pdtalk/all-playdata`

I: uid(uuid)
O: List of data

### story
POST: `/pdtalk/story`


 - task: TASK_STORY
I:
```
storyplay_id： uuid
story_name: string
task: "TASK_STORY"
order: int
current_story: string
```

O:
```
{
    "order":1,
    "story":Script_class.first_story,
    "event_type":"story",
    "timestamp":get_current_time(),
    "decision_making_data":{},
    "single_conversation_data":{},
},
```


 - task: TASK_DECISION
I:
```
storyplay_id： uuid
story_name: string
task: "TASK_DECISION"
order: int
current_story: string
```

O:
```
{
    "order":1,
    "story":Script_class.first_story,
    "event_type":"story",
    "timestamp":get_current_time(),
    "decision_making_data":{
        "question": <STRING>,
        "option_1": <STRING>,
        "option_2": <STRING>,
        "option_3": <STRING>,
    },
    "single_conversation_data":{},
},
```


 - task: CONTINUE_DECISION
I:
```
storyplay_id： uuid
story_name: string
task: "TASK_DECISION"
order: int
current_story: string
"question": <STRING>,
"option_1": <STRING>,
"option_2": <STRING>,
"option_3": <STRING>,
choice: String
```

O:
```
{
    "order":1,
    "story":Script_class.first_story,
    "event_type":"story",
    "timestamp":get_current_time(),
    "decision_making_data":{},
    "single_conversation_data":{},
},
```

 - task: TASK_SINGLE_CONVERSATION
I:
```
storyplay_id： uuid
story_name: string
task: "TASK_DECISION"
order: int
current_story: string
```

O:
```
{
    "order":1,
    "story":Script_class.first_story,
    "event_type":"story",
    "timestamp":get_current_time(),
    "decision_making_data":{},
    "single_conversation_data":{
        "conversation_background": <STRING>,
        "character_name": <STRING>,
        "opening_sentence": <STRING>,
        messages:<List>
    },
},
```

 - task: CONTINUE_SINGLE_CONVERSATION
I:
```
storyplay_id： uuid
story_name: string
task: "TASK_DECISION"
order: int
current_story: string
"conversation_background": <STRING>,
"character_name": <STRING>,
messages: List
```

O:
```
{
    "order":1,
    "story":Script_class.first_story,
    "event_type":"story",
    "timestamp":get_current_time(),
    "decision_making_data":{},
    "single_conversation_data":{},
},
```